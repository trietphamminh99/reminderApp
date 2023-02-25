import Reminder from "./Reminder";
import React from "react"
import AddReminder from "./AddNote";


export default function ReminderList({reminders,handleAddReminder,handleDeleteReminder}) {
    return (
        <div className="reminder-list">
            {reminders.map((reminder)=>
             <Reminder 
             id={reminder.id} 
             key={reminder.id}
             reminder={reminder}
             handleDeleteReminder = {handleDeleteReminder}
           />
             
             )}
            <AddReminder handleAddReminder= {handleAddReminder}/>
        </div>
    )
}