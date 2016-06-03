var dbo = require('./dbo'),
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 12;

var OwnerSchema = new dbo.Schema({
	name: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true},
	authType: { type: String}
}, {collection: "owner"});

// bcrypt Middleware!
OwnerSchema.pre('save', function(next) {
	var owner = this;

	// only hash the password if it has been modified (or is new)
	if (!owner.isModified('password')) return next();

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);

		// hash the password using our new salt
		bcrypt.hash(owner.password, salt, function(err, hash) {
			if (err) return next(err);

			// override the cleartext password with the hashed one
			owner.password = hash;
			next();
		});
	});
});

OwnerSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

module.exports = dbo.model("Rezoomae", OwnerSchema);