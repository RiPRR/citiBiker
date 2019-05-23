const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);



//All the fields relevant to a ride (not all fields but the ones relevant to this app)
const rideSchema = new mongoose.Schema({
	startStation:{type:String,required:true},
	endStation:{type:String,required:true},
	duration:{type:Number,required:true},
	durationF:{type:String,required:true},
	user:{type:Number,required:true},
	bikeId:{type:Number,required:true},
	age:{type:Number, required:true},
	gender:{type:String,required:true},
	username:{type:String,required:false}
});
const userSchema = new mongoose.Schema({
	username:{type:String,required:true},
	password:{type:String,required:true},
	age:{type:Number,required:true},
	gender:{type:String,required:true}
})
mongoose.model("Ride",rideSchema)
const Ride = mongoose.model("Ride")
mongoose.model("User",userSchema)
const User = mongoose.model("User")

// is the environment variable, NODE_ENV, set to PRODUCTION? 
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 const fs = require('fs');
 const path = require('path');
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 const conf = JSON.parse(data);
 dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/citiBike';
}

mongoose.connect(dbconf);