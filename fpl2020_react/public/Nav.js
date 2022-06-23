class Nav extends React.Component {
    constructor() {
      super();
      this.state = { };
    }
  
    render() {
      //If user is logged in, display link to admin page.
      if(localStorage.getItem("isLoggedIn")=='true')
      {
        return (
          <div>
              <a href='/routes.html'>Routes</a> | &nbsp; 
              <a href='/teams.html'>Teams</a> | &nbsp; 
              <a href='/gameweeks.html'>Gameweeks</a> | &nbsp; 
              <a href='/fixtures.html'>Fixtures</a> | &nbsp; 
              <a href='/players.html'>Players</a> | &nbsp; 
              <a href='/stats.html'>Stats</a> | &nbsp; 
              <a href='/login.html'>Login</a> | &nbsp; 
              <a href='/Admin.html'>Admin</a>
          </div>
        );
      }
      else //if(localStorage.getItem("isLoggedIn")=='false') if user is not logged in, do not display link to admin page.
      {
        return (
          <div>
              <a href='/routes.html'>Routes</a> | &nbsp; 
              <a href='/teams.html'>Teams</a> | &nbsp; 
              <a href='/gameweeks.html'>Gameweeks</a> | &nbsp; 
              <a href='/fixtures.html'>Fixtures</a> | &nbsp; 
              <a href='/players.html'>Players</a> | &nbsp; 
              <a href='/stats.html'>Stats</a> | &nbsp; 
              <a href='/login.html'>Login</a> | &nbsp; 
          </div>
        );
      }   
    }
  }
  
  ReactDOM.render(<Nav />, document.getElementById('nav'));
  