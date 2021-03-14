import mongoose from "mongoose";
import mongoose_fuzzy_searching from "mongoose-fuzzy-searching";

export const tags = {
  //Suggested Round
  qualifiers: "qualifiers",
  group_stage: "group_stage",
  round_64: "round_64",
  round_32: "round_32",
  round_16: "round_16",
  quarter: "quarterfinal",
  semi_final: "semifinal",
  final: "final",
  grand_final: "grand_final",
  //Length
  short: "short_length",
  regular: "regular_length",
  long: "long_length",
  //Suggested mod
  no_mod: "nm_tag",
  hard_rock: "hr_tag",
  hidden: "hd_tag",
  double_time: "dt_tag",
  free_mods: "fm_tag",
  flashlight: "fl_tag",
  tie_breaker: "tb_tag",
  //Map type
  consistency: "consistency",
  stream: "stream",
  tech: "tech",
  burst: "burst",
  sv_heavy: "sv_heavy",
  slow_jam: "slow_jam",
  finishers: "finishers",
  speed: "speed",
  memory: "memory",
  anti_hr: "anti_hr",
  anti_hd: "anti_hd",
  anti_hdhr: "anti_hdhr"

};


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
    pool_tags: {
      type: [
        {
          type: [String],
          // default should be "short" if hit_length between 0 and 149, "regular" if hit_length between 150 and 269, "long" if hit_length between 270 and 99999
          default: () => [],
          enum: [tags.qualifiers, tags.group_stage, tags.round_64, tags.round_32, tags.round_16, tags.quarter, tags.semi_final, tags.final, tags.grand_final,
          tags.short, tags.regular, tags.long, tags.no_mod, tags.hard_rock, tags.hidden, tags.double_time, tags.free_mods, tags.flashlight, tags.tie_breaker,
          tags.consistency, tags.stream, tags.tech, tags.burst, tags.sv_heavy, tags.slow_jam, tags.finishers, tags.speed, tags.memory, tags.anti_hr, tags.anti_hd, tags.anti_hdhr],
        }
      ]
    }
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
