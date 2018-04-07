import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://gateway.marvel.com';

const encode = encodeURIComponent;
const responseBody = res => res.data;

let apikey = null;
const apikeyPlugin = req => {
	if (apikey) {
		req.query({apikey: apikey});
	}
};

let limitCount = 10;
const limit = (count, p) => ({limit: count, offset: p ? p * count : 0});

const requests = {
	del: url =>
		superagent.del(`${API_ROOT}${url}`).use(apikeyPlugin).then(responseBody),
	get: (url, query, page) =>
		superagent.get(`${API_ROOT}${url}`, query).use(apikeyPlugin).query(limit(limitCount, page)).then(responseBody),
	put: (url, body) =>
		superagent.put(`${API_ROOT}${url}`, body).use(apikeyPlugin).then(responseBody),
	post: (url, body) =>
		superagent.post(`${API_ROOT}${url}`, body).use(apikeyPlugin).then(responseBody)
};

const ListComics = {
	searchByTitle: (title, page) =>
		requests.get('/v1/public/comics', {title: title}, page),
	searchByTitleStartsWith: (titleStartsWith, page) =>
		requests.get('/v1/public/comics', {titleStartsWith: titleStartsWith}, page),
	searchByStartYear: (startYear, page) =>
		requests.get('/v1/public/comics', {startYear: startYear}, page)
};

const ListCharacters = {
	getByComicId: (comicId, page) =>
		requests.get(`/v1/public/comics/${comicId}/characters`, None, page),
	searchByName: (comicId, name, page) =>
		requests.get(`/v1/public/comics/${comicId}/characters`, {name: name}, page),
	searchByNameStartsWith: (comicId, nameStartsWith, page) =>
		requests.get(`/v1/public/comics/${comicId}/characters`, {nameStartsWith: nameStartsWith}, page)
};

export default {
	ListComics,
	ListCharacters,
	setApikey: _apikey => {
		apikey = _apikey;
	},
	setLimitCount: _limitCount => {
		limitCount = _limitCount;
	},
};
