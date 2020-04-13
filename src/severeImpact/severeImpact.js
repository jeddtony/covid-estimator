const {getInfectionRatePerDays} = require('../helpers/infectionRateConverter')

class SevereImpact {

    constructor( reportedCases) {
        this.reportedCases = Number(reportedCases);
    }

    getCurrentlyInfected() {
        return this.reportedCases * 50;
    }

    getInfectionsByRequestedTime(numberOfDays) {
        let infectionRate = getInfectionRatePerDays(numberOfDays)
        return this.getCurrentlyInfected() * infectionRate;
    }
}

module.exports = SevereImpact