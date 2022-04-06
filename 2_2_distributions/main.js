/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .7;
const height = window.innerHeight * .7;
const margin = {top: 10, bottom: 10, left: 10, right: 10};
//   radius = ;

/* LOAD DATA */
//Previous data
//d3.json("../data/environmentRatings.json", d3.autoType)
//New data
d3.json("../data/RandProdData.json", d3.autoType)
  .then(data => {
    console.log(data)

    /* SCALES */
    const xScale = d3.scaleLinear()
   // .domain([0, d3.max(data, d => d.envScore2020)])
   .domain([0, d3.max(data, d => d.InventoryCount )])
   .range([margin.left, width - margin.right])

    const yScale = d3.scaleLinear()
   // .domain([0, d3.max(data, d => d.ideologyScore2020)])
   .domain([0, d3.max(data, d => d.RatingAvg)])
   .range([height - margin.bottom, margin.top])
    
   // const colorScale = d3.scaleOrdinal()
   const sizeScale = d3.scaleLinear()
   // .domain(["R","D","I"])
  //.domain([0, d3.max(data, d => d.Price)])
  .domain([d3.min(data, d => d.Price), d3.max(data, d => d.Price)])
   // .range(["red","blue","purple"])
    .range([5, 15])
    
    const opacityScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.RatingCount ), d3.max(data, d => d.RatingCount )])
    .range([.33, 1])
    /* HTML ELEMENTS */
    const svg = d3.select("#container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
    
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    svg.append("g")
      .attr("transform",`translate(0,${height-margin})`)
      .call(xAxis)

    svg.append("g")
    .attr("transform",`translate(${margin.left},0)`)
    //.attr("transform", `translate(${margin.left}, width - margin.bottom)`)
    .call(yAxis)
    
      // create circles via SELECT-DATA-JOIN

      svg.selectAll("circle")
      .data(data)
      .join(
        enter => enter
        .append("circle")
        .attr("r", 1)
        .attr("cx", d => xScale(d.InventoryCount))
        .attr("cy", d  => yScale(d.RatingAvg))
        .attr("fill","black")
        .transition()
        .duration(2000) // in ms
        .delay(200)
        .attr("r", d=> sizeScale(d.Price))
      //  .attr("fill", d=> colorScale(d.Party))
       // .style("opacity", d => opacityScale(d.Price))
        .attr("opacity", d => opacityScale(d.RatingCount))

      )  
      
      //.data(data, d => d.BioID)
       /*  .join("circle")
        .attr("cx", d => xScale(d.envScore2020))
        .attr("cy", d => yScale(d.ideologyScore2020))
        .attr("r", 3)
        //.attr("fill","purple")
        .attr("fill", d => colorScale(d.Party)) */
  });
