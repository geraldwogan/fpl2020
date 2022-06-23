class Login extends React.Component {
    constructor() {
      super();
      this.state = {users: []};
    }

    componentDidMount() {    
        fetch(`http://localhost:3005/users`)
            .then((data) => data.json())
            .then((data) => this.setState({users: data}))    
    }
  
    render() {
        //If user is already logged in, display logout option
        if(localStorage.getItem("isLoggedIn")=='true')
        {            
            return (
                <div><p>You are logged in</p>
                    <button onClick={this.navClick}>Logout</button>
                </div>  
            );
        }
        else //if(localStorage.getItem("isLoggedIn")=='false') //If user is logged out, display login option
        {
            return (
                <div><p>You are not logged in</p>
                    <table border='1'>
                        <tbody>
                            {this.state.users.map( (item,i) => {
                            return <tr key={i}>
                                <th>Email</th>
                                <td><input id="email" defaultValue={item.email}></input></td>
                            </tr>
                            })}                             
                            <tr>
                                <th>Password</th> 
                                <td><input id="pass" type='password'></input></td>
                            </tr>
                            <tr>
                                <td></td> 
                                <td><button onClick={this.navClick}>Login</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>  
            );
        }    
    }

    navClick = (event) => {
        //console.log(document.getElementById('pass').value+" vs. "+this.state.users[0].password); 

        //If the user is logged in, log the user out. Only way to trigger this method is with the logout button.
        if(localStorage.getItem("isLoggedIn")=='true')
        {
            //console.log("Logged Out"); 
            localStorage.setItem("isLoggedIn", 'false'); 
            window.location.href = './login.html';
        }
        else{
            this.state.users.forEach(element => {
                //Validate email and password.
                if((document.getElementById('pass').value===element.password) && (document.getElementById('email').value===element.email))
                {       
                    console.log("Logged In"); 
                    localStorage.setItem("isLoggedIn", 'true'); 
                    window.location.href = './admin.html';//Navigate to Admin Page
                }    
            });
            if(localStorage.getItem("isLoggedIn")!='true'){
                window.location.href = './login.html';

            }
        }
    }
}
  
ReactDOM.render(<Login />, document.getElementById('root')); 