const express = require("express");
const router = express.Router();
const prisma = require("../prisma");

//GET /api/players -> get all players
router.get("/", async (req, res, next) => {
  try {
    const players = await prisma.player.findMany();
    res.json(players);
  } catch (err) {
    next(err);
  }
});

//GET /api/players/:id -> get player by ID
router.get("/:id", async (req, res, next) => {
  try {
    const player = await prisma.player.findUnique({
      where: { id: Number(req.params.id) },
    });
    res.json(player);
  } catch (err) {
    next(err);
  }
});

//POST /api/players -> create new player
router.post("/", async (req, res, next) => {
  try {
    const newPlayer = await prisma.player.create({
      data: {
        name: req.body.name,
        breed: req.body.breed,
        status: req.body.status,
      },
    });
    res.status(201).json(newPlayer);
  } catch (err) {
    next(err);
  }
});

//PUT /api/players/:id -> update player's status
router.put("/:id", async (req, res, next) => {
  try {
    const updatedPlayer = await prisma.player.update({
      where: { id: Number(req.params.id) },
      data: {
        name: req.body.name,
        breed: req.body.breed,
        status: req.body.status,
      },
    });
    res.json(updatedPlayer);
  } catch (err) {
    next(err);
  }
});

//DELETE /api/players/:id -> delete player
router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.player.delete({
      where: { id: Number(req.params.id) },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
