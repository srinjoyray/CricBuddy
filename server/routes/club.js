const express = require('express');
const { join, create, getClubs, getClubById, addPlayer, updatePlayer, deletePlayer, getPlayers, startMatch, getLive, addBall, getBowlerLive, getBatsmanLive, addOpeners, newOver, wicket, saveMatch, deleteMatch, getMatches, getBatsmanStats, getBowlerStats } = require('../controllers/club');

const router = express.Router();

router.post('/join',join);
router.post('/create',create);
router.get('/',getClubs);
router.get('/id/:id',getClubById);

router.get('/id/:id/players',getPlayers);
router.patch('/id/:id/addPlayer',addPlayer);
router.patch('/id/:id/playerId/:playerId/updatePlayer',updatePlayer);
router.patch('/id/:id/playerId/:playerId/deletePlayer',deletePlayer);


router.patch('/id/:id/startMatch',startMatch);
router.patch('/id/:id/addOpeners',addOpeners);
router.patch('/id/:id/newOver',newOver);
router.patch('/id/:id/wicket',wicket);
router.patch('/id/:id/addBall',addBall);

router.patch('/id/:id/saveMatch',saveMatch);
router.patch('/id/:id/deleteMatch',deleteMatch);

router.get('/id/:id/live',getLive);
router.get('/id/:id/playerId/:bowlerId/getBowlerLive',getBowlerLive);
router.get('/id/:id/playerId/:batsmanId/getBatsmanLive',getBatsmanLive);
router.get('/id/:id/matches',getMatches);
router.get('/id/:id/batsmanStats',getBatsmanStats);
router.get('/id/:id/bowlerStats',getBowlerStats);


module.exports = router;