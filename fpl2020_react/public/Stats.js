class Stats extends React.Component {
    constructor() {
      super();
      this.state = {stats: []};
    }

    componentDidMount() {    
        fetch(`http://localhost:3005/teamStats`)
            .then((data) => data.json())
            .then((data) => this.setState({stats: data})) 
    }
  
    render() {    
        return (          
            <div>
                <hr></hr>
                <select id='sel' onChange={this.decideData}>
                    <option id='0'>Select a statistic...</option>
                    <option id='1'>Points</option>
                    <option id='2'>Goals Scored</option>
                    <option id='3'>Total Cards (Yellow+Red)</option>
                </select>
                <hr></hr>
                <div id="barChart" ref="barChart">
                    
                </div>
                <div id="names" ref="names">

                </div>
            </div>
        );
    }

    //Calls the draw methods with correct data 
    decideData = (event) => {
        var sel = document.getElementById("sel");

        //Remove 'Select a statistic...' option once the user has selected an option
        if(document.getElementById("0"))
            document.getElementById("0").remove();

        let filterTo2DArray = [];
        var dataID = sel.options[sel.selectedIndex].id;
        
        if(dataID != 0){
            //Use <select> id to filter data
            if(dataID == 1){
                this.state.stats.forEach(element => {
                    filterTo2DArray.push(element.total_points);
                });
            }
            else if(dataID == 2){
                this.state.stats.forEach(element => {
                    filterTo2DArray.push(element.goals_scored);
                });
            }
            else if(dataID == 3){
                this.state.stats.forEach(element => {
                    filterTo2DArray.push(element.total_cards);
                });
            }          

            //Call Draw Chart and Draw Names with filtered data
            this.drawChart(filterTo2DArray, dataID);
            this.drawNames(); 
        }
    }

    //Draw main chart of rectangles
    drawChart = (dataset, dataID) => {
        document.getElementById('barChart').innerHTML = ""; //Reset area for repeated use

        var chartHeight = 300
        var chartWidth = 1200

        //Adjust the height of the rectangles when using vastly different data(goals_scored vs. total_points)
        var scale, scaleAdjust;
        if(dataID == 1)
        {
            scale = 1;
            scaleAdjust = 2;
        }
        else
        {
            scale = 5
            scaleAdjust = 1
        }

        //Get the max value of the dataset
        var max = d3.max(dataset, function(d) { return d;} );
        //console.log("Max value: "+max)

        //Use <div> ref tag to select <div>
        var drawingBoard = d3.select(this.refs.barChart)
            .append('svg')
            .attr('width', chartWidth)
            .attr('height', chartHeight)

        //Draw main content(rectangles)
        drawingBoard.selectAll('rect')
            .data(dataset).enter()
                .append('rect')
                //.attr('width', 0) //for .transition (initial state)
                //.attr('height', 0) //for .transition (initial state)
                .attr('fill', 'steelblue')
                .attr('x', (datapoint, iteration) => iteration * 60)
                .attr('y', (datapoint) => chartHeight - (datapoint * scale)/scaleAdjust)
                //.transition(d3.transition().duration(1000))
                .attr('height', (datapoint) => (datapoint * scale)/scaleAdjust)
                .attr('width', 50)

        //Highlight the max rectangle(s) in orange
        drawingBoard.selectAll('rect')
            .filter(function(d) { return d === max })        
            .attr("fill", "orange")

        //Print score labels at the tip of each rectangle
        drawingBoard.selectAll('text')
            .data(dataset).enter()
                .append('text')
                .attr("text-anchor", "middle")
                .attr('x', (dataPoint, i) => i * 60 + 25)
                .attr('y', (dataPoint, i) => chartHeight-(dataPoint*scale)/scaleAdjust+15)
                .attr("font-size",15)
                .attr("fill","white")
                .text(dataPoint => dataPoint)
    }
    
    //Draw/Print the labels below the rectangles
    drawNames = () => {
        document.getElementById('names').innerHTML = "";//Reset area for repeated use

        //Get name data
        var dataset = [];
        this.state.stats.forEach(element => {
            dataset.push(element.short_name);
        });

        //Get data for crests
        var ids = [];
        this.state.stats.forEach(element => {
            ids.push(element.id);
        });

        var chartHeight = 40 //Change from 20 to 40 to accomodate the crests
        var chartWidth = 1200

        //Use <div> ref tag to select <div>
        var drawingBoard = d3.select(this.refs.names)
            .append('svg')
            .attr('width', chartWidth)
            .attr('height', chartHeight)

        //Print Team labels below each rectangle
        drawingBoard.selectAll('text')
            .data(dataset).enter()
                .append('text')
                .attr("text-anchor", "middle")
                .attr('x', (dataPoint, i) => i * 60 + 25)
                .attr('y', (dataPoint, i) => chartHeight)
                .attr("font-size",15)
                //.attr("font-family","Consolas")//Monospaced font
                .attr("fill","black")
                .text(dataPoint => dataPoint)

        //Insert crests for each club below each rectangle (above each team label)
        drawingBoard.selectAll("image")
            .data(ids).enter()
            .append("svg:image")
                .attr('x', (dataPoint, i) => i * 60 + 14)
                .attr('y', (dataPoint, i) => 0)
                .attr('width', 20)
                .attr('height', 24)
                .attr("xlink:href", (dataPoint, i) => `images/${dataPoint}.png`)              
    }
  }
  
  ReactDOM.render(<Stats />, document.getElementById('root'));