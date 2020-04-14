const express = require('express');

const bodyParser = require('body-parser');
const xml = require('xml');
const fs = require('fs');
const path = require('path');


const Impact = require('./src/impact/impact');
const SevereImpact = require('./src/severeImpact/severeImpact');

const app = express();
let startTime = null;
let requestDuration = null;
let routePath = null;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) { req.start = Date.now(); next(); });

app.get('/', (req, res, next) => {
  return res.json("This works")
})


app.post('/api/v1/on-covid-19', async (req, res, next) => {
  // console.log (req.body);
routePath = "/api/v1/on-covid-19"
  let {
    name,
    avgAge,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation
  } = req.body.region;


  let periodType = req.body.periodType;
  let timeToElapse = req.body.timeToElapse;
  let reportedCases = req.body.reportedCases;
  let totalHopspitalBeds = req.body.totalHospitalBeds;

  let impact = new Impact(
    reportedCases,
    timeToElapse,
    totalHopspitalBeds,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation
  );
  let severeImpact = new SevereImpact(
    reportedCases,
    timeToElapse,
    totalHopspitalBeds,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation
  );

  res.setHeader('Content-type', 'application/json');
   res.json({
    estimate: {
      impact: {
          currentlyInfected: impact.getCurrentlyInfected(),
            infectionsByRequestedTime: impact.getInfectionsByRequestedTime(), 
            severeCasesByRequestedTime: impact.getSevereCasesByRequestedTime(),
            hospitalBedsByRequestedTime: impact.getHospitalBedByRequestedTime(),
            casesForICUByRequestedTime: impact.getCasesForICUByRequestTime(),
            dollarsInFlight: impact.getDollarsInFlight()
        },
    severeImpact: {
        currentlyInfected: severeImpact.getCurrentlyInfected(),
        infectionsByRequestedTime: severeImpact.getInfectionsByRequestedTime(), 
        severeCasesByRequestedTime: severeImpact.getSevereCasesByRequestedTime(),
        hospitalBedsByRequestedTime: severeImpact.getAvailableBeds(),
        casesForICUByRequestedTime: impact.getCasesForICUByRequestTime(),
        dollarsInFlight: impact.getDollarsInFlight()
    }
    }
  });
  requestDuration = Math.abs(Date.now() - req.start) ;
  logToFile(req.start, routePath, requestDuration);  
});


app.post('/api/v1/on-covid-19/xml', async (req, res, next) => {
  // console.log (req.body);
  routePath = "/api/v1/on-covid-19/xml";

  let {
    name,
    avgAge,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation
  } = req.body.region;


  let periodType = req.body.periodType;
  let timeToElapse = req.body.timeToElapse;
  let reportedCases = req.body.reportedCases;
  let totalHopspitalBeds = req.body.totalHospitalBeds;

  let impact = new Impact(
    reportedCases,
    timeToElapse,
    totalHopspitalBeds,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation
  );
  let severeImpact = new SevereImpact(
    reportedCases,
    timeToElapse,
    totalHopspitalBeds,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation
  );

  let xmlResponse = xml({
    estimate: [{
      impact:[ 
          {currentlyInfected: impact.getCurrentlyInfected()},
            {infectionsByRequestedTime: impact.getInfectionsByRequestedTime()}, 
            {severeCasesByRequestedTime: impact.getSevereCasesByRequestedTime()},
            {hospitalBedsByRequestedTime: impact.getHospitalBedByRequestedTime()},
            {casesForICUByRequestedTime: impact.getCasesForICUByRequestTime()},
            {dollarsInFlight: impact.getDollarsInFlight()}
          
      ]},
    {severeImpact: [
        {currentlyInfected: severeImpact.getCurrentlyInfected()},
        {infectionsByRequestedTime: severeImpact.getInfectionsByRequestedTime()}, 
        {severeCasesByRequestedTime: severeImpact.getSevereCasesByRequestedTime()},
        {hospitalBedsByRequestedTime: severeImpact.getAvailableBeds()},
        {casesForICUByRequestedTime: impact.getCasesForICUByRequestTime()},
        {dollarsInFlight: impact.getDollarsInFlight()}
    ]
    }]
  });

  let testXml = xml({nested: [{ keys: [{ fun: 'hi' }]}]});
  console.log('showing the xml response ', xmlResponse);
  res.header('Content-Type','text/xml').send(xmlResponse);
  // res.setHeader('Content-type', 'application/json');
  // return res.json();
  requestDuration = Math.abs(Date.now() - req.start) ;
  logToFile(req.start, routePath, requestDuration);  
});


app.get('/api/v1/on-covid-19/logs', async (req, res, next) => {
    routePath = '/api/v1/on-covid-19/logs';
 fs.readFile(path.join(__dirname, 'logs.txt'), {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        console.log('received data: ' + data);
        // response.writeHead(200, {'Content-Type': 'text/html'});
        res.send(data);
        // response.end();
    } else {
        console.log(err);
    }
});


requestDuration = Math.abs(Date.now() - req.start) ;
logToFile(req.start, routePath, requestDuration);  
})



app.use(function(req, res) { requestDuration = Date.now() - req.start; 
  logToFile(req.start, routePath, requestDuration)});


const logToFile = (timeStamp, routePath, timeInSeconds) => {
    // let writeStream = fs.createWriteStream('logs.txt');
    // writeStream.write(`${timeStamp} \t ${routePath} \t ${timeInSeconds} \n`);
    // writeStream.end();
    // console.log('finish writing to logs');
    let data = `${timeStamp} \t ${routePath} \t done in ${timeInSeconds} milliseconds\n`;

    fs.writeFile('logs.txt', data, { flag: 'a+' }, function (err) {
      if (err) throw err;
      console.log("It's saved!");
  });
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App started on port ${port}.`));