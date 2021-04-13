import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Paper, Divider, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import api from '../../api-client/api';
import useAsync from '../../hooks/useAsync';
import { dateStrFormat } from '../schedule/dates';
import Conversation from './Conversation';
import { Input } from '../common/Input';
import NewMessageDialogBox from './NewMessageDialogBox';

export default function MessagesPage(props) {
    const { entity } = props;
    const currentUser = useSelector(state => state.users.currentUser);
    const targetEntity = (entity && entity.id) ? entity : currentUser;

    // signals update of recentMessengers list
    const [updateRecentMessengers, setUpdateRecentMessengers] = useState(0);
    
    // which list item is selected?
    const [selected, setSelected] = useState(0);

    const recentMessengers = useAsync(() =>
        api.messages.recentMessengers(targetEntity.id),
        [targetEntity, selected, updateRecentMessengers]
    );

    // the user id of the other user in the conversation
    const [other, setOther] = useState(recentMessengers.data ? recentMessengers.data[0] : null);

    useEffect(() => {
        if(recentMessengers.data && !recentMessengers.loading) 
            setOther(recentMessengers.data[selected])
    }, [selected, recentMessengers])

    // the user id of a user to send a new message
    const [newMessageWindow, setNewMessageWindow] = useState(null);
    
    return (
        <div>
            <Grid container spacing={1}>
                <Grid container xs={3} direction='column' wrap='nowrap'>
                    <Grid item container xs={12} wrap='nowrap'>
                        <Paper raised style={{ position: 'relative', padding: '5px', margin: '15px'}}>
                        <div style={{ textAlign: 'center'}}>
                        <Typography variant='h6'>
                            Recent Conversations
                        </Typography>
                        </div>
                        <Divider />
                        <Paper raised style={{ position: 'relative', maxHeight: 600, overflow: 'auto', padding: '10px', margin: '10px'}}>
                        <List component='nav'>
                            { (recentMessengers.data && recentMessengers.data.length > 0)
                            ? recentMessengers.data.map((m, i) => 
                                <>
                                <ListItem
                                    key={m.id}
                                    button
                                    selected={selected === i}
                                    onClick={() => {
                                        setSelected(i);
                                        setOther(recentMessengers.data[i]);
                                    }}
                                >
                                    <ListItemText 
                                        primary={m.name}
                                        secondary={dateStrFormat(m.time)}
                                    />
                                </ListItem>
                                <Divider />
                                </>
                                )
                            : <Typography variant='h5'>No recent messages</Typography>
                            }
                        </List>
                        </Paper>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} wrap='nowrap'>
                        <div style={{ position: 'relative', textAlign: 'center'}}>
                        <Input.ButtonInput
                            label='New Message'
                            color='primary'
                            size='large'
                            onClick={() => { setNewMessageWindow(true); }}
                        />
                        </div>
                    </Grid>
                </Grid>
                <Grid item xs={9}>
                {other && 
                <Conversation
                    entityId={targetEntity.id}
                    otherId={other.id}
                    otherName={other.name}
                    onUpdate={() => { 
                        setUpdateRecentMessengers(x => x + 1);
                        setSelected(0);
                    }}
                />
                }
                </Grid>
            </Grid>
            <NewMessageDialogBox
                entityId={targetEntity.id}
                open={newMessageWindow}
                onSend={() => { 
                    setNewMessageWindow(false); 
                    setUpdateRecentMessengers(x => x + 1);
                    setSelected(0);
                }}
                onClose={() => { setNewMessageWindow(false); }}
            />
        </div>
    )
}
