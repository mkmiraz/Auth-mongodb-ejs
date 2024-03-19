import mongoose from "mongoose";

// mongodb connection

const mongoDBConnection = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`mongoDB Connected succesful`.bgMagenta.green);
    return connect;
  } catch (error) {
    console.log(`MongoDb server Error`.bgBlue.black);
  }
};

// export DB
export default mongoDBConnection;
