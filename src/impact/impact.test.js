const Impact = require("./impact");

const impact = new Impact(2747);
it('test get correct currently infected', () => {
  
    expect(impact.getCurrentlyInfected()).toBe(27470)
})

it('test fails for wrong currently infected', () => {
   
    // expect(impact.getCurrentlyInfected()).is(100)
    expect(Object.is(impact.getCurrentlyInfected(), 100)).toBe(false)
})

it('test passes for correct getInfectionsRequestedByTime', () => { 
    expect(impact.getInfectionsByRequestedTime(38)).toBe(112517120)
})