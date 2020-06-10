import React, {Component} from "react";
import { Card,Modal,Radio,TimePicker } from 'antd';
import {UpOutlined,ReadOutlined,HomeOutlined}  from '@ant-design/icons';
import moment from 'moment';

import 'antd/dist/antd.css';
import './Card.css';
import {issuedRaised} from '../../api/issuedRaised.api';
import {message} from "antd/es";

const { Meta } = Card;

export default class BookCard extends Component {

    state = {
        visible: false,
        value: 0,
        read : false,
        home : false
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    showDuration = (key) => () => {
        this.setState({[key] : !(this.state[key])})
    };

    handleOk = (bookID,home,library,enableShowIssuedDashboard) => e => {
        e.preventDefault();
        const uuid = localStorage.getItem('uuid');
        const accessToken = localStorage.getItem('accessToken');
        const userID = localStorage.getItem('userID');

        const radio = document.getElementById("radio");
        const time = document.getElementById("time").value;


        let type, time_of_returned_request;
        let time_of_issue_request = new Date();
        console.log(time_of_issue_request,"time_of_issue_request");
        if(home && this.state.value != 0){
            type = 'home';
            time_of_returned_request = this.state.value;
        } else if (library && time){
            type = 'library';
            time_of_returned_request = time;
        }

        issuedRaised(uuid,accessToken,bookID,userID,type,time_of_issue_request,time_of_returned_request)
            .then(data =>{
                console.log(data,"DATA");
                this.setState({
                    visible: false,
                });
                enableShowIssuedDashboard();
            })
            .catch(err => {
                console.log(err);
                message.error('Please try again');
            });

        console.log(uuid,"UUID");
        console.log(accessToken,"accessToken");
        console.log(userID,"userID");
        console.log(bookID,"bookID");
        console.log(home,"home");
        console.log(library,"library");
        console.log(time,"time");
        console.log(this.state.value,"radio");

    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    onChangeRadio = e => {
        this.setState({
            value: e.target.value,
        });
    };



    render() {
        const {_id,image,name,author,can_read_in_library,can_take_home} = this.props.robot;
        const format = 'HH';
        return (
            <div>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk (_id,can_take_home,can_read_in_library,this.props.enableShowIssuedDashboard)}
                    onCancel={this.handleCancel}
                >
                    <ReadOutlined
                        hidden= {!(JSON.parse(can_read_in_library))}
                        className = "option"
                        onClick = {this.showDuration('read')}
                    />
                    <HomeOutlined
                        hidden= {!(JSON.parse(can_take_home))}
                        className = "option"
                        onClick = {this.showDuration('home')}
                    />
                    <Radio.Group
                        onChange={this.onChangeRadio}
                        value={this.state.value}
                        disabled = {!(this.state.read)}
                        className="duration"
                        id="radio"
                    >
                        <Radio value={1}>One day</Radio>
                        <Radio value={7}>Seven day</Radio>
                    </Radio.Group>
                    <TimePicker
                        defaultValue={moment('17', format)}
                        format={format}
                        disabled = {!(this.state.home)}
                        className="duration"
                        id="time"
                    />
                </Modal>
                <Card
                    hoverable
                    style={{ width: 240,marginLeft: "20px"  }}
                    cover={<img alt="example" src={image} />}
                    actions={[
                        <UpOutlined className = "action" key = 'issue' onClick={this.showModal}/>
                    ]}
                >
                    <Meta title={name} description={author} />
                </Card>
                {console.log(this.props.robot)}
            </div>
        )
    }
}
