import React, {Component} from "react";

import './Dashboard.css';
import CompanyIcon from "../CompanyIcon/CompanyIcon";
import SignOut from "../Signout/SignOut";
import Heading from "../Heading/Heading";
import SearchBox from "../SearchBox/SearchBox";
import Scroll from "../Scroll/Scroll";
import CardList from "../CardList/CardList";
import IssuedBooks from "../IssuedBooks/IssuedBooks";


export default class Dashboard extends Component{
    state = {
        showIssuedDashboard : false
    };
    enableShowIssuedDashboard = () => {
        this.setState({showIssuedDashboard: true})
    };
    disableShowIssuedDashboard = () => {
        this.setState({showIssuedDashboard: false})
    };

    render() {
        const {onSearchChange, isPending, robots} = this.props;
        return (
            <div className="Dashboard">
                <CompanyIcon/>
                <div className="container">
                    <Heading/>
                    <SearchBox searchProps={onSearchChange}/>
                    <Scroll>
                        {
                            !this.state.showIssuedDashboard ?
                            isPending?
                                <h1 className={`f1 tc pa4`}> Loading</h1>
                                :
                                <CardList
                                    robots={robots}
                                    onClickIssued={this.props.onClickIssued}
                                    enableShowIssuedDashboard={this.enableShowIssuedDashboard}
                                />
                                :
                                <IssuedBooks/>
                        }
                    </Scroll>
                </div>
                <SignOut handleSignOut={this.props.handleSignOut}/>
            </div>
        )
    }
}

