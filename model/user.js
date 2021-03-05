const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true },
    boardData: { 
        boardId: {
            type: Number,
            default: 0
        },
        board: {
            laneOne: [],
            laneTwo: [],
            laneThree: []
        }
    }
}, 
{ collation: 'users' })

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model