import mongoose from "mongoose";
import mongoose_fuzzy_searching from "mongoose-fuzzy-searching";

const BeatmapsetSchema = new mongoose.Schema(
  {
    added_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      select: false,
    },
    osu_id: {
      type: Number,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    creator_id: {
      type: Number,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    favourite_count: {
      type: Number,
      required: true,
    },
    play_count: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    is_tournament: {
      type: Boolean,
      default: false,
    },
    covers: {
      card: String,
      "card@2x": String,
      cover: String,
      "cover@2x": String,
      list: String,
      "list@2x": String,
      slimcover: String,
      "slimcover@2x": String,
    },
    beatmaps: [
      {
        difficulty_rating: Number,
        id: Number,
        mode: String,
        total_length: Number,
        version: String,
        accuracy: Number,
        beatmapset_id: Number,
        bpm: Number,
        drain: Number,
        hit_length: Number,
        mode_int: Number,
        passcount: Number,
        playcount: Number,
        status: String,
        url: String,
      },
    ],
    submitted_date: Date,
    tags: {
      type: [String],
    },
    used_in: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pool",
        },
      ],
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toJSON: {
      virtuals: true,
    },
  }
);

BeatmapsetSchema.virtual("song_length").get(function () {
  const [first] = this.beatmaps || [];
  const minutes = Math.floor((first ? first.total_length : 0) / 60);
  const seconds = (first ? first.total_length : 0) % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`; // 7:03
});

BeatmapsetSchema.virtual("diff_amount").get(function () {
  const diffs = this.beatmaps || [];
  const count = diffs.length;
  return count;
});

BeatmapsetSchema.plugin(mongoose_fuzzy_searching, {
  fields: [
    {
      name: "artist",
      weight: 2,
    },
    {
      name: "title",
      weight: 4,
    },
    {
      name: "creator",
      weight: 3,
    },
    {
      name: "tags",
      weight: 1,
      prefixOnly: true,
    },
  ],
});

const BeatmapModel = mongoose.model("Beatmapset", BeatmapsetSchema);

export default BeatmapModel;
