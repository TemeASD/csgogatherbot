const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const PlayerSchema= new Schema({
    //discord
	username: {
		type: String,
	},
	popflashId: {
        type: String,
        required: [true, 'no popflash id provided']
	},
	elo: {
		type: Number,
    },
});


//exporttaa "schema"
module.exports = mongoose.model('player', PlayerSchema);