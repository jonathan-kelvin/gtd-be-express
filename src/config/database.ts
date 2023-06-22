import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = `${process.env.DB_URI}`;

  try {
    const conn = await mongoose.connect(uri);

    console.log(`🪛[database]: MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
