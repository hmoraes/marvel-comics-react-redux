import React from 'react';
import {Media, Panel} from 'react-bootstrap';
import {isBrowser} from 'react-device-detect';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter';

const Comic = props => {

	if (props.comic) {
		const comic = props.comic;
		const columns = [{
			dataField: 'name',
			text: 'Characters',
			filter: textFilter(),
			headerAlign: 'center'
		}, {
			dataField: 'resourceURI',
			text: 'URI',
			hidden: true
		}];
		const rowEvents = {
			onClick: (e, row, rowIndex) => {
				console.log('row event: e=' + e + ' - row=' + JSON.stringify(row) + ' - rowIndex' + rowIndex);
			}
		};
		const renderCharacters = (comic) => {
			if (comic.characters && comic.characters.available > 0) {
				return (
					<BootstrapTable keyField='name' data={comic.characters.items} columns={columns}
									filter={filterFactory()} rowEvents={rowEvents} striped={true} hover={true}/>
				)
			}
			return null;
		};

		return (
			<Panel eventKey={comic.id}>
				<Panel.Heading>
					<Panel.Title toggle>{comic.title}</Panel.Title>
				</Panel.Heading>
				<Panel.Body collapsible>
					<Media>
						<Media.Left>
							<img width={isBrowser ? 168 : 75} height={isBrowser ? 252 : 112}
								 alt={isBrowser ? 'portrait_fantastic' : 'portrait_small'}
								 src={comic.thumbnail.path + (isBrowser ? '/portrait_fantastic.' : '/portrait_small.') + comic.thumbnail.extension}/>
						</Media.Left>
						<Media.Body>
							<Media.Heading>[#{comic.issueNumber}] {comic.title}</Media.Heading>
							<p><a href={comic.urls[0].url} target="_blank">See on Marvel</a></p>
							<p>{comic.description}</p>
							{renderCharacters(comic)}
						</Media.Body>
					</Media>
				</Panel.Body>
			</Panel>
		)
	} else {
		return (
			<Panel eventKey="-1">
				<Panel.Heading>
					<Panel.Title>No comic</Panel.Title>
				</Panel.Heading>
			</Panel>
		)
	}
};

export default Comic;