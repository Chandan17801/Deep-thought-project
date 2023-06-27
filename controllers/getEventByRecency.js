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

const getEventByRecency = async (req, res, next) => {
  if (!req.query.type || !req.query.limit || !req.query.page) return next();
  const { type, limit, page } = req.query;

  let event;
  try {
    await client.connect();
    const collection = await client.db().collection("events");
    const size = await collection.count();
    event = await collection
      .find()
      .skip(size - limit)
      .toArray();
  } catch (error) {
    return res.json({ message: "Could not retrieve data." });
  } finally {
    client.close();
  }

  res.json({ event });
};

module.exports = getEventByRecency;
