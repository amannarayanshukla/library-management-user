import React,{Component} from 'react';
import { connect } from 'react-redux';

import Particles from 'react-particles-js';
import moment from "moment";

import {setSearchField, requestRobots} from "./actions";
import SignIn from "./components/SignIn/SignIn";
import Dashboard from "./components/Dashboard/Dashboard";

import {login} from './api/login.api';
import {logout} from './api/logout.api';

import './App.css';

const particlesOptions = {
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 500
            },
            size: {
                value: 3
            }
        },
        color: {
            value: "#000"
        },
        line_linked: {
            color: "#000",
        }

    }
};

const mapStateToProps = (state) => {
    const {searchField} = state.searchRobots;
    const {isPending, robots, error} = state.fetchRobots;
    return {
        searchField,
        isPending,
        robots,
        error
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event)=> {
            dispatch(setSearchField(event.target.value))
        },
        onRequestRobots:() => dispatch(requestRobots())
    }
};

class App extends Component{
    componentDidMount() {
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken){
            this.setState({signedIn: true});
        }
        this.props.onRequestRobots()
    }

    constructor(props) {
        super(props);
        this.state = {
            signedIn : false,
        }
    }

    handleSignOut = (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('accessToken');
        const uuid = localStorage.getItem('uuid');
        logout(uuid,accessToken)
            .then((data) => {
                localStorage.removeItem('uuid');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                this.setState({signedIn: false});
            })
            .catch(err => {
                console.log(err,"ERROR")
            })
    };

    handleSignIn = (e) => {
        e.preventDefault();
        const email = document.getElementById("email-address").value;
        const password = document.getElementById("password").value;
        login(email,password)
            .then((data) => {
                console.log(data,"DATA in login");
                const {uuid,accessToken,message,refreshToken,role,userID} = data.data;
                localStorage.setItem('uuid',uuid);
                localStorage.setItem('accessToken',accessToken);
                localStorage.setItem('refreshToken',refreshToken);
                localStorage.setItem('userID',userID);
                if(uuid){
                   this.setState({signedIn: true})
                }
                // console.log(message, " : MESSAGE");
                // console.log(role," : ROLE");
                // console.log(userID," : userID");
            })
            .catch((err) => {
                console.log(err,"ERROR");
            })
    };

    handleSignUp = () => {
        this.setState({signUp: true});
    };

    goToSignIn = () => {
        this.setState({signUp: false, signedIn: false})
    };

    onClickIssued = (type) =>(bookID) => (event) => {
        //TODO: take the book id, time and student name and send a request
        // let time_of_returned_request = document.getElementById("time_of_returned_request").value;
        let data = {
            "time_of_issue_request" : new Date(),
            type,
            bookID,
        };

        console.log(type + ` : type `);
        console.log(bookID + ` : bookID`);
        console.log(moment.utc()+" : moment")
        // console.log( <Moment/>+ ` : time_of_issue_request`);
        // console.log( time_of_returned_request + ` : time_of_return_request`);

    };

    render() {
        const {signedIn} = this.state;
        let {searchField, robots, isPending, onSearchChange} = this.props;
        robots = robots.data && robots.data.books && robots.data.books.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        });

        return (
            <div className="App">

                <Particles params={particlesOptions}/>
                {
                    signedIn ?
                        <Dashboard
                            style={{"position":"absolute"}}
                            handleSignOut = {this.handleSignOut}
                            isPending = {isPending}
                            onSearchChange = {onSearchChange}
                            robots = {robots}
                            onClickIssued = {this.onClickIssued}
                        />
                        :
                        <SignIn
                            handleSignIn = {this.handleSignIn}
                            handleSignUp = {this.handleSignUp}
                        />
                }
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
