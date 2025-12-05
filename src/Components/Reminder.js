import {MdDeleteForever} from 'react-icons/md'


export default function Reminder({ id, reminder, handleDeleteReminder }) {
    return (
        <div className='reminder'>
            <span><h3>{reminder.title}</h3></span>
            <span>{reminder.note}</span>
            <p>---------------------</p>
            <div className='reminder-footer'>
                <small>
                    <p>Reminder Created on</p>{reminder.date}
                </small>

                <MdDeleteForever
                    onClick={() => handleDeleteReminder(id)}
                    className='delete-icon'
                    size='1.3em'
                />
            </div>
        </div>
    );
}