const {getInfectionRatePerDays} = require('../helpers/infectionRateConverter');
const percentageConstant = require('../constants/percentageConstants')

class SevereImpact {

    constructor( reportedCases, numberOfDays, hopsitalBeds,  avgEarning, avgDailyIncomePopulation) {
        this.reportedCases = Number(reportedCases);
        this.numberOfDays = Number(numberOfDays);
        this.hopsitalBeds = Number(hopsitalBeds);
        this.avgEarning = Number (avgEarning);
        this.avgDailyIncomePopulation = Number(avgDailyIncomePopulation);
    }

    getCurrentlyInfected() {
        return this.reportedCases * 50;
    }

    getInfectionsByRequestedTime() {
        let infectionRate = getInfectionRatePerDays(this.numberOfDays)
        return this.getCurrentlyInfected() * infectionRate;
    }

    getSevereCasesByRequestedTime() {
        return percentageConstant.SEVERE_POSITIVE_CASES * this.getInfectionsByRequestedTime();
       
    }

    getAvailableBeds() {
        let availableBeds = percentageConstant.AVAILABLE_BEDS * this.hopsitalBeds;

        return Math.ceil(availableBeds - this.getSevereCasesByRequestedTime());
    }

    getCasesForICUByRequestTime() {
        return percentageConstant.NEEDING_ICU_CARE * this.getInfectionsByRequestedTime();
    }
    
    getCasesForVentilatorsByRequestedTime() {
        return percentageConstant.NEEDING_VENTILATORS * this.getInfectionsByRequestedTime();
    }

    getDollarsInFlight() {
        return Number((this.getInfectionsByRequestedTime() * this.avgDailyIncomePopulation * this.avgEarning * this.numberOfDays).toFixed(1));
    }
}

module.exports = SevereImpact