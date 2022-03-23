/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .75;
const height = window.innerHeight * .75;


/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType)
  .then(data => {
    console.log("data", data)

    /* SCALES */
    /** This is where you should define your scales from data to pixel space */
  /* ORIGINAL VERTICAL BARS  
  const xScale = d3.scaleBand()
.domain(data.map(d => d.activity))
.range([0, width])

const yScale = d3.scaleLinear()
.domain([0, d3.max(data, d => d.count)])
.range([height, 0])
*/
//Updated to horizontal
const leftrightScale = d3.scaleLinear()
.domain([0, d3.max(data, d => d.count)])
.range([0, width])

const updownScale = d3.scaleBand()
.domain(data.map(d => d.activity))
.range([height, 0])
//.range([0, height])
.paddingInner(.2)

/* HTML ELEMENTS */

    const svg = d3.select("#barchart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

    // 5 SELECT - JOIN - DRAW
/** Select your container and append the visual elements to it */

const colorScale = d3.scaleOrdinal()
 .domain(["foraging","eating","climbing", "chasing", "running"])
 .range(["blue","yellow","green", "orange", "red"])


svg.selectAll("rect")
  .data(data)
  .join("rect")
  //.attr("width", xScale.bandwidth())
  //.attr("height", d => height - yScale(d.count))
  //.attr("x", d => xScale(d.activity))
  //.attr("y", d => yScale(d.count))
.attr("height", updownScale.bandwidth())
.attr("width", d => leftrightScale(d.count)) 
 // .attr("x", d => leftrightScale(d.count))
.attr("y", d => updownScale(d.activity))
//.append("text")
.attr("fill", d => colorScale(d.activity))
.attr("opacity",.60)
 

svg.selectAll("text")
.data(data)
.enter()
.append("text")
.text(function (d) { return d.activity; })
.attr("x", 0 )
.attr("y", function (d) { return updownScale(d.activity) + ( updownScale.bandwidth() / 2); })
.style("fill", "black");


   
//svg.selectAll("text")
//.data(data)
//.join("text").text(function(d, i) { return d[activity];})
//svg.append("text")
//.data(data)
//.join("text")
//.attr()
    // 6 ATTRIBUTES

    // everything with our data needs to happen within the brackets!
    // these end brackets represent the end of data output area

    
});
  