import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function MyCalendar(props) {

    const { style, events } = props;

    return (
    <div>
        <Calendar
            style={style || {height: 500}}
            localizer={localizer}
            events={events || []}
            startAccessor="start"
            endAccessor="end"
        />
    </div>);
}