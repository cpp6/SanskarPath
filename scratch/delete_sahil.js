const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb://database2:database2@ac-qok1iu2-shard-00-00.p4ztr4z.mongodb.net:27017,ac-qok1iu2-shard-00-01.p4ztr4z.mongodb.net:27017,ac-qok1iu2-shard-00-02.p4ztr4z.mongodb.net:27017/sanskaarpath?ssl=true&replicaSet=atlas-3pc1qh-shard-0&authSource=admin&appName=Cluster0";

async function deleteSahil() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("sanskaarpath");
    const users = db.collection("users");
    
    const id = "69dd4b0490c83d6a2c3169b6";
    const result = await users.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 1) {
      console.log("SUCCESS: User Sahil (69dd4b0490c83d6a2c3169b6) has been deleted.");
    } else {
      console.log("FAILURE: No user found with that ID.");
    }
  } catch (err) {
    console.error("DELETE_ERROR: " + err.message);
  } finally {
    await client.close();
  }
}

deleteSahil();
