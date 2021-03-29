import React, { useState } from 'react';
import Calendar from './Calendar';
import ScheduleItemView from './ScheduleItemView';
import ScheduleItemForm from './ScheduleItemForm';
import ConfirmDialog from '../common/ConfirmDialog';
import { dateInputFormat } from './dateFormat';
const api = require('../../api-client/api');


export default function MySchedule(props) {

    const { events, style, onItemUpdate, onError, ...opts } = props;

    const [editWindow, setEditWindow] = useState(false);

    const [deleteWindow, setDeleteWindow] = useState(false);

    const [viewWindow, setViewWindow] = useState(false);

    const [selectedItem, setSelectedItem] = useState(null);

    // called from the useAsync hook when the value of updateItem changes
    function onUpdate() {
        setSelectedItem(null);
        onClose();
        onItemUpdate(); // call the function passed by parent
    }

    function onDelete() {
        setDeleteWindow(true);
    }

    function deleteItem() {
        return api.schedule.deleteScheduleItemById(selectedItem.id);
    }

    function onSelect(event) {
        const item = event.resource;
        setSelectedItem(item);
        setViewWindow(true);
    }

    function onClose() {
        setViewWindow(false);
        setEditWindow(false);
        setDeleteWindow(false);
    }

    return (
    <div>
        <Calendar
            events={events}
            onSelect={onSelect}
        />
        <ScheduleItemView
            item={selectedItem}
            open={viewWindow}
            onClose={onClose}
            onEdit={() => { setEditWindow(true) }}
            onDelete={() => { setDeleteWindow(true) }}
            onError={onError}
        />
        <ScheduleItemForm
            open={editWindow}
            type={selectedItem.type}
            mode='update'
            onClose={onClose}
            onSubmit={onUpdate}
            onError={onError}
            initVals={(() => {
                let vals = { ...selectedItem};
                if(vals.start) vals.start = dateInputFormat(vals.start);
                if(vals.end) vals.end = dateInputFormat(vals.end);
                if(vals.assigned) vals.assigned = dateInputFormat(vals.assigned);
                if(vals.due) vals.due = dateInputFormat(vals.due);
                if(vals.time) vals.time = dateInputFormat(vals.time);
                if(vals.reminder) vals.reminder = dateInputFormat(vals.reminder);
                console.log(vals);
                return vals;
            })()}
        />
        <ConfirmDialog
            title="Are you sure you want to delete this item?"
            open={deleteWindow}
            onClose={() => { setDeleteWindow(false) }}
            onConfirm={() => {
                deleteItem()
                .then(onUpdate)
                .catch(onError);
            }}
        />
    </div>);
}