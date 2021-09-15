import React from 'react'
import { BrowserRouter as Router, Switch,Route } from 'react-router-dom'
import Canvas from './components/konva'
import Try from './components/Try'
import './App.css'

const App = () => {
  return (

    <Router>
      <Switch>

        <Route exact path = '/Konva' component = {Canvas}/>

        <Route exact path = '/Try' component = {Try}/>
      </Switch>
    </Router>
  )
}

export default App
