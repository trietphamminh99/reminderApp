import Reminder from "./Reminder";
import AddReminder from "./AddNote";


export default function ReminderList({reminders,handleAddReminder,handleDeleteReminder}) {
    return (
        <div className="reminder-list">
            {reminders.map((reminder)=>
             <Reminder 
             id={reminder._id} 
             key={reminder._id}
             reminder={reminder}
             handleDeleteReminder = {handleDeleteReminder}
           />
             
             )}
            <AddReminder handleAddReminder= {handleAddReminder}/>
        </div>
    )
}