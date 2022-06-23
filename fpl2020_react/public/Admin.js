class Admin extends React.Component {
    constructor() {
      super();
      this.state = {teams: []};
    }

    componentDidMount() {    
        fetch(`http://localhost:3005/teams`)
            .then((data) => data.json())
            .then((data) => this.setState({teams: data}))    
    }

    render() {
        return (
            <div>
                <table border='1'>
                    <thead>
                        <tr><th></th><th>Name</th><th>Strength</th><th>Strength Home</th><th>Strength Away</th></tr>
                    </thead>
                    {this.state.teams.map( (item,i) => {
                    return  <tbody key={i}>
                        <tr>
                            <td><center><img id='img' src={`images/${item.id}.png`} height='20' alt={`Club Crest: ${item.id}`} ></img></center></td>
                            <td id={'team'+item.id} className={'strength' + item.strength}>{item.name} ({item.short_name})</td>
                            <td><input id={item.id} defaultValue={item.strength} onChange={this.strengthChange}></input></td>
                            <td><input id={'sh'+item.id} defaultValue={item.strength_overall_home}></input></td>
                            <td><input id={'sa'+item.id} defaultValue={item.strength_overall_away}></input></td>
                            <td><button id={item.id} onClick={this.updateClick}>Update</button></td>
                        </tr>
                    </tbody>
                    })}
                </table>
            </div>
        );
    }

    //Update colour in 'Name' column when strength value is changed
    strengthChange = (e) => {
        //console.log("teamid: "+e.target.id +', strength: '+e.target.value);
        document.getElementById(`team${e.target.id}`).className  = `strength${e.target.value}`;
    }

    //Get strength values and UPDATE SQL table using fetch PUT
    updateClick = (e) => {
        //Get values 
        var id = e.target.id;
        var strength     = document.getElementById(`${id}`).value;
        var strengthHome = document.getElementById(`sh${id}`).value; 
        var strengthAway = document.getElementById(`sa${id}`).value;

        console.log(`UPDATE teams SET strength = '${strength}',strength_overall_home = '${strengthHome}', strength_overall_away = '${strengthAway}' WHERE id = '${id}'`)

        // PUT values
        fetch(`http://localhost:3005/team/${id}`, 
        {
            method: 'PUT',
            body: JSON.stringify({ "id": id, "strength": strength, "strengthHome": strengthHome, "strengthAway": strengthAway}), 
            headers:{ 'Content-Type': 'application/json' }
        });       
    }
  }
  
  ReactDOM.render(<Admin />, document.getElementById('root'));
  