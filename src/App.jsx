
import ReactDOM from 'react-dom'
import MainView from 'app/views/MainView'

@Component({ fork: true })
class App {
    render() {
        return <MainView />
    }
}

ReactDOM.render(<App />, document.body)
