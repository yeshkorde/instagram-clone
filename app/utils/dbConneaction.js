import mongoose from "mongoose";

let isConnected;

const connectToDatabase = async () => {
    if(isConnected){
        console.log('existing coneaction ');
        return mongoose.connection
    }
    const db = await mongoose.connect(process.env.MONGO_URI)
     isConnected = db.connections[0].readyState;
     console.log(db.connections[0].readyState);
     console.log('db conneacated');
};

export default connectToDatabase;