import React from 'react';
import Tile from './Tile';


export default function EntityTile(props) {
    const { entity, onClick, children, paperStyle, ...other } = props;
    return (
        <Tile
            label={entity.name}
            caption={entity.email}
            onClick={onClick}
            paperStyle={paperStyle}
        >
            {children}
        </Tile>
    )
}
