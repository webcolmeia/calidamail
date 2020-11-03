import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Paper } from '@material-ui/core';
import styles from './style.module.css';

const Inbox = (props) => {

    const history = useHistory();

    const [messages, setMessages] = useState([]);

    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2MDM1NjQ4OTgsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImV1bHVrYXN0aHlhZ29AaW5pbG9naWMuY29tIiwiaWQiOiI1ZjdkZWVlZTk5OTEwYTc3YTcxMTJiMTkiLCJtZXJjdXJlIjp7InN1YnNjcmliZSI6WyJcL2FjY291bnRzXC81ZjdkZWVlZTk5OTEwYTc3YTcxMTJiMTkiXX19.96njno69H3YlOOe7_VS5hKNxGNuE5EpjuxmMC0Q8tFKR3F99TCxJ8MIbaLK46ji6vKzUUgaGh7_l8dnsgGKsJw"

    const getMessages = async () => {
        const response = await fetch("https://api.mail.tm/messages", {
            method: 'get',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': `bearer ${token}`
            }
        });

        response.json().then(json => {
            setMessages(json);
        });
    }

    useEffect(() => {
        getMessages();

        return () => {
            setMessages([]);
        }
    },[]);

    const openMessage = (item) => {
        const { id, subject, from } = item
        history.push(`/message/${id}`, {
            subject,
            from,
        });
    };

    return (
        <Paper className={styles.inboxPaper}>
            <h1>Caixa de Entrada</h1>
            <List>
                {
                    messages.map(item => (
                        <ListItem button onClick={() => openMessage(item)} key={item.id}>
                            <ListItemAvatar>
                                <Avatar>
                                    {item.from.name.substring(0,1)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.from.name} secondary={item.subject} />
                        </ListItem>
                    ))
                }
            </List>
        </Paper>
    )
}

export default Inbox;