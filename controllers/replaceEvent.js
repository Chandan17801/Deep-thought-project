const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const url =
  "mongodb+srv://chandansingh17801:T8VDPaafuzpaigBN@cluster0.dys5pzd.mongodb.net/events_test?retryWrites=true&w=majority";

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const replaceEvent = async (req, res, next) => {
  const eventId = req.params.id;
  const o_id = new ObjectId(eventId);

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

  let event;

  try {
    await client.connect();
    const collection = await client.db().collection("events");
    event = await collection.find({ _id: o_id }).toArray();
    if (event.length == 0) {
      await collection.insertOne(newEvent);
    } else {
      await collection.updateOne({ _id: o_id }, { $set: newEvent });
    }
  } catch (error) {
    return res.json({ message: "Could not store data." });
  } finally {
    client.close();
  }

  res.json({ message: "Updated" });
};

module.exports = replaceEvent;
