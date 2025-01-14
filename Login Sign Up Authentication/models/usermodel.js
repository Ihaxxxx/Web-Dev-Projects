var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/authtestapp')

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mubashirmandvia:66sxz1hg0qGkbHOZ@test.bizkr.mongodb.net/?retryWrites=true&w=majority&appName=Test";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

const userSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String,
    age : Number
})


module.exports =  mongoose.model("user",userSchema)