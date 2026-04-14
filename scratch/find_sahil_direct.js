const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb://database2:database2@ac-qok1iu2-shard-00-00.p4ztr4z.mongodb.net:27017,ac-qok1iu2-shard-00-01.p4ztr4z.mongodb.net:27017,ac-qok1iu2-shard-00-02.p4ztr4z.mongodb.net:27017/sanskaarpath?ssl=true&replicaSet=atlas-3pc1qh-shard-0&authSource=admin&appName=Cluster0";

async function findSahil() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("sanskaarpath");
    const users = db.collection("users");
    
    // Find sahil regardless of case
    const sahil = await users.findOne({ name: { $regex: /^sahil$/i } });
    if (sahil) {
      console.log("SAHIL_FOUND_ID: " + sahil._id.toString());
      console.log("SAHIL_DETAILS: " + JSON.stringify(sahil));
    } else {
      console.log("SAHIL_NOT_FOUND");
    }
  } catch (err) {
    console.error("SEARCH_ERROR: " + err.message);
  } finally {
    await client.close();
  }
}

findSahil();
