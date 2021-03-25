import React, { useState } from 'react';
import Calendar from './Calendar';
import EventForm from './EventForm';
import TaskForm from './TaskForm';
import ReminderForm from './ReminderForm';
import EventView from './EventView';
import TaskView from './TaskView';
import ReminderView from './ReminderView';



export default function MySchedule(props) {

    const { events, style, onItemUpdate, onError, ...opts } = props;

    const [editWindow, setEditWindow] = useState(false);

    const [viewWindow, setViewWindow] = useState(false);

    const [selectedItem, setSelectedItem] = useState(null);

    const [updatedItem, setUpdatedItem] = useState(null);

    // called from the useAsync hook when the value of updateItem changes
    function onUpdate() {
        setSelectedItem(null);
        setUpdatedItem(null);
        onClose();
        onItemUpdate(); // call the function passed by parent
    }

    function onSelect(event) {
        const item = event.resource;
        setSelectedItem(item);
        setViewWindow(true);
    }

    function onClose() {
        setViewWindow(false);
        setEditWindow(false);
    }

    return (
    <div>
        <Calendar
            events={events}
            onSelect={onSelect}
        />
        {selectedItem && 
            <>
            <EventView
                item={selectedItem}
                open={viewWindow && selectedItem.type === 'event'}
                onClose={onClose}
                onEdit={() => setEditWindow(true)}
            />
            <TaskView
                item={selectedItem}
                open={viewWindow && selectedItem.type === 'task'}
                onClose={onClose}
                onEdit={() => setEditWindow(true)}
            />
            <ReminderView
                item={selectedItem}
                open={viewWindow && selectedItem.type === 'reminder'}
                onClose={onClose}
                onEdit={() => setEditWindow(true)}
            />
            <EventForm
                isCreate={false}
                initVals={{...selectedItem, 
                    start: new Date(selectedItem.start),
                    end: new Date(selectedItem.end)
                }}
                open={editWindow && selectedItem.type === 'event'}
                onClose={onClose}
                onSubmit={onUpdate}
                onError={onError}
            />
            <TaskForm
                isCreate={false}
                initVals={{...selectedItem, 
                    assigned: new Date(selectedItem.assigned),
                    due: new Date(selectedItem.due)
                }}
                open={editWindow && selectedItem.type === 'task'}
                onClose={onClose}
                onSubmit={onUpdate}
                onError={onError}
            />
            <ReminderForm
                isCreate={false}
                initVals={{...selectedItem, 
                    time: new Date(selectedItem.time)
                }}
                open={editWindow && selectedItem.type === 'reminder'}
                onClose={onClose}
                onSubmit={onUpdate}
                onError={onError}
            />
            </>
        }
    </div>);
}