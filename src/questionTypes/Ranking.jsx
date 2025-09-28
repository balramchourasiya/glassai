import React, { useState } from 'react';

const options = ['Option A', 'Option B', 'Option C', 'Option D'];

const Ranking = ({ view }) => {
  const [ranking, setRanking] = useState(options);

  const move = (i, dir) => {
    const newRank = [...ranking];
    const j = i + dir;
    if (j < 0 || j >= newRank.length) return;
    [newRank[i], newRank[j]] = [newRank[j], newRank[i]];
    setRanking(newRank);
  };

  return (
    <div>
      {view === 'answer' && (
        <ul>
          {ranking.map((item, i) => (
            <li key={i} className="flex items-center gap-2 mb-2">
              <span className="flex-grow">{item}</span>
              <button onClick={() => move(i, -1)} className="px-2 bg-gray-300 rounded">↑</button>
              <button onClick={() => move(i, 1)} className="px-2 bg-gray-300 rounded">↓</button>
            </li>
          ))}
        </ul>
      )}

      {view === 'results' && (
        <ol className="list-decimal pl-6">
          {ranking.map((item, i) => <li key={i}>{item}</li>)}
        </ol>
      )}
    </div>
  );
};

export default Ranking;
