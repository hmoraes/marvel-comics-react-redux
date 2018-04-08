import React from 'react';
import {Media, Panel, Button} from 'react-bootstrap';

const Comic = props => {

	if (props.comic) {
		const comic = props.comic;
		return (
			<Panel eventKey={comic.id}>
				<Panel.Heading>
					<Panel.Title toggle>{comic.title}</Panel.Title>
				</Panel.Heading>
				<Panel.Body collapsible>
					<Media>
						<Media.Left>
							<img width={168} height={252} alt="portrait_fantastic"
								 src={comic.thumbnail.path + '/portrait_fantastic.' + comic.thumbnail.extension} />
						</Media.Left>
						<Media.Body>
							<Media.Heading>[#{comic.issueNumber}] {comic.title}</Media.Heading>
							<p><a href={comic.urls[0].url} target="_blank">See on Marvel</a></p>
							<p>{comic.description}</p>
							<Button>Characters</Button>
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