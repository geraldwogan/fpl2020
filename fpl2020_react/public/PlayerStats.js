class Players extends React.Component {
    constructor() {
        super();
        this.state = {Players: []};
    }

    componentDidMount() {    
        fetch(`http://localhost:3005/playerstats/${localStorage.getItem("playerId")}`)
            .then((data) => data.json())
            .then((data) => this.setState({Players: data}))   
    }
  
    render() {    
        return (
            <div>
                <img id='img' src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${localStorage.getItem("playerPhoto")}.png`} alt="player headshot" ></img>
                <h1>{localStorage.getItem("playerName")}</h1>
                <table border='1'>
                    <thead>
                        <tr><th>Gameweek</th><th>Opponent</th><th>Cost</th><th>Points</th><th>Minutes</th><th>Goals Scored</th><th>Assists</th><th>Yellow Cards</th><th>Red Cards</th></tr>
                    </thead>
                    {this.state.Players.map( (item, i) => {
                    return  <tbody key={i}>
                        <tr>
                          <td><center>{item.gameweek}</center></td>
                          <td><img id='img' src={`images/${item.teamid}.png`} height='20' alt={`Club Crest: ${item.teamid}`}></img>{item.name}</td>
                          <td><center>{(Math.round(item.cost * 10) / 100).toFixed(1)}</center></td>
                          <td><center>{item.total_points}</center></td>
                          <td><center>{item.minutes}</center></td>
                          <td><center>{item.goals_scored}</center></td>
                          <td><center>{item.assists}</center></td>
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
  
ReactDOM.render(<Players />, document.getElementById('root'));
  