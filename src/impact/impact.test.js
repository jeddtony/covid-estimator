const Impact = require("./impact");

const impact = new Impact(2747, 38, 678874, 4, 0.73);
it('test get correct currently infected', () => {
  
    expect(impact.getCurrentlyInfected()).toBe(27470)
})

it('test fails for wrong currently infected', () => {
   
    // expect(impact.getCurrentlyInfected()).is(100)
    expect(Object.is(impact.getCurrentlyInfected(), 100)).toBe(false)
})

it('test passes for correct getInfectionsRequestedByTime', () => { 
    expect(impact.getInfectionsByRequestedTime()).toBe(112517120)
})

it('test passes for correct getInfectionsRequestedByTime', () => { 
    expect(impact.getSevereCasesByRequestedTime()).toBe(16877568)
})

it ('test passes for correct getHospitalBeds', () => {
    expect(impact.getHospitalBedByRequestedTime()).toBe(-16639962)
})

it ('test passes for correct getCasesForICU', () => {
    expect(impact.getCasesForICUByRequestTime()).toBe(5625856)
})

it ('test passes for correct getCasesForVentilators', () => {
    expect(impact.getCasesForVentilatorsByRequestedTime()).toBe(2250342)
})

it ('test passes for correct getDollarsInFlight', () => {
    expect(impact.getDollarsInFlight()).toBe(12484899635.2)
})