
//userSchema

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    username: { 
    	type: String
        //, required: true, index: { unique: true } 
    },
    email: { 
    	type: String
        //, required: true, index: { unique: true } 
    },
    password: { 
    	type: String
        //, required: true ,select: false
    },
    active: { 
    	type: String
        //, required: true 
    },
    firstname: { 
    	type: String
        //, required: true
    },
    lastname: { 
    	type: String
        //, required: true 
    },
    middlename: { 
    	type: String
        //, required: true 
    },
    national_id: { 
    	type: String
        //, required: true 
    },
    id_photo: { 
    	type: String
        //, required: true
    },
    user_photo: { 
    	type: String//, required: true 
    },
    company: { 
    	type: String//, required: true 
    },
    city: { 
    	type: String//, required: true 
    },
    department: { 
    	type: String//, required: true
    },
    position: { 
    	type: String//, required: true 
    },
    telephones: { 
    	type: Array//, required: true 
    },
    role: { 
    	type: String//, required: true 
    },
    driver_details: { 
    	type: Object 
    },

    createdAt:{
		type:Date,
		default:Date.now
	}
});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
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

module.exports = mongoose.model('User', UserSchema);

