const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    boards:[ 
      {
        board_Id: { type: Number,},
        board_Name: { type: String},
        boardLanes:
        [
          { 
            lane_One:
            [
              {
                card_id: { type: Number,},
                card_Text: { type: String}
              }
            ],
            lane_Two:
            [
              {
                card_id: { type: Number,},
                card_Text: { type: String}
              }
            ],
            lane_Three:
            [
              {
                card_id: { type: Number,},
                card_Text: { type: String}
              }
            ],

          }
        ]
      }
    ] 
    
  },
  { collation: "users" }
);



const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;


