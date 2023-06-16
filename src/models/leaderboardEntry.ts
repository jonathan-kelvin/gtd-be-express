import mongoose from 'mongoose';

const leaderboardEntrySchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      required: true,
      unique: true,
    },
    inputterName: {
      type: String,
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
    og: {
      type: Number,
      required: true,
    },
    house: {
      type: Number,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: '-',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
