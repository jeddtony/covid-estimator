const SevereImpact = require('./severeImpact')

const impact = new SevereImpact(2747, 38, 678874,  4, 0.73);
it('test passes for correct severeImpact on currently infected', () => {
    expect(impact.getCurrentlyInfected()).toBe(137350)
})

it('test fails for wrong severeImpact on currently infected', () => {
    // expect(impact.getCurrentlyInfected()).is(100)
    expect(Object.is(impact.getCurrentlyInfected(), 1000)).toBe(false)
})

it('test passes for correct getInfectionsRequestedByTime', () => { 
    expect(impact.getInfectionsByRequestedTime()).toBe(562585600)
});

it('test passes for correct getInfectionsRequestedByTime', () => { 
    expect(impact.getSevereCasesByRequestedTime()).toBe(84387840)
})

it ('test passes for correct getAvailableBeds', () => {
    expect(impact.getAvailableBeds()).toBe(-84150234)
})

it ('test passes for correct getSevereCasesForICU', () => {
    expect(impact.getCasesForICUByRequestTime()).toBe(28129280)
})

it ('test passes for correct getCasesForVentilators', () => {
    expect(impact.getCasesForVentilatorsByRequestedTime()).toBe(11251712)
});

it ('test passes for correct getSevereDollarsInFlight', () => {
    expect(impact.getDollarsInFlight()).toBe(62424498176)
})