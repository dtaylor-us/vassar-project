import React, {Component, useEffect, useState} from 'react';
import './App.css';
import axios from 'axios'
import Album from "./Album";
import AddressForm from "./PersonForm";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SimpleMenu from "./SimpleMenu";
import Footer from "./Footer";

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
                    <SimpleMenu/>
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
                    <Footer/>
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
