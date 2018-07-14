// React Deps
import React from 'react'
import ReactDOM from 'react-dom'
import { Component } from 'app/decorators'

// Views
import MainView from 'app/views/MainView'

@Component({ fork: true })
class App extends React.Component {
    render() {
        return <MainView />
    }
}

ReactDOM.render(<App />, document.body)
