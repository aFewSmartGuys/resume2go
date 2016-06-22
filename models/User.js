var mongoose = require("mongoose"),
	bcrypt = require("bcrypt"),
	SALT_WORK_FACTOR = 12;

var UserSchema = new mongoose.Schema({
	name: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true},
	authType: { type: String, required: true},
	portfolio: { type: String}
});

// bcrypt Middleware!
UserSchema.pre("save", function(next) {
	var user = this;
	// only hash the password if it has been modified (or is new)
	if (!user.isModified("password")) return next();
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

var User = mongoose.model("User", UserSchema);

module.exports = {
	/**
	 * @param args:
	 * name
	 * password
	 * authType
	 * portfolio - The portfolio to be shown when someone visits the site
	 */
	register: function(args) {
		var user = new User({
			name: args.name,
			password: args.password,
			authType: args.authType,
			portfolio: args.portfolio
		});
		return new Promise(function(resolve, reject) {
			// check if there is already a user
			// there should only ever be one
			User.findOne({}, function(err, registeredUser) {
				if (err) {
					reject(err);
					return;
				}
				if (!registeredUser) {
					user.save(function(err) {
						if (err) {
							reject(err);
							return;
						}
						resolve("User created.");					
					});
				} else {
					reject("A user has already been created.");
				}
			});
		});
	},

	login: function(args) {
		return new Promise(function(resolve, reject) {
			User.findOne({}, function(err, user) {
				if (err) {
					reject("User not found");
					return;
				}
				if (user) {
					if (user.name !== args.name) {
						reject("User not found");
					} else {
						user.comparePassword(args.password, function(err, success) {
							if (success) {
								resolve(user.portfolio);
							} else {
								reject("incorrect Password");
							}
						});
					}
				} else {
					reject("A user has not been created.");
				}
			});
		});
	},

	getDisplayPortfolio: function(name) {
		return new Promise(function(resolve, reject) {
			User.findOne({name: name}, function(err, user) {
				if (err) {
					reject(err);
					return;
				}
				if (user) {
					resolve(user.portfolio);
				} else {
					reject("User not found");
				}
			});
		});
	},

	updateDisplayPortfolio: function(pid, name) {
		return new Promise(function(resolve, reject) {
			User.findOneAndUpdate({name: name}, {portfolio:pid},
			{ upsert: false, returnNewDocument: true },
			function(err, doc) {
				if (err) reject(err);
				else resolve(doc);
			});
		});
	}
};
