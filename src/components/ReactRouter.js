import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MainPage from './MainPage'

const ReactRouter = () => {
  return (
    <Router>
      <div>
        <Route exact path='/' component={MainPage} />
      </div>
    </Router>
  )
}

export default ReactRouter
