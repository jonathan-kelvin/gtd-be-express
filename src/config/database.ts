import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}`;

  try {
    const conn = await mongoose.connect(uri);

    console.log(`🪛[database]: MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
