class Teams extends React.Component {
    constructor(props) {
        super(props);
        this.state = { teams: []}; 
    }

    componentDidMount() {    
        fetch('http://localhost:3005/teams')
              .then((data) => data.json())
              //.then((data) => console.log(data));
              .then((data) => this.setState({teams: data}))
    }

    render() {
        return (
            <div>
                <table border='1'>
                    <thead>
                        <tr><th></th><th>Name</th><th>Strength</th><th></th><th></th></tr>
                    </thead>
                    {this.state.teams.map( (item, i) => {
                    return  <tbody key={i}>
                        <tr>
                            <td><center><img id='img' src={`images/${item.id}.png`} height='20' alt={`Club Crest: ${item.id}`} ></img></center></td>
                            <td>{item.name} ({item.short_name})</td>
                            <td><center>{item.strength_overall_home + item.strength_overall_away}</center></td>
                            <td><button className='secretBtn' id={item.id} onClick={this.navClick}>Matches...</button></td>
                            <td><button className='secretBtn' id={item.id} onClick={this.navClick}>Players...</button></td>
                        </tr>
                    </tbody>
                    })}
                </table>
            </div>
        );
    }

    navClick = (event) => {        
        // Store Team ID for use on next page
        localStorage.setItem("teamid", event.target.id);  
        //console.log("teamid: "+localStorage.getItem("teamid"));

        //Navigate to next page
        if(event.target.innerHTML==='Matches...')
            window.location.href = './teamMatches.html';
        else         
           window.location.href = './teamPlayers.html';
    }
}
ReactDOM.render(<Teams />, document.getElementById('root'));
