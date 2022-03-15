/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .8;
const height = window.innerHeight * .8;


/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType)
  .then(data => {
    console.log("data", data)

    /* SCALES */
    /** This is where you should define your scales from data to pixel space */
    const xScale = d3.scaleBand()
.domain(data.map(d => d.activity))
.range([0, width])

const yScale = d3.scaleLinear()
.domain([0, d3.max(data, d => d.count)])
.range([height, 0])
    /* HTML ELEMENTS */

    const svg = d3.select("#barchart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

    // 5 SELECT - JOIN - DRAW
/** Select your container and append the visual elements to it */

svg.selectAll("rect")
  .data(data)
  .join("rect")
  .attr("width", xScale.bandwidth())
  .attr("height", d => height - yScale(d.count))
  .attr("x", d => xScale(d.activity))
  .attr("y", d => yScale(d.count))

    // 6 ATTRIBUTES

    // everything with our data needs to happen within the brackets!
    // these end brackets represent the end of data output area

    
});
  