import React, {Component} from 'react';
import './App.css';
import axios from 'axios'
import Album from "./Album";

class App extends Component {
    state = {
        response: {}
    };

    componentDidMount() {
        axios.get('/api/v1/say-something').then((res) => {
            const response = res.data;
            this.setState({response});
        });
    }

    render() {
        return (
            <div className="App">
                <h1>{this.state.response.body}</h1>
                <Album/>
            </div>
        );
    }
}

export default App;
