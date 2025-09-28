import React, { useState } from 'react';

const PinOnImage = ({ view }) => {
  const [pins, setPins] = useState([]);

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setPins([...pins, { x: e.clientX - rect.left, y: e.clientY - rect.top }]);
  };

  return (
    <div className="relative inline-block">
      <img
        src="https://placekitten.com/500/300"
        alt="Pin target"
        className="rounded-lg border"
        onClick={view === 'answer' ? handleClick : undefined}
      />
      {pins.map((p, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 bg-red-600 rounded-full border-2 border-white"
          style={{ left: p.x - 8, top: p.y - 8 }}
        />
      ))}
      {view === 'results' && pins.length === 0 && <p className="mt-2 text-gray-500">No pins yet.</p>}
    </div>
  );
};

export default PinOnImage;
