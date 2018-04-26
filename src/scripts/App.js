import React, {Component} from 'react';
import {persistor, store} from "./store";
import {PersistGate} from "redux-persist/es/integration/react";
import {Provider} from "react-redux";
import { PlayerBadge } from "./containers/PlayerBadge";
import {Renderer} from "./containers/Renderer";
import {LoadingAnimation} from "./components/LoadingAnimation";

import logo from '../logo.svg';
import '../styles/App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // here set default state values for this component
        };
        store.subscribe(() => {
            // This function will be run after every change of storage and should change state using self.seState() appropriately.
        });
    }



    render() {
        return (
            <div className="App">
                <Provider store={store}>
                    <PersistGate
                        loading={<LoadingAnimation/>} // This component will be shown until redux-persistors restores storage
                        persistor={persistor}>
                        <PlayerBadge/>
                        <Renderer/>
                    </PersistGate>
                </Provider>
            </div>
        );
    }
}

export default App;
