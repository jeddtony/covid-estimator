const {getInfectionRatePerDays} = require('../helpers/infectionRateConverter');
const percentageConstant = require('../constants/percentageConstants')

class SevereImpact {

    constructor( reportedCases, numberOfDays, hopsitalBeds) {
        this.reportedCases = Number(reportedCases);
        this.numberOfDays = Number(numberOfDays);
        this.hopsitalBeds = Number(hopsitalBeds);
    }

    getCurrentlyInfected() {
        return this.reportedCases * 50;
    }

    getInfectionsByRequestedTime() {
        let infectionRate = getInfectionRatePerDays(this.numberOfDays)
        return this.getCurrentlyInfected() * infectionRate;
    }

    getSevereCasesByRequestedTime() {
        let severeCasesByRequestedTime =  percentageConstant.SEVERE_POSITIVE_CASES * this.getInfectionsByRequestedTime();
        let availableBeds = percentageConstant.AVAILABLE_BEDS * this.hopsitalBeds;

        return Math.ceil(availableBeds - severeCasesByRequestedTime);
    }

}

module.exports = SevereImpact