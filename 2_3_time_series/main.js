 /* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .7,
const height = window.innerHeight * .7,
const margin = 30;

/* LOAD DATA */
d3.csv('../data/populationOVerTime.csv', d => {
  return {
     year: new Date(+d.Year, 0, 1),
     country: d.Entity,
     population: +d.Population
  }
}).then(data => {
  console.log('data :>> ', data);

  // SCALES

  // CREATE SVG ELEMENT

  // BUILD AND CALL AXES

  // LINE GENERATOR FUNCTION

  // DRAW LINE

});