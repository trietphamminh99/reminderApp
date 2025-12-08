import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ReminderList from './Components/ReminderList';
import { useState, useEffect } from 'react';
import axios from "axios";

const BASE_URL = "https://triet-backend.do2506.click";

function App() {
  const [reminders, setReminders] = useState([]);

  // Load reminders from backend
  useEffect(() => {
    axios.get(`${BASE_URL}/notes`)
      .then(res => setReminders(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add a new reminder
  function handleAddReminder(title, note, date) {
    const newReminder = { title, note, date };

    axios.post(`${BASE_URL}/notes`, newReminder)
      .then(res => {
        setReminders([...reminders, res.data]); // backend returns saved object with _id
      })
      .catch(err => console.error(err));
  }

  // Delete a reminder
  function handleDeleteReminder(id) {
    axios.delete(`${BASE_URL}/notes/${id}`)
      .then(() => {
        setReminders(reminders.filter(reminder => reminder._id !== id));
      })
      .catch(err => console.error(err));
  }

  return (
    <div className="App">
      <Navbar />
      <ReminderList
        reminders={reminders}
        handleAddReminder={handleAddReminder}
        handleDeleteReminder={handleDeleteReminder}
      />
      <Footer />
    </div>
  );
}

export default App;
