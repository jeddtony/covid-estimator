const express = require('express');

const bodyParser = require('body-parser');
const xml = require('xml');

const Impact = require('./src/impact/impact');
const SevereImpact = require('./src/severeImpact/severeImpact');

const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res, next) => {
  return res.json("This works")
})


app.post('/test', async (req, res, next) => {
  // console.log (req.body);

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
  return res.json({
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
});


app.post('/xml', async (req, res, next) => {
  // console.log (req.body);

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
  return res.header('Content-Type','text/xml').send(xmlResponse);
  // res.setHeader('Content-type', 'application/json');
  // return res.json();
});
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App started on port ${port}.`));