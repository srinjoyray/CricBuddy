const mongoose = require('mongoose');

const clubSchema = mongoose.Schema({
    name : { type:String , required:true },
    nickname : { type : String , required : true },
    password : { type : String , required : true },
    isLive : { type : Boolean } ,
    players : [
        {
            name : { type : String  },
            matches : [
                {
                    battingType : { type : String }, //OUT , NOTOUT , DNB
                    runsScored : { type : Number },
                    ballsFaced : { type : Number },
                    
                    ballsBowled : { type : Number },
                    runsConceded : { type : Number },
                    wickets : { type : Number },
                    
                    result : { type : String }, //W , L , D
                }
            ] , 
            innings : { type : Number },
            runsScored : { type : Number },
            ballsFaced : { type : Number } ,
            highestScore : { type : Number },

            ballsBowled : { type : Number },
            runsConceded : { type : Number },
            wickets : { type : Number } ,
        }
    ] ,
    matches : [
        {
            homeTeam : { type : String },
            awayTeam : { type : String },
            overs : { type : Number },
            toss : { type : String } , // "home" / "away" 
            optedFor : { type : String }, // "bat" / "ball"
            batFirst : { type : String }, //"home" / "away"
            winner : { type : String } ,
            firstInnings : {
                runs : { type : Number  , default : 0},
                balls : { type : Number , default : 0},
                wickets : {  type : Number , default : 0},
                allOut : {type : Boolean , default : false},
                batsmanList : [
                    {
                        batsmanName : { type : String },
                        batsmanId : { type : String },
                        runs : { type : Number , default : 0 },
                        balls : { type : Number , default : 0 },
                        four : { type : Number , default : 0 },
                        six : { type : Number , default : 0 },
                        isOut : { type : Boolean , default : false }
                    }
                ] , 
                bowlerList : [
                    {
                        bowlerName : { type : String } ,
                        bowlerId : { type : String },
                        runs : { type : Number , default : 0 },
                        balls : { type : Number , default : 0 },
                        wickets : { type : Number , default : 0},
                        maidens : { type : Number , default : 0 } ,
                        dots : { type : Number , default : 0} , 
                    }
                ],
            } ,
            
            secondInnings : {
                runs : { type : Number  , default : 0},
                balls : { type : Number , default : 0},
                wickets : {  type : Number , default : 0},
                allOut : {type : Boolean , default : false},
                batsmanList : [
                    {
                        batsmanName : { type : String },
                        batsmanId : { type : String },
                        runs : { type : Number , default : 0 },
                        balls : { type : Number , default : 0 },
                        four : { type : Number , default : 0 },
                        six : { type : Number , default : 0 },
                        isOut : { type : Boolean , default : false }
                    }
                ] , 
                bowlerList : [
                    {
                        bowlerName : { type : String } ,
                        bowlerId : { type : String },
                        runs : { type : Number , default : 0 },
                        balls : { type : Number , default : 0 },
                        wickets : { type : Number , default : 0},
                        maidens : { type : Number , default : 0 } ,
                        dots : { type : Number , default : 0} ,
                    }
                ],
            } ,
        }
    ] ,
    live : {
        homeTeam : { type : String },
        awayTeam : { type : String },
        overs : { type : Number },
        toss : { type : String } , // "home" / "away" 
        optedFor : { type : String }, // "bat" / "ball"
        batFirst : { type : String }, //"home" / "away"
        isFirstInningsComplete : { type : Boolean  , default : false},
        isMatchComplete : { type : Boolean , default : false },
        winner : { type : String } ,
        firstInnings : {
            runs : { type : Number  , default : 0},
            balls : { type : Number , default : 0},
            wickets : {  type : Number , default : 0},
            allOut : {type : Boolean , default : false},
            overChange : { type : Boolean , default : false },
            currentBatsman1 : {
                batsmanName : { type : String },
                batsmanId : { type : String },    
            },
            currentBatsman2 : {
                batsmanName : { type : String },
                batsmanId : { type : String },
            },
            currentBowler : {
                bowlerName : { type : String },
                bowlerId : { type : String },
            },
            ballDetails : [
                {
                    bowlerName : { type : String } ,
                    bowlerId : { type : String },
                    batsmanName : { type : String },
                    batsmanId : { type : String },
                    runs : { type : Number },
                    type : { type : String }, // "wide" , "no" , "bye" , "lb"  , "none"
                    wicket : { type : String }, //"none" , "bowled" , "caught" , "runOutStriker" , "runOutNonStriker"
                    isAllOut : {type : Boolean},
                }
            ] ,
            batsmanList : [
                {
                    batsmanName : { type : String },
                    batsmanId : { type : String },
                    runs : { type : Number , default : 0 },
                    balls : { type : Number , default : 0 },
                    four : { type : Number , default : 0 },
                    six : { type : Number , default : 0 },
                    isOut : { type : Boolean , default : false }
                }
            ] , 
            bowlerList : [
                {
                    bowlerName : { type : String } ,
                    bowlerId : { type : String },
                    runs : { type : Number , default : 0 },
                    balls : { type : Number , default : 0 },
                    wickets : { type : Number , default : 0},
                    maidens : { type : Number , default : 0 } ,
                    dots : { type : Number , default : 0} ,
                }
            ],
        } ,
        
        secondInnings : {
            runs : { type : Number  , default : 0},
            balls : { type : Number , default : 0},
            wickets : {  type : Number , default : 0},
            allOut : {type : Boolean , default : false},
            overChange : { type : Boolean , default : false },
            currentBatsman1 : {
                batsmanName : { type : String },
                batsmanId : { type : String },    
            },
            currentBatsman2 : {
                batsmanName : { type : String },
                batsmanId : { type : String },
            },
            currentBowler : {
                bowlerName : { type : String },
                bowlerId : { type : String },
            },
            ballDetails : [
                {
                    bowlerName : { type : String } ,
                    bowlerId : { type : String },
                    batsmanName : { type : String },
                    batsmanId : { type : String },
                    runs : { type : Number },
                    type : { type : String }, // "wide" , "no" , "bye" , "lb"  , "none"
                    wicket : { type : String }, //"none" , "bowled" , "caught" , "runOutStriker" , "runOutNonStriker"
                    isAllOut : {type : Boolean},
                }
            ] ,
            batsmanList : [
                {
                    batsmanName : { type : String },
                    batsmanId : { type : String },
                    runs : { type : Number , default : 0 },
                    balls : { type : Number , default : 0 },
                    four : { type : Number , default : 0 },
                    six : { type : Number , default : 0 },
                    isOut : { type : Boolean , default : false }
                }
            ] , 
            bowlerList : [
                {
                    bowlerName : { type : String } ,
                    bowlerId : { type : String },
                    runs : { type : Number , default : 0 },
                    balls : { type : Number , default : 0 },
                    wickets : { type : Number , default : 0},
                    maidens : { type : Number , default : 0 } ,
                    dots : { type : Number , default : 0} ,
                }
            ],
        } ,
        
    }

})

module.exports = mongoose.model("Club",clubSchema);