const mongoose = require("mongoose");
const MONGO_URI = "mongodb+srv://Kishan:Kishan%40Chat@cluster0.7ygxn9k.mongodb.net/?retryWrites=true&w=majority"

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDb;
