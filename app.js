const express = require('express');

const bodyParser = require('body-parser');
const Impact = require('./src/impact/impact');
const SevereImpact = require('./src/severeImpact/severeImpact');

const app = express();

app.post('/test', async (req, res, next) => {
  let {
    name,
    avgAge,
    avgDailyIncomeUSD,
    avgDailyIncomePopulation
  } = req.body.region;
  let periodType = req.body.periodType;
  let timeToElapse = req.body.timeToElapse;
  let reportedCases = req.body.reportedCases;
  let totalHopspitalBeds = req.body.totalHopspitalBeds;

  let impact = new Impact(
    reportedCases,
    timeToElapse,
    totalHopspitalBeds,
    avgDailyIncomeUSD,
    avgDailyIncomePopulation
  );
  let severeImpact = new SevereImpact(
    reportedCases,
    timeToElapse,
    totalHopspitalBeds,
    avgDailyIncomeUSD,
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

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App started on port ${port}.`));