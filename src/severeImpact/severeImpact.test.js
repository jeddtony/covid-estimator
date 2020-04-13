const SevereImpact = require('./severeImpact')

const impact = new SevereImpact(2747, 38, 678874);
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

it ('test passes for correct getSevereCasesByRequestedTime', () => {
    expect(impact.getSevereCasesByRequestedTime()).toBe(-84150234)
})