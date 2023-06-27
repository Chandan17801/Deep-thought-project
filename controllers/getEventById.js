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

const getEventById = async (req, res, next) => {
  if (!req.query.id) return next();

  const eventId = req.query.id;
  const o_id = new ObjectId(eventId);

  let event;
  try {
    await client.connect();
    event = await client
      .db()
      .collection("events")
      .find({ _id: o_id })
      .toArray();
  } catch (error) {
    return res.json({ message: "Could not retrieve data." });
  } finally {
    client.close();
  }

  res.json({ event });
};

module.exports = getEventById;
