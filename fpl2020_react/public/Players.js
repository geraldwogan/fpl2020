class Players extends React.Component {
    constructor() {
      super();
      this.state = {allPlayers: [], filteredPlayers: [], teams: [], filter: 'total_points', isDesc: false};
    }

    componentDidMount() {    
        fetch(`http://localhost:3005/playersAlt`)
            .then((data) => data.json())
            .then((data) => this.setState({filteredPlayers: data, allPlayers: data})) 
        
        fetch(`http://localhost:3005/teams`)
            .then((data) => data.json())
            .then((data) => this.setState({teams: data})) 
    }
  
    render() {
      return (         
          <div>
            <select id='sel' onChange={this._filterTeam}>
            <option id='0'>Select a Team...</option>
                {
                this.state.teams.map((item,i) => {
                return <option key={i} id={item.id}>{item.name}</option>
            })} 
            </select>
            <hr></hr>
             <table border='1'>
                 <thead>
                    <tr>
                        <th>Name</th>
                        <th style={{color:'blue'}} id='now_cost' onClick={this._sort}>Cost</th>
                        <th style={{color:'blue'}} id='total_points' onClick={this._sort}>Total Points</th>
                        <th style={{color:'blue'}} id='minutes' onClick={this._sort}>Minutes</th>
                        <th style={{color:'blue'}} id='goals_scored' onClick={this._sort}>Goals Scored</th>
                        <th style={{color:'blue'}} id='assists' onClick={this._sort}>Assists</th>
                        <th style={{color:'blue'}} id='goals_conceded' onClick={this._sort}>Goals Conceded</th>
                        <th style={{color:'blue'}} id='yellow_cards' onClick={this._sort}>Yellow Cards</th>
                        <th style={{color:'blue'}} id='red_cards' onClick={this._sort}>Red Cards</th>
                    </tr>
                 </thead>
                {this.state.filteredPlayers.map((item,i) => {
                return  <tbody key={i}>
                    <tr>
                        <td><button className='secretBtn' id={item.id} onClick={this.navClick}>{item.web_name} ({item.short_name})</button></td>
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

    //Filter the table based on the team selected from the dropdown menu
    _filterTeam = (event)  => {
        var sel = document.getElementById("sel");
        var teamid = sel.options[sel.selectedIndex].id;

        //console.log("Filter only players of teamid "+teamid);

        if(teamid==='0')
            this.setState({filteredPlayers: this.state.allPlayers})
        else{
            let newArray, filteredArray = [];

            newArray =_.sortBy(this.state.allPlayers, 'total_points')
            filteredArray =_.sortBy(newArray, this.state.filter)

            //console.log(this.state.filter)
            filteredArray.reverse();
            this.setState({filteredPlayers: _.where(filteredArray, {"teamid": parseInt(teamid)})})
        }
    }

    //Sort data by column(Descending & Ascending)
    _sort = (event) =>{
        let colName = event.target.id;
        var sel = document.getElementById("sel");
        let newArray= [];
        
        // console.log('====================');
        // console.log('filter: ' + this.state.filter);
        // console.log('colName:' +colName);
        // console.log('isDesc: ' +this.state.isDesc);
        // console.log('====================');

        //Sort Data
        if(sel.options[sel.selectedIndex].id==='0')
        {
            newArray =_.sortBy(this.state.allPlayers, 'total_points')
            newArray =_.sortBy(newArray, colName)
        }
        else{
            newArray =_.sortBy(this.state.filteredPlayers, 'total_points')
            newArray =_.sortBy(newArray, colName)
        }

        //Logic for Descending and Ascending Sorting capabilities
        if(this.state.filter!==colName){              
            this.setState({isDesc: true});
            newArray.reverse();
        }
        else if((this.state.filter==colName)&&this.state.isDesc==true){//even clicks
            this.setState({isDesc: false});
        }
        else if((this.state.filter==colName)&&this.state.isDesc==false){//odd clicks
            this.setState({isDesc: true});
            newArray.reverse();
        }

        this.setState({filteredPlayers: newArray})
        this.setState({filter: colName});
    }

    navClick = (event, data) => {
        var p = this.state.allPlayers.find(item => item.id == event.target.id);
        console.log(p);

        localStorage.setItem("playerId", p.id);
        localStorage.setItem("playerName", p.web_name);  
        localStorage.setItem("playerPhoto", p.photo);

        //Navigate to next page         
        window.location.href = './playerStats.html';        
    }
  }
  
  ReactDOM.render(<Players />, document.getElementById('root')); 