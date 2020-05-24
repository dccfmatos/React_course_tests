import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 'afcwe1', name: 'Max', age: 28 },
      { id: 'c2e2', name: 'Manu', age: 29 },
      { id: '1f23', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
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

   // switchNameHandler = ( newName ) => {
    // console.log('Was clicked!');
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
      backgroundColor: 'white',
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
            changed={(event) => this.nameChangedHandler(event, persons.id)}
            />
        })}
         
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;