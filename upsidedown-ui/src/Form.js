import React, { Component } from 'react'
import './Form.css'

const url = "http://192.168.50.153:8081/upsidedown"
// const lights = "./img/lightsString.png"

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            content: "",
            sending: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.getContet = this.getContet.bind(this)
    }
    handleChange(e){
        const { name, value } = e.target
        // value = value.toUpperCase()
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        // const data = new FormData(event.target)

        const data = {
            content: this.state.content
        }
        
        this.setState({sending: true})

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "origin-list"
            }
        }).then(res => {
            return res.json();
        }).then(data => {
            console.log(data)
        })
        setTimeout(() => {
            this.setState({
                sending: false,
                content: "",
            })
        }, 2500)

    }

    getContet() {
        return( this.state.sending ? 
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


    render(){
        return(
            <div className="content">
                {this.getContet()}
            </div>
        )
    }
}

export default Form