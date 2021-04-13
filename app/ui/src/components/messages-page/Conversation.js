import { Paper, Typography, Divider, IconButton, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../api-client/api';
import useAsync from '../../hooks/useAsync';
import useForm from '../../hooks/useForm';
import { Input } from '../common/Input';
import Snackbar from '../common/Snackbar';
import MessageTile from './MessageTile';

export default function Conversation(props) {
    const { entityId, otherId, onUpdate } = props;
    const currentUser = useSelector(state => state.users.currentUser);
    const meId = entityId ? entityId : currentUser.id;
    const [update, setUpdate] = useState(0);
    const [error, setError] = useState(false);
    
    const messages = useAsync(() =>
        api.messages.getConversation({id1: meId, id2: otherId}),
        [update, entityId, otherId]
    );

    const otherEntity = useAsync(() => 
        api.users.getById(otherId)
        .then(res =>
            res ? res
            : api.groups.getById(otherId)
        )
        .catch(err => { alert('Error loading user data'); }),
        [otherId]
    )

    const {
        vals, 
        setVals, 
        errs, 
        setErrs, 
        onChange,
        reset
    } = useForm({ message: '' }, validate, true);

    function validate(fields = vals) {
        if(!vals.message) {
            setErrs({message: 'Cannot send blank message'});
            return false;
        }
        else if(Object.keys(errs).length > 0) setErrs({});
        return true;
    }

    function onMessageSend() {
        if(validate()) {
            api.messages.create({
                sender_id: meId,
                receiver_id: otherId,
                content: vals.message
            })
            .then(res => {
                if(res) {
                    setUpdate(x => x + 1);
                    setVals({ message: '' })
                    onUpdate();
                }
                else setError(true);
            })
            .catch(err => {
                setError(true);
            })
        }
    }

    return (
        <Paper raised style={{ padding: '10px', margin: '10px' }}>
            <div>
            <div style={{textAlign: 'center'}}>
                <Typography variant='h4'>
                {otherEntity.data ? otherEntity.data.name : null}
                </Typography>
            </div>
            <Divider />
            { (messages.data && messages.data.length > 0)
            ? (
                <Paper elevation={0} square style={{ position: 'relative', maxHeight: 600, overflow: 'auto', padding: '10px', margin: '10px'}}>
                {messages.data.map(m => 
                    <MessageTile
                        key={m.id}
                        message={m}
                        fromMe={m.sender_id === meId}
                    />
                )}
                </Paper>
            )
            : <p style={{ textAlign: 'center' }}>
                <Typography variant='subtitle1'>
                No previous messages
                </Typography>
              </p>
            }
            <div style={{ width: '100%', textAlign: 'right' }}>
                <div style={{ position: 'relative', width: '100%', display: 'inline-block'}}>
                    <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '10fr 1fr', gridGap: '10px'}}>
                    <div style={{ paddingTop: '10px' }}>
                    <Input.TextInput
                        label='Send Message'
                        name='message'
                        value={vals.message}
                        onChange={onChange}
                        multiline
                        required
                        error={errs.message}
                        helperText={errs.message ? errs.message : null}
                    />
                    </div>
                    <div style={{ paddingTop: '30%' }}>
                    <Button
                        variant='contained'
                        color='primary'
                        size='large'
                        endIcon={<SendIcon />}
                        onClick={onMessageSend}
                    >
                        Send
                    </Button>
                    </div>
                    </div>
                </div>
            </div>
            </div>
            <Snackbar
                open={error}
                onClose={() => { setError(false); }}
                severity='error'
                message='Error sending message'
            />
        </Paper>
    )
}
