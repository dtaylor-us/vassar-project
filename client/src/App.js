import React, {Component, useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import Album from "./Album";
import AddressForm from "./AddressForm";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

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
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/album">Album</Link>
                            </li>
                            <li>
                                <Link to="/form">AddressForm</Link>
                            </li>
                        </ul>
                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/album">
                            <Album/>
                        </Route>
                        <Route path="/form">
                            <AddressForm/>
                        </Route>
                        <Route path="/">
                            <Home/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

function Home() {

    const [state, setState] = useState("Not loaded");
    useEffect(() => {
        axios.get('/api/v1/say-something').then((res) => {
            const response = res.data;
            setState(response);
        })
    }, []);
    return (
        <div className="App">
            <h1>Hello from the frontend!</h1>
            <h1>{state.body}</h1>
        </div>
    )
}

export default App;
