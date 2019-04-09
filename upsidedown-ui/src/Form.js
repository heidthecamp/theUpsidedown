import React, { Component } from 'react'
import './Form.css'

const url = "http://192.168.50.153:8081/upsidedown"

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            content: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
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
    
        console.log( data ) 
        
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
        }).then(res => {
            return res.json();
        }).then(res => {
            console.log(res)
        })

    }


    render(){
        return(
            <div className="form">
                <form name="communicate" onSubmit={this.handleSubmit}>
                    <input type="text" id="content" placeholder="A B C D E F G H I J K L M N O P Q R S T U V W X Y Z" name="content" onChange={this.handleChange} value={this.state.content} />
                    <br />
                    <div className="submit">
                        <button>
                            <div className="submitText">Send</div></button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Form