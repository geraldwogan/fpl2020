import React from 'react';

export default class AutoTimer extends React.Component{
    constructor(props){
        super(props);
        this.state = { value: 10};
    }
    render(){
        return(
            <div>{this.state.value}</div>
        );
    }

    componentDidMount(){
        this.timerID = setInterval(this.tick,1000);
    }

    tick = () => {
        if(this.state.value===0)
            return;
        this.setState( {value: this.state.value-1} );
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }
}