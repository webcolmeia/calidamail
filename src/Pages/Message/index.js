import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, makeStyles, Typography, Divider, Avatar, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton, Button } from '@material-ui/core';

import stylemessage from './style.module.css';
import { ArrowBack, Delete, Description, GetApp, Print } from '@material-ui/icons';

const useStyles = makeStyles({
    paper: {
        padding: 20
    },
});

const Message = ({ location, history }) => {

    const classes = useStyles();

    const { subject, from } = location.state;

    const { id } = useParams();

    const [fullMessage, setFullMessage] = useState({});

    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2MDM1NjQ4OTgsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImV1bHVrYXN0aHlhZ29AaW5pbG9naWMuY29tIiwiaWQiOiI1ZjdkZWVlZTk5OTEwYTc3YTcxMTJiMTkiLCJtZXJjdXJlIjp7InN1YnNjcmliZSI6WyJcL2FjY291bnRzXC81ZjdkZWVlZTk5OTEwYTc3YTcxMTJiMTkiXX19.96njno69H3YlOOe7_VS5hKNxGNuE5EpjuxmMC0Q8tFKR3F99TCxJ8MIbaLK46ji6vKzUUgaGh7_l8dnsgGKsJw"


    useEffect(() => {

        const getFullMessage = async () => {

            const response = await fetch(`https://api.mail.tm/messages/${id}`, {
                method: 'get',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'authorization': `bearer ${token}`
                }
            });
    
            await fetch(`https://api.mail.tm/messages/${id}`, {
                method: 'PATCH',
                headers:{
                    'Content-Type': 'application/merge-patch+json',
                    'Accept': 'application/json',
                    'authorization': `bearer ${token}`
                },
                body: JSON.stringify({"seen": true})
            });
    
            response.json().then(json => {
                setFullMessage(json);
            });
        }

        getFullMessage();

        return () => {
            setFullMessage({});
        }
    },[id]);


    return (
        <div>
            <Button startIcon={<ArrowBack />} onClick={() => { history.goBack() }}>
                Voltar
            </Button>
            <Paper className={classes.paper}>
                <Typography variant="h4" component="h1">{ subject }</Typography>
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>{ from.name.substring(0,1) }</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={from.name} secondary={`Por: ${ from.address }`} />
                        <ListItemSecondaryAction>
                            <IconButton>
                                <GetApp />
                            </IconButton>
                            <IconButton>
                                <Print />
                            </IconButton>
                            <IconButton>
                                <Description />
                            </IconButton>
                            <IconButton>
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
                <Divider />
                <div className={stylemessage.containerIframe}>
                    <base target="_parent" />
                    {fullMessage.html && <iframe className={stylemessage.iframeMail} width="100%" title="iframemail" srcDoc={fullMessage.html[0]} frameBorder={0} />}
                </div>
            </Paper>
        </div>
    )
}

export default Message;