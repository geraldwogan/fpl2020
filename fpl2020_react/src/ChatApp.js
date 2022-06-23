import React from 'react';

class ChatApp extends React.Component {
  constructor() {
      super();
      this.state = {
          name: '', 
          names : '',
          users: [],//new Set(),//["Joel", "Gerald"]),
          message: '', 
          messages : [] };
  }

  render() {
    //console.log(this.state.name);
    //console.log(this.state.users);
    return (
        <div>
            <h1>Chat App</h1>
            <form onSubmit={this.submit}>
                <table>
                <tr>
                    <td><label>Name:</label></td>
                    <td><input type='text' value={this.state.name} onChange={this.handleNameChange}></input></td>
                </tr>
                <tr>
                    <td><label>Message:</label></td>
                    <td><input type='text' value={this.state.message} onChange={this.handleMessageChange}></input></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input type='submit' value='Send'></input></td>
                </tr>                
                </table>               
                <p>Users Online: {this.state.messages.map( (item) => {
                    return <div>{item.name}</div>
                })}</p>
            </form>
            <hr/>
            <div id='messages'>
                {this.state.messages.map( (item) => {
                    return <div><h3>{item.name} @ {item.time}</h3><p>{item.message}</p></div>
                })}
            </div>
        </div>
    );
  }

  handleNameChange = (event) => {
    this.setState( { name: event.target.value } );
    console.log(this.state.name);
    
  }

  handleMessageChange = (event) => {
    this.setState( { message: event.target.value } );
    console.log(this.state.name);
  }

  submit = (event) => {

    //whenever a new message is seent add unique name to users
    // this.state.messages.forEach(item => {
    //     //console.log(item.name);
    //     this.state.users.push(item.name)
    // });

    var time = new Date().toLocaleTimeString();

    this.setState( { messages: this.state.messages.concat([ { "name": this.state.name, "message": this.state.message, "time": time } ]) } );
    //this.setState({users: this.state.users.push([{"name": this.state.name}])})
    //let temp = new Set(this.state.messages.map(item => item.name))
    this.setState({users: new Set(this.state.messages.map(item => item.name)) })
    //this.setState({users: this.state.users.from(temp)})

//     array.map(item => item.age)
//   .filter((value, index, self) => self.indexOf(value) === index)
//   this.setState({users;})
    console.log(new Set(this.state.messages.map(item => item.name)) )
    console.log(this.state.users);


    // post message to ChatServer
    fetch('http://localhost:5000/message', 
          {
            method: 'POST',
            body: JSON.stringify({ "name": this.state.name, "message": this.state.message, "time": time }), 
            headers:{ 'Content-Type': 'application/json' }
          });
    
    event.preventDefault();  // stop <form> from posting
  }

  componentDidMount() {    
    // get initial messages
    // ,m 

        
        
            //Add new user to users array
    //this.setState({users: this.state.users.push(this.state.name +';')})




    // get messages every 5 seconds
    
  }

}

export default ChatApp;