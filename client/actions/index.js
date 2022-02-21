import axios from 'axios';
import * as api from '../api/index.js';

export const join = async(formData) => {
    let data;
    try{
        data = (await api.joinClub(formData)).data ;
    } catch(error){
        console.log(error);
    }
    return data;
}
export const create = async(formData) =>{
    let data;
    try{
        data = (await api.createClub(formData));
        data?.data ? data = data?.data : data = data
    } catch(error){
        console.log(error);
    }
    return data;
}


export const addPlayer = async({id,name}) => {
    try{
        await api.addPlayer({id,name});
    } catch(error){
        console.log(error);
    }
}
export const deletePlayer = async({id,playerId}) => {
    try{
        await api.deletePlayer({id,playerId});
    } catch(error){
        console.log(error);
    }
}


export const startMatch = async(data) => {
    try{
        if(!data.homeTeam.length)data.homeTeam="Home Team";
        if(!data.awayTeam.length)data.awayTeam="Away Team";
        if(!data?.overs)data.overs=10;
        
        await api.startMatch(data);
    } catch(error){
        console.log(error);
    }
}
export const addOpeners = async(data) => {
    try{
        await api.addOpeners(data);
    } catch(error){
        console.log(error);
    }
}
export const newOver = async(data) => {
    try{
        await api.newOver(data);
    } catch(error){
        console.log(error);
    }
}
export const wicket = async(data) => {
    try{
        await api.wicket(data);
    } catch(error){ 
        console.log(error);
    }
}
export const addBall = async(data) => {
    try{
        await api.addBall(data);
    } catch(error){
        console.log(error);
    }
}
export const saveMatch = async({id}) => {
    try{
        await api.saveMatch({id});
    } catch(error){
        console.log(error);
    }
}
export const deleteMatch = async({id}) => {
    try{
        await api.deleteMatch({id});
    } catch(error){
        console.log(error);
    }
}



export const getClubById = async({id}) => {
    let data;
    try{
        data = (await api.getClubById({id})).data ;
    } catch(error){
        console.log(error);
    }
    return data;
}

export const getPlayers = async({id}) => {
    let data;
    try{
        data = (await api.getPlayers({id})).data ;
    } catch(error){
        console.log(error);
    }
    return data;
}

export const getLive = async({id}) => {
    let data;
    try{
        data = (await api.getLive({id})).data;
    } catch(error){
        console.log(error);
    }
    return data;
}

export const getBowlerLive = async({id,playerId}) => {
    let data;
    try{
        data = (await api.getBowlerLive({id,playerId})).data ;
    }catch(error){
        console.log(error);
    }
    return data;
}

export const getBatsmanLive = async({id,playerId}) => {
    let data;
    try{
        data = (await api.getBatsmanLive({id,playerId})).data ;
    }catch(error){
        console.log(error);
    }
    return data;
}

export const getMatches = async({id}) => {
    let data;
    try{
        data = (await api.getMatches({id})).data ;
    }catch(error){
        console.log(error);
    }
    return data;
}

export const getBatsmanStats = async({id}) => {
    let data;
    try{
        data = (await api.getBatsmanStats({id})).data ;
    }catch(error){
        console.log(error);
    }
    return data;
}

export const getBowlerStats = async({id}) => {
    let data;
    try{
        data = (await api.getBowlerStats({id})).data ;
    }catch(error){
        console.log(error);
    }
    return data;
}