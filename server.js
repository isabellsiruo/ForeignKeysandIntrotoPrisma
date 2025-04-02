//import express to create server
const express = require('express');

//import morgan for logging requests to console
const morgan = require('morgan');

//import Prisma client (connecting to DB)
const prisma = require('./prisma');

//initialize express application
const app = express();

//tell Express to automatically parse JSON in request bodies
app.use(express.json());

//use morgan middleware to log incoming requests (for debugging)
app.use(morgan('dev'));

//beginning of ROUTES

//GET /api/players -> return all players
app.get('/api/players', async (req, res, next) => {
  try {
    //get all players from db
    const players = await prisma.player.findMany(); 
    //send array of players back
    res.send(players); 
  } catch (err) {
    //send error to error handler if something breaks
    next(err); 
  }
});

//POST /api/players -> add new player
app.post('/api/players', async (req, res, next) => {
  try {
    const newPlayer = await prisma.player.create({
      data: {
        name: req.body.name,
        breed: req.body.breed,
        status: req.body.status,
      },
    });
    //201 = created
    res.status(201).send(newPlayer); 
  } catch (err) {
    next(err);
  }
});

//GET /api/players/:id -> get one player by ID
app.get('/api/players/:id', async (req, res, next) => {
  try {
    const player = await prisma.player.findUnique({
      where: { id: Number(req.params.id) },
    });
    res.send(player);
  } catch (err) {
    next(err);
  }
});

//PUT /api/players/:id -> update player (status only)
app.put('/api/players/:id', async (req, res, next) => {
  try {
    const updatedPlayer = await prisma.player.update({
      where: { id: Number(req.params.id) },
      data: {
        status: req.body.status,
      },
    });
    res.send(updatedPlayer);
  } catch (err) {
    next(err);
  }
});

//DELETE /api/players/:id -> delete player
app.delete('/api/players/:id', async (req, res, next) => {
  try {
    await prisma.player.delete({
      where: { id: Number(req.params.id) },
    });
    //no content (successful delete)
    res.sendStatus(204); 
  } catch (err) {
    next(err);
  }
});

//error handling
app.use((err, req, res, next) => {
  //log error for devs
  console.error(err); 
  //send error as JSON
  res.status(500).send({ error: err.message }); 
});

//start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Puppy server is listening on port ${port}`);
});

//basic error handler
app.use((err, req, res, next) => {
  console.error('ERROR:', err);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});
