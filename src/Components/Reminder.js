import {MdDeleteForever} from 'react-icons/md'
import React from "react"

export default function Reminder(props) {
    
    return (
        <div className='reminder'>
            <span><h3>{props.reminder.text}</h3></span>
            <span>{props.reminder.reminder}</span>
            <p>---------------------</p>
            <div className='reminder-footer'>
                <small><p>Reminder Created on</p>{props.reminder.date}</small>
                <MdDeleteForever onClick={()=>props.handleDeleteReminder(props.reminder.id)} className='delete-icon' size= '1.3em'/>
            </div>
        </div>
    )
}