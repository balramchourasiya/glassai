// questionTypes/OpenEnded.jsx
import React, { useState } from 'react';

const OpenEnded = ({ view }) => {
  const [answers, setAnswers] = useState([]);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (!input.trim()) return;
    setAnswers([...answers, input.trim()]);
    setInput('');
  };

  return (
    <div>
      {view === 'answer' && (
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write your answer"
            className="border px-3 py-2 rounded flex-grow"
          />
          <button onClick={handleAdd} className="bg-indigo-600 text-white px-4 rounded">Submit</button>
        </div>
      )}

      {view === 'results' && (
        <ul className="list-disc pl-6 mt-4">
          {answers.map((a, i) => <li key={i} className="mb-1">{a}</li>)}
        </ul>
      )}
    </div>
  );
};

export default OpenEnded;
