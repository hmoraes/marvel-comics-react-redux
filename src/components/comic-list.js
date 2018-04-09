import {
	COMICS_EMPTY, COMICS_CHANGE_FILTER, COMICS_SEARCH, COMICS_RENDER, COMICS_ERROR, COMICS_SET_PAGE, CHAR_SHOW,
	CODE_SEARCH_BY_TITLE, CODE_SEARCH_BY_TITLE_STARTWITH, CODE_SEARCH_BY_YEAR, NAMES_SEARCH_BY
} from "../constants/action-types";
import Comic from "./comic";
import Error from "./error";
import Pagination from "./list-pagination";
import agent from "../agent";

import React from "react";
import Loader from 'react-loader';
import {connect} from "react-redux";

import {
	Form, FormControl, MenuItem, Grid, Row, Col, InputGroup, DropdownButton, PanelGroup, Panel, Modal
} from 'react-bootstrap';
import MaskedFormControl from 'react-bootstrap-maskedinput';
import Character from "./character";

const mapStateToProps = state => ({
	...state.comics
});

const mapDispatchToProps = dispatch => ({
	onEmptyList: () =>
		dispatch({type: COMICS_EMPTY}),
	onFilterChange: (filters) =>
		dispatch({type: COMICS_CHANGE_FILTER, filters: filters}),
	onSearch: (search) =>
		dispatch({type: COMICS_SEARCH, search: search}),
	onSearchResult: (result) =>
		dispatch({type: COMICS_RENDER, result: result}),
	onErrors: (error) =>
		dispatch({type: COMICS_ERROR, error: error}),
	showCharacter: (id, name, response) =>
		dispatch({type: CHAR_SHOW, character: {id: id, name: name, response: response}})
});


class ComicList extends React.Component {
	constructor() {
		super();

		this.handleCharModalClose = this.handleCharModalClose.bind(this);

		this.state = {
			character: null
		};

		this.changeSearchBy = key => {
			this.props.onFilterChange({search_by: key});
		};

		this.search = ev => {
			ev.preventDefault();
			this.props.onSearch(ev.target.elements['search'].value);
		}
	}

	async askAgentForComics(filters) {
		let data = {};
		try {
			switch (filters.search_by) {
				case CODE_SEARCH_BY_TITLE:
					data = await agent.ListComics.searchByTitle(filters.search, filters.page || 0);
					break;
				case CODE_SEARCH_BY_TITLE_STARTWITH:
					data = await agent.ListComics.searchByTitleStartsWith(filters.search, filters.page || 0);
					break;
				case CODE_SEARCH_BY_YEAR:
					data = await agent.ListComics.searchByStartYear(filters.search, filters.page || 0);
					break;
				default:
					break;
			}
			await this.props.onSearchResult(data);
		} catch (e) {
			if (e && e.response && e.response.body) {
				console.log('Error: ' + e.response.body.status);
				await this.props.onErrors(e.response.body);
			} else {
				console.log('Error: ' + JSON.stringify(e));
				await this.props.onErrors({status: e});
			}
		}
	}

	async askAgentForCharacter(character_id) {
		let response = {};
		try {
			response = await agent.ListCharacters.getById(character_id);
			await this.props.showCharacter(character_id, null, response);
		} catch (e) {
			if (e && e.response && e.response.body) {
				console.log('Error: ' + e.response.body.status);
				await this.props.onErrors(e.response.body);
			} else {
				console.log('Error: ' + JSON.stringify(e));
				await this.props.onErrors({status: e});
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps && nextProps.fetching) {
			this.askAgentForComics(nextProps.filters);
		}

		if (nextProps && nextProps.character) {
			let fetching = false;
			if (!nextProps.character.done) {
				fetching = true;
				this.askAgentForCharacter(nextProps.character.id);
			}
			this.setState({
				character: {
					...nextProps.character,
					fetching: fetching
				}
			})
		}
	}

	componentWillMount() {
		const apikey = process.env.REACT_APP_MARVEL_APIKEY;
		if (apikey) {
			agent.setApikey(apikey);
		}

		const limitCount = process.env.REACT_APP_LIMIT_COUNT;
		if (limitCount) {
			agent.setLimitCount(limitCount);
		}

		this.props.onEmptyList();
	}

	handleCharModalClose() {
		this.setState({
			character: null
		});
	}

	renderComic() {
		const no_results = (this.props.comics.length === 0) && (!this.props.error);
		if (no_results) {
			return (<Panel><Panel.Heading><Panel.Title>No results</Panel.Title></Panel.Heading></Panel>)
		} else {
			return (
				(this.props.comics || []).map(comic => {
					return (
						<Comic key={comic.id} comic={comic} showCharacter={this.props.showCharacter}/>
					)
				})
			)
		}
	}

	render() {
		return (
			<Grid className="row">
				<Row className="search-box">
					<Col md={6} mdOffset={3} sm={8} smOffset={2}>
						<Form onSubmit={this.search}>
							<InputGroup>
								{
									this.props.filters.search_by === CODE_SEARCH_BY_YEAR ?
										<MaskedFormControl
											type="text" name="search" mask="1111"
											placeholder={NAMES_SEARCH_BY[this.props.filters.search_by]}/> :
										<FormControl
											type="text" name="search"
											placeholder={NAMES_SEARCH_BY[this.props.filters.search_by]}/>
								}
								<DropdownButton
									componentClass={InputGroup.Button}
									id="search-button"
									title={"Search by: " + NAMES_SEARCH_BY[this.props.filters.search_by]}
									onSelect={this.changeSearchBy}>
									<MenuItem
										eventKey={CODE_SEARCH_BY_TITLE}>{NAMES_SEARCH_BY[CODE_SEARCH_BY_TITLE]}</MenuItem>
									<MenuItem
										eventKey={CODE_SEARCH_BY_TITLE_STARTWITH}>{NAMES_SEARCH_BY[CODE_SEARCH_BY_TITLE_STARTWITH]}</MenuItem>
									<MenuItem
										eventKey={CODE_SEARCH_BY_YEAR}>{NAMES_SEARCH_BY[CODE_SEARCH_BY_YEAR]}</MenuItem>
								</DropdownButton>
							</InputGroup>
						</Form>
					</Col>
				</Row>
				<Row>
					<Loader loaded={!this.props.fetching}>
						<div className="container">
							<Error error={this.props.error} message={this.props.message}/>
							<PanelGroup accordion id="comic-list">
								{this.renderComic()}
							</PanelGroup>
							<Pagination show={!this.props.error} type={COMICS_SET_PAGE}
										pagination={this.props.server_data}/>
						</div>
					</Loader>
				</Row>
				<Modal show={this.state.character != null} onHide={this.handleCharModalClose}>
					<Modal.Header closeButton>
						<Modal.Title>{this.state.character && this.state.character.name}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Loader loaded={this.state.character && !this.state.character.fetching}>
							<Character character={this.state.character}/>
						</Loader>
					</Modal.Body>
				</Modal>
			</Grid>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ComicList);