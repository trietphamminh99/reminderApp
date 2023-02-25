
import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ReminderList from './Components/ReminderList';
import { useState } from 'react';
import {nanoid} from 'nanoid';

function App() {
  const [reminders, setReminders] = useState([
    {
      id: nanoid(),
      text: 'Buy groceries',
      reminder: '14/2/2023',
      date: '2/25/2023'
    }
  ]);

  function handleAddReminder(text, reminder) {
    const date = new Date();
    const newReminder = {
      id: nanoid(),
      text: text,
      reminder:reminder,
      date: date.toLocaleDateString()
    };
    setReminders([...reminders, newReminder]);
  }
  function DeleteReminder(id){
    const newReminders=reminders.filter((note) => note.id !==id);
    setReminders(newReminders);
  }
  return (
    <div className="App">
      <Navbar/>
      <ReminderList reminders={reminders} handleAddReminder={handleAddReminder} handleDeleteReminder={DeleteReminder}/>
      <Footer/>
    </div>
  );
}

export default App;
