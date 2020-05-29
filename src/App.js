import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'; //this is file Person.js, .js can be ommited because it is
//automatically added by the build

//this App component will be used in the index.js file
class App extends Component {
//this class has the render() method, that is used by React to call it and render something to the screen

//there's one special property you can define in any component which extends component
      //can't do it in Person.js, it's a normal function (with hooks maybe)
    //property state, where props are set and passed from outside
    //state is managed from inside a component.
  state = {
    persons: [ //created a persons property in javascript object
      { id: '111', name: 'Max', age: 28 }, //is an array of js objects  
      { id: '222', name: 'Manu', age: 29 },
      { id: '333', name: 'Maria', age: 26 }
    ],
    otherState: 'some other value', //another property
    showPersons: false //this doesn't show persons without clicking the button
  }

  nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };
    // alternative approach to spread operator above::
    // const person = Object.assing({}, this.state.persons[personIndex]);
    
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    

    this.setState( {persons: persons} );
  }


  deletePersonHandler = (personIndex) => {
      //fetch all the persons
    const persons = [...this.state.persons];
      //splice the personIndex, 1 element, this removes 1 element from the array
    persons.splice(personIndex, 1);
      //call this.setState and set persons to persons constant, which was updated
      //by splicing 1 element
    this.setState({persons: persons});
  } 

  
  //-----> Flaw of this approach:
  //in JavaScript, object and arrays are reference types, so when we get persons from 
  //state as we do in line 30 (   >>const persons = this.state.persons;), we actually get a pointer to the original person object
  //managed by React ( to the original state)
  //If we splice it in line 32, we already mutated it's original data. That's not how we should do it.

  //A good practice is to create a copy of that persons array before manipulating it
  //for that, we can use the slice method. slice without arguments simply copys the full array
  //and returns a new one which is store in the const
  //   >>const persons = this.state.persons.slice();

  //An alternative to this approach, would be to use the Spread operator
  //   >>const persons = [...this.state.persons];
  //it spreads out the elements in this array, into a list of elements, which simply then gets added to "this" array
  //Now we have a new array, with the objects from the old array but not the older array itself

      //this.setState( {
    //  persons: [
    //    { name: 'Max', age: 28 },
    //    { name: event.target.value, age: 29 },
    //    { name: 'Stephanie', age: 26 }



    //this is the function needed to the onClick event (button):
    //here we want o edit the state
    // switchNameHandler = ( newName ) => {
    // console 
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    //this.setState( {
     // persons: [
    //   { name: newName, age: 28 },
     //   { name: 'Manu', age: 29 },
     //   { name: 'Stephanie', age: 27 }
     // ]
    ///} )


  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( { showPersons: !doesShow } );
  } 
  
  

  render () {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if ( this.state.showPersons ) {
      persons = (
        <div>
        {this.state.persons.map((person, index) => {
          return <Person 
            click={() => this.deletePersonHandler(index)}
            name={person.name}
            age={person.age}
            key={person.id}
            changed={(event) => this.nameChangedHandler(event, person.id)}
            />
        })}
         
        </div>
      );

      //After clicking the button, it should turn red 
      style.backgroundColor = 'red';
    }

    //variable classes is just a String joined with an empty space ('red bold')
    //let classes = ['red', 'bold'].join(' ');

    //red and bold are the classes defined in .css
    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red'); //classes = ['red']
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold'); //classes = ['red', 'bold']
    }








    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        
        {/*  

          <Person/> --->>this will call the component

          <Person name="max" age="28"/> ---> this is where you define props name (attributes), this values
        will replace props when the component is called
        
          <Person name="Max" age="28"> My hobbies: Racing.</Person>
        
        */}


        {/*
          <button>Switch Name (when clicked)</button>
          in order to handle this click event, the names should be defined in a not hardcoded way
          we have to store it in some variable. 

          Now we can access property state or other in our render() method,
          by simply outputting something dynamic and the this keyword: name={this.state.persons[0].name}
              "this" referes to the class
              "state" property
              "Persons" array
              [0] index

          Handle event Switch Name. Add onClick - it's an event in JS
          <button onClick>Switch Name (when clicked)</button>
          Put {} to execute some dynamic code:
            <button onClick={this.switchNameHandler}>Switch Name (when clicked)</button>
          If you use "()" -> <button onClick={this.switchNameHandler()}>Switch Name (when clicked)</button>
          React will executed immediately once it renders this to the DOM


          */}

        
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
        
        {persons}


      </div>
      //JSX expression must have ONE root element, in this case "div"
    );
        //this code in JavaScript:
            // return React.createElement('div', {className: 'App'}, 
            // React.createElement('h1', null, 'Does this work now?'));
        //is exactly the same as:
            //return (
            //  <div className="App">
            //  <h1>Hi, I'm a React App</h1>
            //  </div>
            //);
        //in JSX. What is writen in JSX, is in the end compiled into JS.
        //React.createElement() is a method that takes at least 3 arguments:
          //- element to render to the DOM (ex. div)
          //- configuration, or if you don't want to: null
          //- any amount of children. you could have a multiple number of arguments separated by comma
            //children means what's nested inside this div (ex. I'm a React App)  
  }
}

//export of component App, used in index.js
export default App;