import React from 'react';
import './Person.css';

//create a function:
// same as funtion() {}

const person = (props) => { //as attributes have been defined in App.js, 
    //this function should have props as an argument
    return (
        <div className="Person">
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            {/*Using the children property, we can output " My hobbies: Racing." Line 159
            this is a reserved word, children referes to any elements between the oppening and
            closing tag on our component*/}
            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
    )
};

export default person;

//In a class-based components, it's this.props::
//class Person extends Component {
    //render() {
        //return <p>My name is {this.props}</p>
    //}
//}