import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './calendar.scss';

const localizer = momentLocalizer(moment);

export default function Calendar(props) {

    const { events, onSelect, ...opts } = props;

    return (
        <BigCalendar
            style={{height: 700}}
            step={60}
            localizer={localizer}
            events={events || []}
            startAccessor="start"
            endAccessor="end"
            onDoubleClickEvent={onSelect}
            {...opts}
        />
    );
}
