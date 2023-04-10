import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';
import axios from 'axios';

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/diaries').then((res) => {
      console.log(res.data);
      setDiaryEntries(res.data);
    });
  }, []);

  return (
    <div>
      {diaryEntries.map((d) => (
        <div>
          <h1>{d.date}</h1>
          <p>visibility: {d.visibility}</p>
          <p>weather: {d.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default App;

