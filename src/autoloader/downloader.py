#TODO set this up to run the 15th of each month with schedule module
#set month to current month-1 and year to the current year (Strings)
#it should fail if the file does not exist and thus the uploader will as well

import urllib.request 
import zipfile
import pandas as pd
import os
import shutil
year = "2014"
month = "02"
dateCode = year+month
fileName = dateCode+".zip"
fullFileName = year+"-"+month+" - Citi Bike trip data.csv"
url = "https://s3.amazonaws.com/tripdata/"+dateCode+"-citibike-tripdata.zip"
urllib.request.urlretrieve(url,fileName)
zipped = zipfile.ZipFile(fileName)
df = pd.read_csv(zipped.open(fullFileName))
del df["starttime"] 
del df["stoptime"] 
del df["start station id"]
del df["start station latitude"] 
del df["start station longitude"]
del df["end station id"]
del df["end station latitude"] 
del df["end station longitude"]
del df["usertype"]
df.to_csv(dateCode+".csv")
zipped.close()
os.remove(fileName)
shutil.move(dateCode+".csv","../public/tripdata")

