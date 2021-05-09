
import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Header from './Components/Header'
import India from './Components/India'
import StateData from './Components/StateData'
import World from './Components/World'
import {
  BrowserRouter,
  Switch,
  Link,
  Route
} from 'react-router-dom'

class App extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className='container-fluid'>
        <BrowserRouter>

          <Header/>

          <Switch>
            <Route exact path='/'>
              <India/>
            </Route>
            <Route path='/india'>
              <India/>
            </Route>
            <Route path='/world'>
              <World/>
            </Route>
          </Switch>
        
        
        
        
        </BrowserRouter>
        
      </div>
    )
  }
}


export default App;
// React js bootstrap tags starts with block letters
