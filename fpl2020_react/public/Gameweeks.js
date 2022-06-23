class Gameweeks extends React.Component {
    constructor() {
      	super();
      	this.state = {Gameweeks: []};
    }

    componentDidMount() {    
        fetch(`http://localhost:3005/Gameweeks`)
            .then((data) => data.json())
            .then((data) => this.setState({Gameweeks: data}))    
    }

    render() {
      	return (
          	<div>
             	<table border='1'>
               		<thead>
                  		<tr><th>Name</th><th>Deadline</th><th>Most Captained Player</th></tr>
               		</thead>
                  	{this.state.Gameweeks.map( (item,i) => {
                  	return<tbody key={i}>
                      	<tr>
                        	<td><button className='secretBtn' id={item.id} onClick={this.navClick}>Gameweek {item.id}</button></td>
                        	<td>{item.dateandtime}</td>
                        	<td>{item.web_name}</td>
                      	</tr>
					</tbody>
					})}
                </table>
          	</div>
      );
	}
	
    //Assign gameweek localStorge and navigate to fixtures page.
    navClick = (event) => {
        // Store Gameweek for use on next page
        localStorage.setItem("gameweek", event.target.id);  
        console.log(event.target.id);

        //Navigate to next page         
        window.location.href = './fixtures.html';
    }
  }
  
ReactDOM.render(<Gameweeks />, document.getElementById('root'));  