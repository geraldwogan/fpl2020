class TeamPlayers extends React.Component {
    constructor() {
		super();
		this.state = {teamPlayers: [], teamid: localStorage.getItem("teamid")};
    }

    componentDidMount() {    
        fetch(`http://localhost:3005/teamPlayers/${this.state.teamid}`)
            .then((data) => data.json())
            .then((data) => this.setState({teamPlayers: data}))    
    }
  
    render() {
      	return (          
          	<div>
            	<img id='img' src={`images/${this.state.teamid}.png`} height='80' alt={`Club Crest: ${this.state.teamid}`} ></img>
             	<table border='1'>
               	<thead>                    
                 	<tr><th>Name</th><th>Cost</th><th>Total Points</th><th>Minutes</th><th>Goals Scored</th><th>Assists</th><th>Goals Conceded</th><th>Yellow Card</th><th>Red Cards</th></tr>
               		</thead>
                    {this.state.teamPlayers.map( (item, i) => {
                    return  <tbody key={i}> 
                      	<tr>
							<td>{item.web_name}</td>
							<td><center>{(Math.round(item.now_cost * 10) / 100).toFixed(1)}</center></td>
							<td><center>{item.total_points}</center></td>
							<td><center>{item.minutes}</center></td>
							<td><center>{item.goals_scored}</center></td>
							<td><center>{item.assists}</center></td>
							<td><center>{item.goals_conceded}</center></td>
							<td><center>{item.yellow_cards}</center></td>
							<td><center>{item.red_cards}</center></td>
                    	</tr>

					</tbody>
                    })}
                </table>
          </div>
      	);
    }
}
  
  ReactDOM.render(<TeamPlayers />, document.getElementById('root'));
  