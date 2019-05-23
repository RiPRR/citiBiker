# CITIBIKER 

## Overview

I ride NYC CitiBikes on a daily basis and I think the system is amazing. It let's me travel cheap and fast and makes bike theft a non issue. I also like to think i'm pretty good at biking, I haul and always try to beat my record times to and from frequently visted locations. But even though I think i'm pretty speedy I have no idea how I stack up against the millions of other citibikers. So thats where CitiBiker comes in.

CitiBiker will allow users to log in and compare all of their ride times to all other riders in the system. This is made possible by the opendata that CitiBike publishes about their stations and bikes. I envision an app that functions as a timetrial for NYC.


## Data Model

The application will store 
|Trip Duration (seconds)|
|Start Time and Date|
|Stop Time and Date|
|Start Station Name|
|End Station Name|
|Station ID|
|Station Lat/Long|
|Bike ID|

* Each ride has one each of the above elements

An Example Ride:

```javascript
{
  Duration: //length of ride,
  Start_Time: // Time ride began,
  Stop Time: //Time ride stopped,
  Start_Station: //Name of the streets start station is on,
  End_Station: // Name of the streets end station is on,
  Station_ID: // unique id for each station,
  Station_Loc: //coordinates of the stations,
  Bike_ID: // unique id for each bike
}
```

Example Values:

```javascript
{
  Duration: 252,
  Start_Time: "5:30pm",
  Stop Time: "5:34pm",
  Start_Station: "Broadway&Lafayette",
  End_Station: "Elizabeth&Canal",
  Station_ID: 23456,
  Station_Loc: "-21234233487234,-43274374637436",
  Bike_ID: 247820
}
```


## [Link to Commented First Draft Schema](db.js) 

Having trouble with this step emailed Prof my SRC. github wont let me upload

## Wireframes

/list/create - WIREFRAMES

![WIREFRAMES](documentation/WIREFRAMES.pdf)

## Site map

![SITEMAP](documentation/MAP.pdf)

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I login and upload my rides
3. as a user, I can compare my rides to others in the system
4. as a user, I can view all of my rides
5. as a user, I can create a profile
6. as a user, I can use filtering tools on my and other's rides

## Research Topics

* (2 points) Allow users to create account/upload rides
* (4 points) Automated polling and collecting CitiBike data as it's uploaded by CitiBike
* (2 points) Filtering tools for ridedata

8 points total out of 8 required points


## [Link to Initial Main Project File](app.js) 

Having trouble with this step emailed Prof my SRC. github wont let me upload

## Annotations / References Used

1. [CitiBike OpenData](https://www.citibikenyc.com/system-data) 
