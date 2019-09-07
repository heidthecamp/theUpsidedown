import React, { Component } from 'react'
import './Form.css'
// import axios from 'axios'

const url = "http://localhost:8081/upsidedown"

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            sending: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.getContet = this.getContet.bind(this)
    }
    handleChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ content: this.state.content, sending: true })
        const toSend = this.state.content
        const data = {
            'content': `${toSend}`
        }

        console.dir(data)

        var request =
        {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }

        fetch(url, request).then(res => {
            const response = res.json();
            console.log(response.body)

            setTimeout(() => {
                this.setState({
                    sending: false,
                    content: "",
                })
            }, 2500)
        }).catch(error => {
            console.error(error)
            this.setState({
                sending: false,
                content: "",
            })
        })

        setTimeout(() => {
            this.setState({
                sending: false,
                content: "",
            })
        }, 2500)
    }

    getContet() {
        return (this.state.sending ?
            <div className="sending" /> :
            <form name="communicate" onSubmit={this.handleSubmit}>
                <input type="text" id="content" placeholder="A B C D E F G H I J K L M N O P Q R S T U V W X Y Z" name="content" onChange={this.handleChange} value={this.state.content} />
                <br />
                <div className="submit">
                    <button>
                        <div className="submitText">Send</div>
                    </button>
                </div>
            </form>
        )
    }


    render() {
        return (
            <div className="content">
                {this.getContet()}
            </div>
        )
    }
}

export default Form