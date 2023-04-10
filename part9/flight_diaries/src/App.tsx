import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import axios from 'axios';

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [newEntryDate, setNewEntryDate] = useState('');
  const [newEntryVisibility, setNewEntryVisibility] = useState('');
  const [newEntryWeather, setNewEntryWeather] = useState('');
  const [newEntryComment, setNewEntryComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/diaries').then((res) => {
      console.log(res.data);
      setDiaryEntries(res.data);
    });
  }, []);

  const createNewEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry = {
      id: Math.random(),
      date: newEntryDate,
      weather: newEntryWeather,
      visibility: newEntryVisibility,
      comment: newEntryComment,
    };
    console.log(newEntry);
    axios.post('http://localhost:3001/api/diaries', newEntry).catch((error) => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setErrorMessage(error.response.data);
        }
        console.error(error);
        console.log('poop');
      } else {
        console.error(error);
      }
    });
  };

  return (
    <div>
      <div>
        <h1 color="red">{errorMessage}</h1>
        <h2>create new entry</h2>
        <form onSubmit={createNewEntry}>
          <input
            value={newEntryDate}
            onChange={(event) => setNewEntryDate(event.target.value)}
          />
          <input
            value={newEntryWeather}
            onChange={(event) => setNewEntryWeather(event.target.value)}
          />
          <input
            value={newEntryVisibility}
            onChange={(event) => setNewEntryVisibility(event.target.value)}
          />
          <input
            value={newEntryComment}
            onChange={(event) => setNewEntryComment(event.target.value)}
          />
          <button type="submit">create</button>
        </form>
      </div>
      <h2>diary entries</h2>
      {diaryEntries.map((d) => (
        <div key={d.id}>
          <h1>{d.date}</h1>
          <p>visibility: {d.visibility}</p>
          <p>weather: {d.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default App;

