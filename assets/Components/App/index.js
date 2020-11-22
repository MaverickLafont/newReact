import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import '../../styles/app.css';
import Header from "../Header";
import Landing from "../Landing";
import Footer from "../Footer";
import Welcome from "../Welcome";
import Login from "../Login";
import Signup from "../Signup";
import ErrorPage from "../ErrorPage";
import {ProtectedRoute} from "../Route/protected.route";
import {IconContext} from "react-icons";

function App() {
    return (
        <Router>
            <IconContext.Provider value={{ style: { verticalAlign: 'middle' }}}>
                <Header />

                <Switch>
                    <Route exact path="/" component={Landing} />
                    <ProtectedRoute path="/welcome" component={Welcome} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route component={ErrorPage} />
                </Switch>

                <Footer/>
            </IconContext.Provider>
        </Router>
    )
}

export default App;