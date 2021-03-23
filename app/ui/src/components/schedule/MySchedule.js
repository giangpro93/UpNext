import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function MySchedule(props) {

    const { events, style, ...opts } = props;

    return (
    <div>
        <Calendar
            style={style || {height: 500}}
            localizer={localizer}
            events={events || []}
            startAccessor="start"
            endAccessor="end"
            {...opts}
        />
    </div>);
}