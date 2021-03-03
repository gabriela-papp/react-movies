import React from 'react'
import './App.css';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import MovieDetail from './components/MovieDetail'

function App() {
  return (
   <main>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact>
          </Route>
          <Route path="/movie/:id" component={MovieDetail}>
            
          </Route>
        </Switch>
      </Router>
   </main>
  );
}

export default App;
