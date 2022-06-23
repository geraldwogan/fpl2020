class Fixtures extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Fixtures: []}; 
    }

    componentDidMount() {  
        if(localStorage.getItem("gameweek") === null){//default
            localStorage.setItem("gameweek", 9);  
        }
        else if(localStorage.getItem("gameweek") <= 0){//Prevent going lower than 1
            localStorage.setItem("gameweek", 1);  
        }
        else if(localStorage.getItem("gameweek") >= 39){//Prevent going higher than 38
            localStorage.setItem("gameweek", 38);  
        }

        fetch(`http://localhost:3005/fixturesAlt/${localStorage.getItem("gameweek")}`)
              .then((data) => data.json())
              .then((data) => this.setState({Fixtures: data}))
    }

    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td><button className='secretBtn' onClick={this.navClick}>&#8592; Prev</button></td>
                            <td>Gameweek {localStorage.getItem("gameweek")}</td>
                            <td><button className='secretBtn' onClick={this.navClick}>Next &#8594;</button></td>
                        </tr>
                    </tbody>
                </table>

                <table border='1'>
                    <thead>
                        <tr><th>Gameweek</th><th>Date Time</th><th></th><th>Home Team</th><th></th><th></th><th>Away Team</th><th></th></tr>
                    </thead>
                    {this.state.Fixtures.map( (item,i) => {
                    return  <tbody key={i}>
                        <tr>
                            <td><center>{item.gameweek}</center></td>
                            <td><center>{item.kickoff_time}</center></td>
                            <td><center><img id='img' src={`images/${item.team_h}.png`} height='20' alt={`Club Crest: ${item.team_h}`} ></img></center></td>
                            <td className={'strength' + item.team_h_strength}>{item.team_h_name}</td>
                            <td>{item.team_h_score}</td>
                            <td>{item.team_a_score}</td>
                            <td className={'strength' + item.team_a_strength}>{item.team_a_name}</td>
                            <td><center><img id='img' src={`images/${item.team_a}.png`} height='20' alt={`Club Crest: ${item.team_a}`} ></img></center></td>
                        </tr>
                    </tbody>
                    })}
                </table>
            </div>
        );
    }

    //Assign gameweek localStorge and navigate to fixtures page.
    navClick = (event) => {

        if(event.target.innerHTML.includes('Prev'))
        {
            // Store Gameweek for use on navigate
            localStorage.setItem("gameweek", parseInt(localStorage.getItem("gameweek"))-1);
            //console.log("Heading to Gameweek: "+localStorage.getItem("gameweek"));
        }
        else        
        {
            // Store Gameweek for use on navigate
            localStorage.setItem("gameweek", parseInt(localStorage.getItem("gameweek"))+1);  
            //console.log("Heading to Gameweek: "+localStorage.getItem("gameweek"));
        }   

        //Navigate to page         
        window.location.href = './fixtures.html';
    }
}
ReactDOM.render(<Fixtures />, document.getElementById('root'));
