
//userSchema

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
   // bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var team_u = require('./teamSchema');

var UserSchema = new Schema({
    username: { 
    	type: String,
        default:null
        //, required: true, index: { unique: true } 
    },
    email: { 
    	type: String,
        default:null
        //, required: true, index: { unique: true } 
    },
    password: { 
    	type: String,
        default:null
        //, required: true ,select: false
    },
    active: { 
    	type: String,
        default:null
        //, required: true 
    },
    firstname: { 
    	type: String,
        default:null
        //, required: true
    },
    lastname: { 
    	type: String,
        default:null
        //, required: true 
    },
    middlename: { 
    	type: String,
        default:null
        //, required: true 
    },
    national_id: { 
    	type: String,
        default:null
        //, required: true 
    },
    id_photo: { 
    	type: String,
        default:null
        //, required: true
    },
    user_photo: { 
    	type: String,
        default:null//, required: true 
    },
    company: { 
    	type: String,
        default:null//, required: true 
    },
    city: { 
    	type: String,
        default:null//, required: true 
    },
    department: { 
    	type: String,
        default:null//, required: true
    },
    position: { 
    	type: String,
        default:null//, required: true 
    },
    telephones: { 
    	type: Array,
        default:[]//, required: true 
    },
    role: { 
    	type: String,
        default:null//, required: true 
    },
    driver_details: { 
    	type: Object,
        default:{} 
    },
    team_ids: [{
                     type: Schema.Types.ObjectId,
                      ref: 'team_u' 
                    }],

    createdAt:{
		type:Date,
		default:Date.now
	}
});


// username 
// email
// team=[T1]



// team_name =T1
// roles=[R1,R2]



// role_name=R1
// rights=[rite1,rite2]






/*
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
*/

module.exports = mongoose.model('User', UserSchema);

