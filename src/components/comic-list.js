import {
	COMICS_EMPTY, COMICS_CHANGE_FILTER, COMICS_SEARCH, COMICS_RENDER,
	CODE_SEARCH_BY_TITLE, CODE_SEARCH_BY_TITLE_STARTWITH, CODE_SEARCH_BY_YEAR, NAMES_SEARCH_BY
} from "../constants/action-types";
import Comic from "./comic";
import agent from "../agent"

import React from "react";
import Loader from 'react-loader';
import {connect} from "react-redux";

import {FormControl, Form, MenuItem, Grid, Row, Col, InputGroup, DropdownButton, PanelGroup} from 'react-bootstrap';

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
		dispatch({type: COMICS_RENDER, result: result})
});


class ComicList extends React.Component {
	constructor() {
		super();

		this.changeSearchBy = key => {
			this.props.onFilterChange({search_by: key});
		};

		this.search = ev => {
			ev.preventDefault();
			this.props.onSearch(ev.target.elements['search'].value);
		}
	}

	async askAgent(filters) {
		let data = {};
		try {
			switch (filters.search_by) {
				case CODE_SEARCH_BY_TITLE:
					data = await agent.ListComics.searchByTitle(filters.search);
					break;
				case CODE_SEARCH_BY_TITLE_STARTWITH:
					data = await agent.ListComics.searchByTitleStartsWith(filters.search);
					break;
				case CODE_SEARCH_BY_YEAR:
					data = await agent.ListComics.searchByStartYear(filters.search);
					break;
				default:
					break;
			}
		} catch (e) {
			console.log(e);
		}
		await this.props.onSearchResult(data);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps && nextProps.fetching) {
			this.askAgent(nextProps.filters);
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

	render() {
		return (
			<Grid className="row">
				<Row className="search-box">
					<Col md={6} mdOffset={3} sm={8} smOffset={2}>
						<Form onSubmit={this.search}>
							<InputGroup>
								<FormControl
									type="text"
									name="search"
									placeholder={NAMES_SEARCH_BY[this.props.filters.search_by]}/>
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
							<PanelGroup accordion id="comic-list">
								{
									(this.props.comics || []).map(comic => {
										return (
											<Comic key={comic.id} comic={comic}/>
										)
									})
								}
							</PanelGroup>
						</div>
					</Loader>
				</Row>
			</Grid>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ComicList);