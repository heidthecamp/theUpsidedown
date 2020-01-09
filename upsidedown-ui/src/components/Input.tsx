import React, { useState, ChangeEvent } from 'react'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import {UpsidedownService} from '../services/upsidedown'

const upsidedownSvc = new UpsidedownService();

export function Input() {

    const [message, setMessage] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { value } = event.currentTarget;
        setMessage(value);
    }

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(message);
        const didPost = await(upsidedownSvc.postMessage(message));
        if (didPost){
            console.log('success');
            setMessage('');
        }
        else {
            console.error('failure');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label='The Rift'
                multiline
                placeholder='A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'
                onChange={handleChange}
                value={message} />
            <Button type={'submit'}>Submit</Button>
        </form>
    )
}