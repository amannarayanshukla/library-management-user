import React, {Component} from "react";

import IssuedCard from '../IssuedBooksCard/IssuedBooksCard'
import {issuedBooks} from '../../api/IssuedBooks'

export default class IssuedBooks extends Component{
    state = {
        issuedBooks: []
    };

    componentDidMount() {
        const uuid = localStorage.getItem('uuid');
        const accessToken = localStorage.getItem('accessToken')
        issuedBooks(uuid,accessToken)
            .then(data => {
                console.log(data,"ISSUED BOOKS")
            })
            .catch(err => {
                console.log(err,"ERROR")
            })
    }

    render() {
        return (
            <div>
                {
                    this.state.issuedBooks.length > 0 ?
                        this.state.issuedBooks.map((item,index) => {
                            return (
                                <IssuedCard/>
                            )
                        })
                        :
                        ''
                }
            </div>
        )
    }
}
