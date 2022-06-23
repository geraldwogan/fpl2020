class Footer extends React.Component {
    constructor() {
      super();
    }
  
    render() {
      return (
          <div>
            <hr></hr>
              <p>&copy; Copyright 2020 - L00140867@student.lyit.ie</p>
          </div>
      );
    }
  }
  
  ReactDOM.render(<Footer />, document.getElementById('footer'));
  