const express =require("express")
const router = express.Router()
const mongoose = require('mongoose')
const db = require('../db')
const User = mongoose.model('User')
const Ride = mongoose.model('Ride')
const sanitize = require("mongo-sanitize")

const isAuthenticated = function(req,res,next){
	if(req.isAuthenticated()){
		return next()
	}
	res.redirect("/failure")
}
const idMapper = function(idlist){
	const numbers = idlist
		function myFunction() {
		  x = numbers[5]
		  const mapped = numbers.map(Math.sqrt);
		}
		return myFunction
}
module.exports = function(passport){

	router.get("/",(req,res)=>{
		Ride.find({}, function(err, results, count) {
			let username = ""
			if(req.user){
				username = req.user.username
				res.render("main.hbs",{"results":results,"username":username,"profdisplay":"flex"})
			}
			else{
				res.render("main.hbs",{"results":results,"username":"LOGIN","profdisplay":"none"})
			}
		}).sort({user:"desc"}).limit(20);
	});


	router.get("/filterrides",(req,res)=>{
		//fix all gender filter
		let findObj = {}
		specificUser = req.query["user"]
		if(specificUser){
			findObj["username"] = req.user.username
		}
		startStation = sanitize(req.query["ssFilter"])
		if(startStation){
			findObj["startStation"] = startStation
		}
		endStation = sanitize(req.query["esFilter"])
		if(endStation){
			findObj["endStation"] = endStation
		}
		duration = req.query["durFilter"]
		genderSelection = req.query["genFilter"]
		if(genderSelection){
			findObj["gender"] = genderSelection
		}
		minAge = Number(req.query["ageYoung"])
		maxAge = Number(req.query["ageOld"])
		if(!minAge){
			minAge = 0
		}
		if(!maxAge){
			maxAge = 110
		}
		findObj["age"] = {$gte:minAge,$lte:maxAge}
		//console.log(findObj)
		let sortObj = {duration:duration}
		Ride.find(findObj, 
		function(err, results, count) {
			if(req.user){
				username = req.user.username
				if(specificUser){
					res.render("user.hbs",{"username":username,"results":results})
				}
				else{
					res.render("main.hbs",{"results":results,"username":username,"profdisplay":"flex"})
				}
			}
			else{
				res.render("main.hbs",{"results":results})
			}
		}).sort(sortObj).limit(20);
	});


	router.post("/addride",(req,res)=>{
		const startStation = sanitize(req.body["startStation"])
		const endStation = sanitize(req.body["endStation"])
		const duration = sanitize(req.body["duration"])
		const gender = req.user.gender
		const age = req.user.age 
		const user = req.user.username
		const rideToAdd = new Ride({
			startStation:startStation,
			endStation:endStation,
			duration:0,
			durationF:duration,
			username:username,
			user:1,
			bikeId:404,
			gender:gender,
			age:age
		})
		rideToAdd.save((err,saved,count)=>{
			username = req.user.username
			Ride.find({username:username}, function(err, results, count) {
				res.render("user.hbs",{"username":username,"results":results})
			}).limit(20);
		});
	});

	router.post("/setPrefs",(req,res)=>{
		const age = req.body["userAge"]
		const gender = req.body["userGender"]
		const username = req.user.username
		User.findOneAndUpdate({username:username},{$set:{age:age,gender:gender}},{new: true},function(err,user){
				if(err){
					console.log("error updating user")
				}
				console.log("updated user: "+username)

				Ride.find({username:username}, function(err, results, count) {
					res.render("user.hbs",{"username":username,"results":results})
				}).limit(20);
				//res.render("user.hbs",{"username":username})
		})
	});

	router.get("/failure",(req,res)=>{
		console.log("FAILURE")
		res.redirect("/")
	})

	router.get("/:id",isAuthenticated,(req,res)=>{
		if(req.user.username === req.params.id){
			username = req.user.username
			Ride.find({username:username}, function(err, results, count) {
				res.render("user.hbs",{"username":username,"results":results})
			}).limit(20);
		}
		else{
			res.redirect("/")
		}
	})

	router.post("/register",passport.authenticate("register",{failureRedirect:"/failure",}),
		(req,res)=>{
			//on success print this on failure redirect to /failure
			res.redirect("/"+req.user.username)
	})

	//login route employing Passport login Strategy (login.js)
	router.post("/login",passport.authenticate("login",{failureRedirect:"/failure",}),
		(req,res)=>{
			//on success print this on failure redirect to /failure
			res.redirect("/"+req.user.username)
	})

	return router
}