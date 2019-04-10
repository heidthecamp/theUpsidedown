import React, { Component } from 'react'
import './App.css'
import Header from './Header'
import Footer from './Footer'
import Form from './Form'

class App extends Component {
  render() {
    return (
      <body>
        <div id="wrapper">
          <div id="content">
            <Header />
            <Form />
          </div>
        </div>
        <Footer />
      </body>
    )
  }
}

export default App