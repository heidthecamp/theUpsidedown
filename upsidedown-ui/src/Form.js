import React, { Component } from 'react'
import './Form.css'
// import { lookup } from 'dns';

const url = "http://localhost:8081/upsidedown"
// const lights = "./img/lightsString.png"

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            content: "",
            sending: false,
        }

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

    handleSubmit = (event) => {
        event.preventDefault();
        // const data = new FormData(event.target)

        const data = {
            content: this.state.content
        }
        
        this.setState({sending: true})

        // debugger;
        
        var request = new Request (url, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(data),
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        })

        fetch(request)
        .then(res => res.body)
        .then(body => {
            const reader = body.getReader()

            return new ReadableStream({
                start(controller) {
                    return pump() 
                    
                    function pump () {
                        
                    }
                }
            })
        })
        
        setTimeout(() => {
            this.setState({
                sending: false,
                content: "",
            })
        }, 2500)

        .catch(e => {
            console.error(e)
        })

        // function getMoviesFromApiAsync() {
        //     return fetch('https://facebook.github.io/react-native/movies.json')
        //       .then((response) => response.json())
        //       .then((responseJson) => {
        //         return responseJson.movies;
        //       })
        //       .catch((error) => {
        //         console.error(error);
        //       });
        //   }

        

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