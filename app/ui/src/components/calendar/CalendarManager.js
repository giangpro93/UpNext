import React, {useState} from 'react';
import { MyCalendar } from './MyCalendar';

export function CalendarManager(props) {
    const [events, setEvents] = useState([]);

    // expect an "EventLike" object to be created by child component and returned
    function onSubmit(eventLike) {
        if(eventLike.type === "Event") {

        } else if (eventLike.type === "Task") {

        } else { // eventLike.type === "Reminder"

        }
    }

    return (
        <div>
        <MyCalendar events={events}/>
        </div>
    );
}