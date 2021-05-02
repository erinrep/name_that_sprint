import css from "../css/app.css"
import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom'

import Routes from './Routes'

export default function App() {
  return (
    <Router>
      <div>
        <h1>Name That Sprint!</h1>
        <Routes />
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))