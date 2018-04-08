import {
	COMICS_EMPTY, COMICS_CHANGE_FILTER,
	CODE_SEARCH_BY_TITLE, CODE_SEARCH_BY_TITLE_STARTWITH, CODE_SEARCH_BY_YEAR,
	NAMES_SEARCH_BY
} from '../constants/action-types';

import React from "react";
import Loader from 'react-loader';
import {connect} from "react-redux";

import {
	DropdownButton,
	FormControl,
	Grid, Row, Col,
	InputGroup,
	MenuItem
} from 'react-bootstrap';

const mapStateToProps = state => ({
	...state.comics
});

const mapDispatchToProps = dispatch => ({
	onEmptyList: () =>
		dispatch({type: COMICS_EMPTY}),
	onFilterChange: (filters) =>
		dispatch({type: COMICS_CHANGE_FILTER, filters: filters})
});


class ComicList extends React.Component {
	constructor() {
		super();

		this.changeSearchBy = key => {
			this.props.onFilterChange({search_by: key});
		}
	}

	componentWillMount() {
		this.props.onEmptyList();
	}

	render() {
		return (
			<Grid className="row">
				<Row>
					<Col md={6} mdOffset={3} sm={8} smOffset={2}>
						<InputGroup>
							<FormControl type="text"/>
							<DropdownButton
								componentClass={InputGroup.Button}
								id="search"
								title={"Search by: " + NAMES_SEARCH_BY[this.props.filters.search_by]}
								onSelect={this.changeSearchBy}>
								<MenuItem eventKey={CODE_SEARCH_BY_TITLE}>{NAMES_SEARCH_BY[CODE_SEARCH_BY_TITLE]}</MenuItem>
								<MenuItem eventKey={CODE_SEARCH_BY_TITLE_STARTWITH}>{NAMES_SEARCH_BY[CODE_SEARCH_BY_TITLE_STARTWITH]}</MenuItem>
								<MenuItem eventKey={CODE_SEARCH_BY_YEAR}>{NAMES_SEARCH_BY[CODE_SEARCH_BY_YEAR]}</MenuItem>
							</DropdownButton>
						</InputGroup>
					</Col>
				</Row>
				<Row>
					<Loader loaded={!this.props.fetching}>
						Comic list
					</Loader>
				</Row>
			</Grid>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ComicList);