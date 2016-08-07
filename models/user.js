var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	profile_id: { type: String, default: '' },
	full_name: { type: String, default: '' },
	profile_pic: { type: String, default: '' }
});

module.exports = mongoose.model('User', UserSchema);