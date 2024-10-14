import mongoose from 'mongoose';
const MONGO_URI ='mongodb+srv://shristyv862:862SH@shristycluster.zj6ce.mongodb.net/?retryWrites=true&w=majority&appName=shristyCluster'

const connectDB = async () => {
    console.log('Attempting to connect to MongoDB with URI:', MONGO_URI);
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed', err);
    process.exit(1);
  }
};

module.exports = connectDB;