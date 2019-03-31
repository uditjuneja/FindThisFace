import React, { Component } from 'react';

class DisplayResult extends Component{

    render(){
        return    this.props.results.map((result)=>(
            <li key={result.rollno}>  {result.name} : {result.rollno}
            </li>
                ));
                
                
        
    
    }
}
export default DisplayResult;