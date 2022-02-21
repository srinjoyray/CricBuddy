const bcrypt = require('bcryptjs');

const Club = require('../models/club.js');

const join = async(req,res) => {
    const {nickname,password} = req.body;
    try{
        const existingClub = await Club.findOne({nickname});
        if(!existingClub) return res.status(404).json({message : "Club doesn't exist"});

        const isPasswordCorrect = await bcrypt.compare(password,existingClub.password); 

        if(!isPasswordCorrect) return res.status(400).json({message :"Invalid credentials"});


        res.status(200).json(existingClub);
    }catch(error) {
        res.status(500).json({message:'Something went wrong.'})
    }
}

const create = async(req,res) => {
    const {name,nickname,password,confirmPassword} = req.body;
    try{
        const existingNickname = await Club.findOne({nickname});

        if(existingNickname) return res.status(400).json({message : "Nickname already exist"});
        if(password!==confirmPassword) return res.status(400).json({message : "Passwords don't match"});

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await Club.create({name,nickname,password:hashedPassword , isLive : false});
        

        res.status(200).json(result);
    }catch(error){
        res.status(500).json({message:'Something went wrong.'})
    }
}

const getClubs = async(req,res) => {
    try{
        const clubs = await Club.find();
        res.status(200).json(clubs);
    }
    catch(error){
        res.status(500).json({message:error})
    }
}
const getClubById = async(req,res) => {
    try{
        const {id} = req.params;
        const club = await Club.findById({_id : id});
        res.status(200).json(club);
    }
    catch(error){
        res.status(500).json({message:error})
    }
}

// PLAYERS
const getPlayers = async(req,res) => {
    try{
        const {id} = req.params;
        const club = await Club.findById({_id : id});
        const players = club.players;
        players.sort(function(a,b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        })
        res.status(200).json(players);
    }
    catch(error){
        res.status(500).json({message:error})
    }
}
const addPlayer = async(req,res) => {
    try{
        const {name} = req.body;
        const {id} = req.params;
        const club = await Club.findById({_id : id});
        club.players.push({name});
        await Club.findByIdAndUpdate({_id : id},club);
        res.status(200).json(club);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:error})
    }
}
const updatePlayer = async(req,res) => {
    try{
        const {name} = req.body;
        const {id,playerId} = req.params;
        const club = await Club.findById({_id : id});
        const players = club.players;
        players.map(item => (item.id === playerId) ? item.name = name  : {});
        club.players = players;
        await Club.findByIdAndUpdate({_id : id},club);
        res.status(200).json(club);
    }
    catch(error){
        res.status(500).json({message:error})
    }
}
const deletePlayer = async(req,res) => {
    try{
        const {id,playerId} = req.params;
        const club = await Club.findById({_id : id});
        const players = club.players;
        const updatedPlayers = players.filter(item => item.id !== playerId);
        club.players = updatedPlayers;
        await Club.findByIdAndUpdate({_id : id},club);
        res.status(200).json(club);
    }
    catch(error){
        res.status(500).json({message:error})
    }
}

// LIVE

const startMatch = async(req,res) => {
    try{
        const {id} = req.params ;
        const { homeTeam , awayTeam , toss , optedFor , overs } = req.body ;

        const club = await Club.findById({_id : id});
        club.isLive = true;
        let batFirst = ((toss==="home" && optedFor=="bat") || (toss==="away" && optedFor==="ball")) ? 'home' : 'away';
        club.live = {homeTeam,awayTeam, overs , toss ,optedFor,batFirst} ;

        await Club.findByIdAndUpdate({_id : id},club);
        res.status(200).json(club.live);
    }
    catch(error){
        res.status(500).json({message:error})
    }
}

const addOpeners = async(req,res) => {
    try{
        const {id} = req.params ;
        const { batsmanName1 , batsmanId1 , batsmanName2 , batsmanId2 , bowlerName , bowlerId } = req.body ;

        const club = await Club.findById({_id : id});
        const live = club.live;
        
        const innings = live?.isFirstInningsComplete ? live?.secondInnings : live?.firstInnings ;
        
        innings.currentBatsman1 = { batsmanName : batsmanName1 , batsmanId : batsmanId1 } ;
        innings.currentBatsman2 = { batsmanName : batsmanName2 , batsmanId : batsmanId2 } ;
        innings.currentBowler = { bowlerName , bowlerId } ;
        
        if(innings.batsmanList.findIndex(item => item.batsmanId === batsmanId1) === -1) innings.batsmanList.push( { batsmanName : batsmanName1 , batsmanId : batsmanId1 } ) 
        
        if(innings.batsmanList.findIndex(item => item.batsmanId === batsmanId2) === -1) innings.batsmanList.push( { batsmanName : batsmanName2 , batsmanId : batsmanId2 } ) 

        if(innings.bowlerList.findIndex(item => item.bowlerId === bowlerId) === -1) innings.bowlerList.push( { bowlerName , bowlerId  } ) ;

        (live.isFirstInningsComplete) ? (live.secondInnings = innings) : (live.firstInnings = innings) ;

        club.live = live ;

        await Club.findByIdAndUpdate({_id : id},club);
        res.status(200).json(club?.live);

    }
    catch(error){
        res.status(500).json({message:error})
    }
}

const newOver = async(req,res) => {
    try{
        const {id} = req.params ;
        const { bowlerName , bowlerId } = req.body ;

        const club = await Club.findById({_id : id});
        const live = club.live;
        const innings = live?.isFirstInningsComplete ? live?.secondInnings : live?.firstInnings ;
        
        innings.currentBowler = { bowlerName , bowlerId } ;
        
        const newBowler = { bowlerName , bowlerId };
        if(innings.bowlerList.findIndex(item => item.bowlerId === bowlerId) === -1) innings.bowlerList.push(newBowler) ;

        innings.overChange = true ; 

        (live.isFirstInningsComplete) ? (live.secondInnings = innings) : (live.firstInnings = innings) ;

        club.live = live ;

        await Club.findByIdAndUpdate({_id : id},club);
        res.status(200).json(club?.live);

    }
    catch(error){
        res.status(500).json({message:error})
    }
}

const wicket = async(req,res) => {
    try{
        const {id} = req.params ;
        const { outBatsmanId , batsmanName , batsmanId } = req.body ;

        const club = await Club.findById({_id : id});
        const live = club.live;
        const innings = live?.isFirstInningsComplete ? live?.secondInnings : live?.firstInnings ;

        if(innings.currentBatsman1.batsmanId === outBatsmanId) innings.currentBatsman1 = {batsmanName , batsmanId }
        if(innings.currentBatsman2.batsmanId === outBatsmanId) innings.currentBatsman2 = {batsmanName , batsmanId }

        innings.batsmanList.map(item => { if(item.batsmanId === outBatsmanId) item.isOut = true })

        const newBatsman = {batsmanName , batsmanId};
        if(batsmanId && innings.batsmanList.findIndex(item => item.batsmanId === batsmanId) === -1) innings.batsmanList.push(newBatsman); 

        (live.isFirstInningsComplete) ? (live.secondInnings = innings) : (live.firstInnings = innings) ;
        club.live = live ;

        await Club.findByIdAndUpdate({_id : id},club);
        res.status(200).json(club?.live);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:error})
    }
}

const addBall = async(req,res) => {
    try{
        const {id} = req.params ;
        const {bowlerName , bowlerId , batsmanName , batsmanId , runs , type , wicket , isAllOut} = req.body;
        const newBall = {bowlerName , bowlerId , batsmanName , batsmanId , runs , type , wicket , isAllOut };

        const club = await Club.findById({_id : id});
        const live = club.live;
        const innings = live.isFirstInningsComplete ? live.secondInnings : live.firstInnings ;
        
        const totalRuns = runs + (type==="wide" || type==="no");
        const batsmanRuns = (type==="bye" || type==="lb") ? 0 : runs ;
        const bowlerRuns = (type==="bye") ? 0 : totalRuns ;

        innings.runs += totalRuns ;
        innings.balls += (type!=="wide" && type!=="no");
        innings.wickets += (wicket!=="none" ? 1 : 0);
        innings.ballDetails.push(newBall);
        
        innings.batsmanList.map(item => {
            if(item.batsmanId === batsmanId){
                item.runs += batsmanRuns ;
                item.balls += (type==="wide") ? 0 : 1 ;
                item.four += (runs===4) ? 1 : 0 ;
                item.six += (runs===6) ? 1 : 0 ;
            }
        })

        innings.bowlerList.map(item => {
            if(item.bowlerId === bowlerId){
                item.runs += bowlerRuns ;
                item.balls += (type==="wide" || type==="no") ? 0 : 1 ;
                item.four += (runs===4) ? 1 : 0 ;
                item.six += (runs===6) ? 1 : 0 ;
                item.runList += bowlerRuns ;
                
                if(wicket !== "none" && wicket !== "runOutStriker" && wicket !== "runOutNonStriker") item.wickets++ ;

                bowlerRuns === 0 ? item.dots++ : item.dots=0 ;
                if(item.balls % 6 == 0 && item.balls > 0){
                    if(item.dots >= 6 ) item.maidens++ ;
                    item.dots = 0 ;
                }
            }
        })

        if(isAllOut)innings.allOut=true;
        
        if(innings.balls%6!==0)innings.overChange = false ;

        if(!live.isFirstInningsComplete){
            live.firstInnings = innings;
            if(innings.balls === live.overs * 6 || isAllOut) live.isFirstInningsComplete = true;
        }
        else{
            live.secondInnings = innings;
            if(innings.balls === live.overs * 6 || isAllOut || innings?.runs>live?.firstInnings?.runs) live.isMatchComplete = true ;     
        }

        if(live?.isMatchComplete){
            if(live?.firstInnings?.runs > live?.secondInnings?.runs){
                live.winner = live?.batFirst==="home" ? 'home' : 'away';
            }
            else if(live?.firstInnings?.runs < live?.secondInnings?.runs){
                live.winner = live?.batFirst==="home" ? 'away' : 'home';
            }
            else{
                live.winner = 'tied';
            }
        }

        club.live = live;

        await Club.findByIdAndUpdate({_id : id},club);
        res.status(200).json(club.live);
    }
    catch(error){
        res.status(500).json({message:error})
    }
}

const saveMatch = async(req,res) => {
    try{
        const {id} = req.params ;
        const club = await Club.findById({_id : id});
        const live = club.live;
        club.isLive = false;
        const newMatch = {
            homeTeam : live.homeTeam, awayTeam : live.awayTeam, overs : live.overs, toss : live.toss , optedFor : live.optedFor, batFirst : live.batFirst, winner : live.winner , 
            firstInnings : {
                runs : live.firstInnings.runs , balls : live.firstInnings.balls , wickets : live.firstInnings.wickets , allOut : live.firstInnings.allOut , batsmanList : live.firstInnings.batsmanList , bowlerList : live.firstInnings.bowlerList
            } ,
            secondInnings : {
                runs : live.secondInnings.runs , balls : live.secondInnings.balls , wickets : live.secondInnings.wickets , allOut : live.secondInnings.allOut , batsmanList : live.secondInnings.batsmanList , bowlerList : live.secondInnings.bowlerList
            }
        }
        club.matches.push(newMatch);
        club.live = {};
        await Club.findByIdAndUpdate({_id : id},club);
        res.status(200).json(club.live);
    }
    catch(error){
        res.status(500).json({message:error})
    }
}
const deleteMatch = async(req,res) => {
    try{
        const {id} = req.params ;
        const club = await Club.findById({_id : id});
        club.isLive = false;
        
        await Club.findByIdAndUpdate({_id : id},club);
        res.status(200).json(club.live);
    }
    catch(error){
        res.status(500).json({message:error})
    }
}



const getLive = async(req,res) => {
    try{
        const {id} = req.params ;
        const club = await Club.findById({_id : id});
        
        // console.log(club.live.firstInnings.batsmanList,typeof(club.live.firstInnings.batsmanList),typeof(club.players));

        res.status(200).json(club.live);
    }
    catch(error){
        res.status(500).json({message:error})
    }
}


const getBowlerLive = async(req,res) => {
    try{
        const {id,bowlerId} = req.params ;
        const club = await Club.findById({_id : id});
        const live = club.live;
        const ballDetails = live.isFirstInningsComplete ? live.secondInnings.ballDetails : live.firstInnings.ballDetails ;
        const filteredBalls = ballDetails.filter(item=>item.bowlerId===bowlerId);
        let balls=0,runs=0,wickets=0,maidens=0,dots=0;
        filteredBalls.map((item,index)=>{
            if(["none","lb","bye"].indexOf(item.type)>=0)balls++;
            if(item.type!=="bye"){
                runs+=item.runs+(["wide","no"].indexOf(item.type) >=0 ? 1 : 0);
            }
            if(["none","runOutStriker","runOutNonStriker"].indexOf(item.wicket)===-1)wickets++;
            
            if(item.runs===0 && ["wide","no"].indexOf(item.type)===-1)dots++;
            else dots=0;

            if(dots>=6 && index%6==5){
                dots=0, maidens++;
            }
        });
        const bowler = {balls,runs,wickets,maidens ,economy : (runs*6)/balls };

        res.status(200).json(bowler);

    }
    catch(error){
        res.status(500).json({message:error})
    }
}

const getBatsmanLive = async(req,res) => {
    try{
        const {id,batsmanId} = req.params ;
        const club = await Club.findById({_id : id});
        const live = club.live;
        const ballDetails = live.isFirstInningsComplete ? live.secondInnings.ballDetails : live.firstInnings.ballDetails ;
        const filteredBalls = ballDetails.filter(item=>item.batsmanId===batsmanId);
        let balls=0,runs=0,four=0,six=0;
        filteredBalls.map((item,index)=>{
            if(item.type !== "wide")balls++;
            if( ["none","no"].indexOf(item.type)>=0){
                runs+=item.runs;
                if(item.runs===4)four++;
                if(item.runs===6)six++;
            }

        });
        const batsman = {balls,runs,four,six,sr : (runs*100)/balls };

        res.status(200).json(batsman);

    }
    catch(error){
        res.status(500).json({message:error})
    }
}

const getMatches = async(req,res) => {
    try{
        const {id} = req.params ;
        const club = await Club.findById({_id : id});
        const matches = club.matches;

        res.status(200).json(matches.reverse());

    }
    catch(error){
        res.status(500).json({message:error})
    }
}

const getBatsmanStats = async(req,res) => {
    try{
        const {id} = req.params;
        const club = await Club.findById({_id : id});
        const matches = club.matches;
        const players = [];
        club.players.map((p)=>{
            const player = {runs : 0 , innings : 0, isOut : 0 , balls : 0 , four : 0 , six : 0 , id : p._id , name : p.name , avg : 0 , sr : 0 }
            players.push(player);
        })

        matches.map((match)=>{
            match.firstInnings.batsmanList.map((batsman)=>{
                players.map((player)=>{
                    if(player.id.toString() === batsman.batsmanId.toString()){
                        player.runs += batsman.runs;
                        player.innings++ ;
                        if(batsman.isOut) player.isOut++;
                        player.balls += batsman.balls;
                        player.four += batsman.four;
                        player.six += batsman.six;
                        player.avg = player.runs/Math.max(player.isOut,1);
                        player.sr = (player.runs*100)/Math.max(player.balls,1) ; 
                    }
                })
            })
            match.secondInnings.batsmanList.map((batsman)=>{
                players.map((player)=>{
                    if(player.id.toString() === batsman.batsmanId.toString()){
                        player.runs += batsman.runs;
                        player.innings++ ;
                        if(batsman.isOut) player.isOut++;
                        player.balls += batsman.balls;
                        player.four += batsman.four;
                        player.six += batsman.six;
                        player.avg = player.runs/Math.max(player.isOut,1);
                        player.sr = (player.runs*100)/Math.max(player.balls,1) ; 
                    }
                })
            })
        })
        players.sort(function(a,b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        })
        res.status(200).json(players);
    }
    catch(error){
        res.status(500).json({message:error})
    }
}

const getBowlerStats = async(req,res) => {
    try{
        const {id} = req.params;
        const club = await Club.findById({_id : id});
        const matches = club.matches;
        const players = [];
        club.players.map((p)=>{
            const player = {id : p._id , name : p.name , runs : 0 , balls : 0 , maidens : 0 , wickets : 0 , avg : 0 , econ : 0 }
            players.push(player);
        })

        matches.map((match)=>{
            match.firstInnings.bowlerList.map((bowler)=>{
                players.map((player)=>{
                    if(player.id.toString() === bowler.bowlerId.toString()){
                        player.runs += bowler.runs;
                        player.balls += bowler.balls;
                        player.maidens += bowler.maidens;
                        player.wickets += bowler.wickets;
                        player.avg = player.runs/Math.max(player.wickets,1);
                        player.econ = (player.runs*6) / player.balls ;
                    }
                })
            })
            match.secondInnings.bowlerList.map((bowler)=>{
                players.map((player)=>{
                    if(player.id.toString() === bowler.bowlerId.toString()){
                        player.runs += bowler.runs;
                        player.balls += bowler.balls;
                        player.maidens += bowler.maidens;
                        player.wickets += bowler.wickets;
                        player.avg = player.runs/Math.max(player.wickets,1);
                        player.econ = (player.runs*6) / player.balls ;
                    }
                })
            })
        })
        players.sort(function(a,b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        })
        res.status(200).json(players);
    }
    catch(error){
        res.status(500).json({message:error})
    }
}

module.exports = {join , create ,
    getClubs , getClubById ,
    addPlayer , updatePlayer , deletePlayer , getPlayers ,
    startMatch , addOpeners , newOver , wicket , 
    saveMatch , deleteMatch , 
    getLive , addBall , getBowlerLive , getBatsmanLive , getMatches , getBatsmanStats , getBowlerStats
};