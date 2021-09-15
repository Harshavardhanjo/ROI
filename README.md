# Restricted Zone Monitoring System

Detection of "objects" in a user definable/customizable Region Of Interest.

## Description

This project is a full stack application made from Reactjs(Front-End), Flask_API(MiddleWare), and a database of your choice. 
The application is built to detect "objects" in a virtually created "Region Of Interest" by the user, which is also cuztomizable for future purposes.

## **Front_End:**
* User can create a ROI of their preference in a frame extracted from the Video_feed.
![alt text](https://github.com/Harshavardhanjo/ROI/blob/master/images/Capture.PNG?raw=true)

## **Back_End:**
### The Processed Frame <br/>
Black bg <br/><br/>
![alt text](https://github.com/Harshavardhanjo/ROI/blob/master/images/dst.png?raw=true)
<br/>
<br/>
<br/>
White bg <br/><br/>

![alt text](https://github.com/Harshavardhanjo/ROI/blob/master/images/dst2.png?raw=true)
<br/>
<br/>
<br/>
### The ROI <br/><br/>
![alt text](https://github.com/Harshavardhanjo/ROI/blob/master/images/mask.png?raw=true)
<br/>
<br/>
<br/>

## **Detection:**
### Output
* ![alt text]("https://i.ibb.co/tZCjwP4/BI.png")





## Getting Started

### Dependencies

* ReactJS
* Flask
* Axios
* KonvaJS
* React-Router-dom
* styled-components
* react-router
* OpenCv
* flask_cors
* imutils
* numpy

### Installing

* Create a react-app using ```npx create-react-app my-app```.
* Make a Virtual Environment for executing python files.
* Run the following command ```pip install -r requirements.txt```

### Executing program

* Navigate to Roi/src
* Execute ```npm start --open```
* Execute ```python roi.py```
* Navigate to /Konva on the web-application

## Help

* Create a Virtual Environment while executing the python code for minimizing environmental errors.
* Make sure the right packages and its versions are installed.

## Authors

Harshavardhan Jothi Kumar

LinkdIn : https://www.linkedin.com/in/harshavardhan-jothi-kumar-259ba8185/


This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details
