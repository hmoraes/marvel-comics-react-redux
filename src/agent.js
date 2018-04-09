import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import CacheModule from 'cache-service-cache-module';
import SuperAgentCache from 'superagent-cache-plugin';

const superagent = superagentPromise(_superagent, global.Promise);
const cache = new CacheModule({storage: 'session', defaultExpiration: 86400});
const superagentCache = SuperAgentCache(cache);

const API_ROOT = 'https://gateway.marvel.com';

const responseBody = res => res.body;

const errorResponse = error => {
	throw error
};

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
		superagent.del(`${API_ROOT}${url}`).use(apikeyPlugin).then(responseBody, errorResponse),
	get: (url, query, page) =>
		superagent.get(`${API_ROOT}${url}`, query).use(superagentCache).use(apikeyPlugin).query(limit(limitCount, page)).then(responseBody, errorResponse),
	put: (url, body) =>
		superagent.put(`${API_ROOT}${url}`, body).use(apikeyPlugin).then(responseBody, errorResponse),
	post: (url, body) =>
		superagent.post(`${API_ROOT}${url}`, body).use(apikeyPlugin).then(responseBody, errorResponse)
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
	getById: (id) =>
		requests.get(`/v1/public/characters/${id}`),
	getByComicId: (comicId, page) =>
		requests.get(`/v1/public/comics/${comicId}/characters`, null, page),
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
