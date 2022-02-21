import axios from 'axios';

// const API = axios.create({baseURL:'http://192.168.2.208:5000'});
const API = axios.create({baseURL:'https://cricbuddy.herokuapp.com/'});


export const joinClub = (formData) => API.post('/club/join',formData,{headers : {"Content-Type": "application/json",}});
export const createClub = (formData) => API.post('/club/create',formData);

export const addPlayer = ({id,name}) => API.patch(`/club/id/${id}/addPlayer`,{name});
export const deletePlayer = ({id,playerId}) => API.patch(`club/id/${id}/playerId/${playerId}/deletePlayer`);


export const startMatch = (data) => API.patch(`/club/id/${data.id}/startMatch`,data);
export const addOpeners = (data) => API.patch(`/club/id/${data.id}/addOpeners`,data);
export const newOver = (data) => API.patch(`/club/id/${data.id}/newOver`,data);
export const wicket = (data) => API.patch(`/club/id/${data.id}/wicket`,data);
export const addBall = (data) => API.patch(`/club/id/${data.id}/addBall`,data);

export const saveMatch = ({id}) => API.patch(`/club/id/${id}/saveMatch`);
export const deleteMatch = ({id}) => API.patch(`/club/id/${id}/deleteMatch`);

export const getClubs = () => API.get('/club');
export const getClubById = ({id}) => API.get(`/club/id/${id}`);
export const getPlayers = ({id}) => API.get(`/club/id/${id}/players`);
export const getLive = ({id}) => API.get(`/club/id/${id}/live`);
export const getBatsmanLive = ({id,playerId}) => API.get(`/club/id/${id}/playerId/${playerId}/getBatsmanLive`);
export const getBowlerLive = ({id,playerId}) => API.get(`/club/id/${id}/playerId/${playerId}/getBowlerLive`);
export const getMatches = ({id}) => API.get(`/club/id/${id}/matches`);
export const getBatsmanStats = ({id}) => API.get(`/club/id/${id}/batsmanStats`);
export const getBowlerStats = ({id}) => API.get(`/club/id/${id}/bowlerStats`);