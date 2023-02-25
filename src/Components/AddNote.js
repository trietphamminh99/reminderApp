import { useState } from "react"

export default function AddReminder({handleAddReminder}){
    const [reminderText, setNoteText] = useState('');
    const [reminder, setDateText] = useState('');
    
    function handleNoteChange(event){
        setNoteText(event.target.value);
        
    }
    
    function handleDateChange(event){
        setDateText(event.target.value);
        
    }
    
    const handleSaveClick = () => {
        handleAddReminder(reminderText, reminder);
    }
    
    return (
        <div className='reminder new'>
            <textarea 
                rows='1'
                cols='10'
                placeholder='Type to add a note...'
                value={reminderText}
                onChange={handleNoteChange}
            ></textarea>
            
            <textarea 
                rows='8'
                cols='2'
                placeholder='Type to add a time and date...'
                value={reminder}
                onChange={handleDateChange}
            ></textarea>
            <p>---------------------</p>
            <div className='reminder-footer'>
                <small>Reminder Created Date</small>
                <button className='save' onClick={handleSaveClick}>save</button>
            </div>
        </div>
    )
}