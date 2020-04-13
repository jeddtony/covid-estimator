const getInfectionRatePerDays = (numberOfDays) => {
    return (Math.pow(2, (Math.floor(numberOfDays/ 3))));
}

module.exports = {getInfectionRatePerDays}