const { MongoClient, ServerApiVersion } = require("mongodb");
const url =
  "mongodb+srv://chandansingh17801:T8VDPaafuzpaigBN@cluster0.dys5pzd.mongodb.net/events_test?retryWrites=true&w=majority";

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const addEvent = async (req, res, next) => {
  const newEvent = {
    type: "event",
    uid: "e" + Math.random(),
    name: req.body.name,
    tagline: req.body.tagline,
    schedule: req.body.schedule,
    description: req.body.description,
    image: req.body.image,
    moderator: req.body.moderator,
    category: req.body.category,
    sub_category: req.body.sub_category,
    rigor_rank: req.body.rigor_rank,
    attendees: [],
  };

  let result;

  try {
    await client.connect();
    result = await client.db().collection("events").insertOne(newEvent);
  } catch (error) {
    return res.json({ message: "Could not store data." });
  } finally {
    client.close();
  }

  res.json({ id: result.insertedId });
};

module.exports = addEvent;
