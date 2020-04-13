const SevereImpact = require('./severeImpact')

const impact = new SevereImpact(5);
it('test passes for correct severeImpact on currently infected', () => {
    expect(impact.getCurrentlyInfected()).toBe(250)
})

it('test fails for wrong severeImpact on currently infected', () => {
    // expect(impact.getCurrentlyInfected()).is(100)
    expect(Object.is(impact.getCurrentlyInfected(), 1000)).toBe(false)
})

it('test passes for correct getInfectionsRequestedByTime', () => { 
    expect(impact.getInfectionsByRequestedTime(30)).toBe(256000)
})