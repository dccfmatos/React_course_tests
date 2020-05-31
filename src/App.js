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
    //to use in togglePersonsHandler
  }

  {/*React Hooks - for functional components (>16.8)
    need to import: import React, { useState} from 'react';
  ----> const app = props => {
      const [ personsState, setPersonsState] = useState({ --> useState returns an array with exactly 2 and always 2 elements 
        // the [] (array destructuring) allows to pull elements out of the array you get back
        // from the right side of the = >> useState
        persons: [ 
            { id: '111', name: 'Max', age: 28 }, 
            { id: '222', name: 'Manu', age: 29 },
            { id: '333', name: 'Maria', age: 26 }
    ],
    otherState: 'some other value
  });

      !!in React Hooks, when you do setState (second function)!!
      !!it will not merge what you passed to it with the old state!!
      !!instead it REPLACES the old state.!!

  "this.state, used everywhere in the class based component, now is "personsState"
  "this" doesn't exist in functional components

  in this case, setState would be::

   setPersonsState( {
      persons: [
        { name: 'Max', age: 28 },
        { name: event.target.value, age: 29 }, ---> prop value is the value we enter
        { name: 'Stephanie', age: 26 }
      ],
      otherState: personsState.otherState ----> Added manually
    });
  };
  --> OR --> You can have a useState call:
    can pass it as you want:
    -- as a String: useState('some other value');
    -- as an object: useState({otherState: 'some other value'});



    this is the function needed to the onClick event (button):
    here we want o edit the state
    switchNameHandler = ( newName ) => {
    this.setState( {//setState is a method that allows to update the state property
      persons: [//it will MERGE this with the existing data
       { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    } )
  }
  
  
  */}

  nameChangedHandler = ( event, id ) => {//need the id to know the user to update in the render()
    //need to update the state of the person but only for the person into input field we typed
    //find() gives us this person
    //findIndex() find element in the array and get de index of that element
    //we could also use the id of the function for this

    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    //function where we get person (p) as an input an then we got the function body:
    //unlike map, here we don't map this into something new
    //we have to return true or false, whether this is the element we are looking or not
    //it is the element we want if p.id is equal to id, and if it is, it will return true
    //and the index of that element will be represented by personIndex

    //good practice to not mutate the state directly
    //person is a JS object, and JS objects are reference types, if we mutate then directly we only get a pointer and not the object 
    //create a new JS object and use the spread operator, just like the array
    const person = {
      ...this.state.persons[personIndex]
    };
    // alternative approach to spread operator above::
    // const person = Object.assing({}, this.state.persons[personIndex]);
    
    person.name = event.target.value;

    //update the array ate the position we fetched
    const persons = [...this.state.persons];
    //update at one position [personIndex]
    persons[personIndex] = person;

    //set the state of persons array to the new array which is a copy of the old array
    //with the updated one element, where we ajusted the name
    this.setState( {persons: persons} );
  }


  deletePersonHandler = (personIndex) => {
      //fetch all the persons
    const persons = [...this.state.persons];//it's spreads out the elements in this array into a list
    //of elements which simply then gets added to "this" array
      //splice the personIndex, 1 element, this removes 1 element from the array
    persons.splice(personIndex, 1);//removes 1 element of th array
      //call this.setState and set persons to persons constant, which was updated
      //by splicing 1 element
    this.setState({persons: persons});
  } 

  {/*//-----> Flaw of this approach::


     deletePersonHandler = (personIndex) => {
    const persons = this.state.persons.slice();
    persons.splice(personIndex, 1);
    this.setState({persons: persons});


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
    //this.setState( {//setSte is a method that allows to update the state property
     // persons: [//it will MERGE this with the existing data
    //   { name: newName, age: 28 },
     //   { name: 'Manu', age: 29 },
     //   { name: 'Stephanie', age: 27 }
     // ]
  ///} )*/}


  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;//current state (true or false)
    this.setState( { showPersons: !doesShow } );//showPersons is equal to what doesShow is not
  } 
  
  

  render () {
    const myStyle = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    //this below is made inside the render method so that it renders everytime that React renders
    let persons = null;

    if ( this.state.showPersons ) { //showPersons is boolean (true or false) don't need to compare 
      persons = (
        <div> {/*//render list of Persons*/}
        {this.state.persons.map((person, index) => {
          //render state of persons array, is not something that can be converted to HTML
          //so we need to convert this array of JS (which is not valid JSX) to valid JSX
          //function to convert arrays: map function
          //it maps every element in a given array
          //
          
          return <Person 
          //I want to map it as a Person component, because every element of the array can
          // be represented as a Person in the end
            click={() => this.deletePersonHandler(index)}
            name={person.name}
            age={person.age}
            key={person.id}//key property is added to allow react to keep track of individual elements
            //so that it has a key property it can compare between the different elements
            //to find out which elements changed, so that it only re-renders those elements and not the whole list
            changed={(event) => this.nameChangedHandler(event, person.id)}
            />
        })}
         
        </div>
      );

      //After clicking the button, it should turn red 
      myStyle.backgroundColor = 'red';
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
          style={myStyle}
          onClick={this.togglePersonsHandler}>Toggle Persons</button> 
          {/*//onClick calls this.togglePersonsHandler function*/}
        
        {persons}
        {/*
        outputs Persons that render above, in:
        if ( this.state.showPersons )
        */}


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


{/*
You can pass methods also as props, so that you can call a method that might change the state, 
in another component wich doesn't have direct access to the state. Example:

  <button onClick={this.switchNameHandler}>Switch Name</button>

  <Person 
    name={this.state.persons[0].name}
    click={this.switchNameHandler}> My hobbies </Person>
    ---> "click": props in Person.js


*/}