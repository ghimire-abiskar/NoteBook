const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebook";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("connected successfully");
    } catch (error) {
        console.error("Could not connect to MongoDB:", error);
    }
}

module.exports = connectToMongo;
