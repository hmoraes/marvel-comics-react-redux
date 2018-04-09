import React from 'react';
import {isBrowser} from 'react-device-detect';
import {Media} from 'react-bootstrap';

const Character = props => {

	if (props.character) {
		const character = props.character;
		return (
			<Media>
				<Media.Left>
					<img width={isBrowser ? 168 : 75} height={isBrowser ? 252 : 112}
						 alt={isBrowser ? 'portrait_fantastic' : 'portrait_small'}
						 src={character.thumbnail.path + (isBrowser ? '/portrait_fantastic.' : '/portrait_small.') + character.thumbnail.extension}/>
				</Media.Left>
				<Media.Body>
					<Media.Heading>{character.name}</Media.Heading>
					<p><a href={character.urls[0].url} target="_blank">See on Marvel</a></p>
					<p>{character.description}</p>
				</Media.Body>
			</Media>
		);
	} else {
		return null;
	}
};

export default Character;