import React, { useState, useMemo, useEffect } from 'react';

// Simple Word Cloud component: collect responses, persist, and render a word cloud
const STORAGE_KEY = 'wordcloud_v1';

function normalizeWord(w) {
  return w.trim().toLowerCase().replace(/[^\w'-]+/g, '');
}

export default function WordCloud() {
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch { return [] }
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(responses)); } catch {}
  }, [responses]);

  const addResponse = () => {
    const value = input.trim();
    if (!value) return;
    setResponses(r => [value, ...r].slice(0, 500));
    setInput('');
  };

  const clearAll = () => {
    if (!window.confirm('Clear all responses?')) return;
    setResponses([]);
  };

  const stats = useMemo(() => {
    const map = new Map();
    const stopwords = new Set(['the','and','a','to','of','in','is','it','that','this','for','on','with','as','are','was','but','or','be']);
    for (const r of responses) {
      // split into words
      const parts = r.split(/\s+/).map(normalizeWord).filter(Boolean);
      if (parts.length === 0) continue;
      for (const w of parts) {
        if (stopwords.has(w)) continue;
        map.set(w, (map.get(w) || 0) + 1);
      }
    }
    const arr = Array.from(map.entries()).sort((a,b) => b[1]-a[1]);
    const max = arr.length ? arr[0][1] : 1;
    return { arr, max };
  }, [responses]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Word Cloud</h2>
        <div className="flex items-center gap-2">
          <button onClick={clearAll} className="text-sm text-red-600 hover:underline">Clear</button>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') addResponse(); }}
            placeholder="Type a word or phrase and press Enter"
            className="flex-1 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button onClick={addResponse} className="px-4 py-2 bg-indigo-600 text-white rounded-md">Add</button>
        </div>
        <p className="text-sm text-gray-500 mt-2">Responses are stored locally in your browser. Try entering single words or short phrases.</p>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Top words</h3>
        <div className="flex flex-wrap gap-3">
          {stats.arr.length === 0 && <div className="text-sm text-gray-500">No responses yet</div>}
          {stats.arr.map(([word, count]) => {
            const size = 12 + Math.round((count / stats.max) * 44); // 12-56px
            const opacity = 0.6 + (count / stats.max) * 0.4;
            return (
              <span key={word} title={`${count} responses`} style={{ fontSize: `${size}px`, opacity }} className="inline-block">{word}</span>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Submitted responses</h3>
        <div className="space-y-2">
          {responses.length === 0 && <div className="text-sm text-gray-500">No responses yet</div>}
          {responses.map((r, i) => (
            <div key={i} className="flex items-center justify-between bg-white border rounded p-2">
              <div className="text-sm text-gray-800 truncate">{r}</div>
              <div className="text-xs text-gray-500">{new Date().toLocaleTimeString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
