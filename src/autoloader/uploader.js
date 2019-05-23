//TODO use node-schedule to set this to run after the downloader.py with the 
//current month -1 and year as filename values. First make sure the created 
//filename exists tho to catch error in downloader
//TODO make sure the program exists when done, this does not work ATM

const db = require('../db');
const mongoose = require('mongoose');
const Ride = mongoose.model('Ride')
const fs = require("fs")
var csv = require("fast-csv")

let fileName = "201903.csv"
let csvPath = "../public/tripData/"+fileName

let stop = 0
csv.fromPath(csvPath,{headers : true})
.on("data",function(data){
	duration = Number(data["tripduration"])
	durationF = ""
	durationSeconds = Number(duration%60)
	durationMin = Number(Math.floor(duration/60))
	if(durationSeconds<10){
		durationF = durationMin+":"+"0"+durationSeconds
	}
	else{
		durationF = durationMin+":"+durationSeconds
	}
	startStation = data["start station name"]
	endStation = data["end station name"]
	bikeId = data["bikeid"]
	age = data["birth year"]
	age = Number((new Date().getFullYear()))-age
	gender = Number(data["gender"])
	if(gender === 1){
		gender = "male"
	}
	else if(gender === 2){
		gender = "female"
	}
	else{
		gender = "unknown"
	}
	let rideToAdd = new Ride({
		startStation:startStation,
		endStation:endStation,
		duration:duration,
		user:0,
		bikeId:bikeId,
		gender:gender,
		age:age,
		durationF:durationF
	})
	rideToAdd.save((err,saved,count)=>{
		stop+=1
		console.log(stop)
	});
})
.on("end",function(){
	console.log("Done")
});

