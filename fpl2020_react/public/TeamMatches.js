class TeamMatches extends React.Component {
    constructor() {
      	super();
      	this.state = {teamMatches: [], teamid: localStorage.getItem("teamid")};
    }

    componentDidMount() {    
        fetch(`http://localhost:3005/teamMatchesAlt/${this.state.teamid}`)//Singular route used instead of using /teamMatches/teamid + /teams/
            .then((data) => data.json())
            .then((data) => this.setState({teamMatches: data}))    
    }
  
    render() {
      	return (
          	<div>
            	<img id='img' src={`images/${this.state.teamid}.png`} height='80' alt={`Club Crest: ${this.state.teamid}`} ></img>
             	<table border='1'>
					<thead> 
						<tr><th>Gameweek</th><th></th><th>Home Team</th><th></th><th></th><th>Away Team</th><th></th></tr>
					</thead>
						{this.state.teamMatches.map( (item,i) => {
						return  <tbody key={i}>
						<tr>
							<td><center>{item.gameweek}</center></td>
							<td><center><img id='img' src={`images/${item.team_h}.png`} height='20' alt={`Club Crest: ${item.team_h}`} ></img></center></td>
							<td>{item.team_h_name}</td>
							<td>{item.team_h_score}</td>
							<td>{item.team_a_score}</td>
							<td>{item.team_a_name}</td>
							<td><center><img id='img' src={`images/${item.team_a}.png`} height='20' alt={`Club Crest: ${item.team_a}`} ></img></center></td>
						</tr>
              		</tbody>
                    })}
            	</table>
          	</div>
      	);
    }
}
  
ReactDOM.render(<TeamMatches />, document.getElementById('root'));  