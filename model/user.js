const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, //unique is that there cannot be the same 2 usernames
    password: { type: String, required: true },
    boards: {type: String, required: false}
    
}, 
{ collation: 'users' })

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model