const {getInfectionRatePerDays} = require('../helpers/infectionRateConverter')
class Impact {

    constructor(reportedCases ){
        this.reportedCases = Number(reportedCases);
    }

    getCurrentlyInfected() {
        return this.reportedCases * 10;
    }

    getInfectionsByRequestedTime(numberOfDays) {
        let infectionRate = getInfectionRatePerDays(numberOfDays)
        return this.getCurrentlyInfected() * infectionRate;
    }

    

}

module.exports = Impact