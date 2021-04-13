import { Card, Typography } from '@material-ui/core';
import React from 'react';
import { dateStrFormat } from '../schedule/dates';


export default function MessageTile(props) {
    const { message, fromMe } = props;

    return (
        <div style={{ width: '100%', textAlign: (fromMe ? 'right' : 'left') }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
            <Card
                style={{padding: '5px', margin: '5px', backgroundColor: fromMe ? '#7986cb' : '#ff4081'}}
            >
                <Typography variant='subtitle1'>{message.content}</Typography>
                <Typography variant='caption'>{dateStrFormat(message.created_at)}</Typography>
            </Card>
            </div>
        </div>
    )
}
