import React, {Component} from "react";
import TimeField from 'react-simple-timefield';

import './Duration.css'

class Duration extends Component{
    state = {
        homeHidden : true,
        readHidden : true,
        timeValue: `00:00`,
        submitButton: "none",
    };

    setDefault = () => {
        this.setState({homeHidden:true,readHidden:true,timeValue:`00:00`,submitButton:"none"});
        this.props.toggleModal();
    };

    changeHomeHidden = () =>{
        this.setState({homeHidden:false,readHidden:true,submitButton:"block"})
    };

    changeReadHidden = () => {
        this.setState({homeHidden:true,readHidden:false,submitButton:"block"})
    };

    changeTime = (event,value) => {
        this.setState({timeValue: value})
    };

    render() {
        return (
            <div
                className="boxDuration"
                hidden={this.props.isHidden}
            >
                <button
                    className="f link dim br-pill ba ph3 pv2 mb2 dib"
                    href="#"
                    onClick={this.changeReadHidden}
                >
                    {`Read in library`}
                </button>
                <button
                    className="f link dim br-pill ba ph3 pv2 mb2 dib"
                    href="#"
                    onClick={this.changeHomeHidden}
                >
                    {`Take home`}
                </button>
                <div className="radioOptions">
                    <input type="radio" id="male" name="gender" value="male" hidden={this.state.homeHidden}/>
                    <label htmlFor="1 day" className="options" hidden={this.state.homeHidden}>1 day</label>
                    <input type="radio" id="female" name="gender" value="female" hidden={this.state.homeHidden}/>
                    <label htmlFor="7 days" className="options" hidden={this.state.homeHidden}>7 days</label>
                </div>
                <div className="timeOptions">
                    <TimeField
                        style = {{
                            "width": "150px",
                            "borderRadius" : "0px",
                            "textAlign":"center"
                        }}
                        hidden={this.state.readHidden}
                        value={this.state.timeValue}                       // {String}   required, format '00:00' or '00:00:00'
                        onChange={this.changeTime} // {Function} required
                        colon=":"
                    />
                </div>
                <div>
                    <button
                        className="f link dim br-pill ba ph3 pv2 mb2 dib"
                        href="#"
                       style= {{ "display": this.state.submitButton}}
                        onClick={this.changeHomeHidden}
                    >
                        {`Submit`}
                    </button>
                </div>
                <p>
                    <button className="cancel" onClick={this.setDefault}>Cancel</button>
                </p>
            </div>
        )
    }
}

export default Duration;
