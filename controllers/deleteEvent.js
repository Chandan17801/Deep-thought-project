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

const deleteEvent = async (req, res, next) => {
  const data = req.params.id;
  const eventId = data.split("=")[1];
  const o_id = new ObjectId(eventId);

  try {
    await client.connect();
    event = await client.db().collection("events").deleteOne({ _id: o_id });
  } catch (error) {
    return res.json({ message: "Could not retrieve data." });
  } finally {
    client.close();
  }

  res.json({ message: "Event Deleted" });
};

module.exports = deleteEvent;
