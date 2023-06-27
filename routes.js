const express = require("express");
const router = express.Router();

const getEventById = require("./controllers/getEventById");
const getEventByRecency = require("./controllers/getEventByRecency");
const addEvent = require("./controllers/addEvent");
const replaceEvent = require("./controllers/replaceEvent");
const deleteEvent = require("./controllers/deleteEvent");

router.get("/events", getEventById);
router.get("/events", getEventByRecency);
router.post("/events", addEvent);
router.put("/events/:id", replaceEvent);
router.delete("/events/:id", deleteEvent);

module.exports = router;
