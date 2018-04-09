import React from 'react';
import {Media, Panel, Button} from 'react-bootstrap';
import {isBrowser} from 'react-device-detect';

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
							<img width={isBrowser ? 168 : 75} height={isBrowser ? 252 : 112}
								 alt={isBrowser ? 'portrait_fantastic' : 'portrait_small'}
								 src={comic.thumbnail.path + (isBrowser ? '/portrait_fantastic.' : '/portrait_small.') + comic.thumbnail.extension}/>
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