import React from 'react';
import {connect} from 'react-redux';
import {Pagination} from 'react-bootstrap';

const mapDispatchToProps = dispatch => ({
	onSetPage: (type, page, pagination) =>
		dispatch({type: type, page: page, pagination: pagination})
});

class ListPagination extends React.Component {
	render() {
		const $props = this.props;
		if (!$props.pagination || !$props.show) {
			return null;
		}

		const limit = $props.pagination.limit;
		const offset = $props.pagination.offset;
		const total = $props.pagination.total;

		if (total <= limit) {
			return null;
		}

		let page = 1, pages = 0;
		if ((limit > 0) && (total > 0)) {
			page = Math.ceil(offset / limit) + 1;
			pages = Math.ceil(total / limit);
			if (page > pages) {
				page = pages
			}
		}

		let min_page_btn = Math.max(1, page - 5),
			max_page_btn = Math.min(pages, page + 5);
		if (min_page_btn === 1)
			max_page_btn = Math.min(pages, max_page_btn + 5 - page);

		if (max_page_btn === pages)
			min_page_btn = Math.max(1, min_page_btn - 5);

		const range = [];
		for (let i = min_page_btn; i <= max_page_btn; ++i) {
			range.push(i);
		}

		const setPage = (page) => {
			$props.onSetPage($props.type, page, $props.pagination);
		};

		return (
			<Pagination bsSize="medium">
				{
					(1 < min_page_btn) ? <Pagination.Item key={0} onClick={ev => {
						ev.preventDefault();
						setPage(0);
					}}>First</Pagination.Item> : ""
				}
				{

					range.map(v => {
						const isCurrent = v === page;
						const onClick = ev => {
							ev.preventDefault();
							setPage(v-1);
						};
						return (
							<Pagination.Item key={v} active={isCurrent}
											 onClick={onClick}>{v}</Pagination.Item>
						);
					})
				}
				{
					(max_page_btn < pages) ? <Pagination.Item key={pages} onClick={ev => {
						ev.preventDefault();
						setPage(pages-1)
					}}>Last</Pagination.Item> : ""
				}
			</Pagination>
		);
	}
}

export default connect(() => ({}), mapDispatchToProps)(ListPagination);