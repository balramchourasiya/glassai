import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { CheckCircle, RefreshCw, BarChart3 } from 'lucide-react';

// Real-time poll using BroadcastChannel with localStorage fallback.
const STORAGE_KEY = 'realtime_poll_v1';
const CHANNEL_NAME = 'realtime-poll-channel';

const defaultPoll = {
  title: 'Which area of modern web development interests you most?',
  options: [
    { id: 1, text: 'Frontend Frameworks (React/Vue)', votes: 15 },
    { id: 2, text: 'Backend Development (Node/Python)', votes: 22 },
    { id: 3, text: 'Database Management (SQL/NoSQL)', votes: 35 },
    { id: 4, text: 'DevOps & Cloud (Docker/AWS)', votes: 18 },
  ],
  lastUpdated: Date.now(),
};

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPoll;
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to read poll storage', e);
    return defaultPoll;
  }
}

function writeStorage(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to write poll storage', e);
  }
}

const makeOption = (id, text) => ({ id, text, votes: 0 });

const PollComponent = () => {
  const persisted = readStorage();
  const [poll, setPoll] = useState(persisted);
  const [selected, setSelected] = useState(() => {
    try { return sessionStorage.getItem(`${STORAGE_KEY}:voted`) } catch { return null }
  });

  // Builder-specific state
  const [isEditing, setIsEditing] = useState(!persisted || !persisted.options || persisted.options.length === 0);
  const [titleDraft, setTitleDraft] = useState(persisted.title || '');
  const [optionsDraft, setOptionsDraft] = useState(persisted.options ? persisted.options.map(o => ({ ...o })) : [makeOption(1, ''), makeOption(2, '')]);

  // BroadcastChannel / storage sync
  useEffect(() => {
    let bc;
    const onMessage = (msg) => {
      if (!msg || !msg.data) return;
      const { type, payload } = msg.data;
      if (type === 'update') setPoll(payload);
      if (type === 'reset') setPoll(defaultPoll);
      if (type === 'edit') {
        setIsEditing(true);
        setTitleDraft(payload.title || '');
        setOptionsDraft(payload.options ? payload.options.map(o => ({ ...o })) : []);
      }
    };

    try {
      if ('BroadcastChannel' in window) {
        bc = new BroadcastChannel(CHANNEL_NAME);
        bc.addEventListener('message', onMessage);
      } else {
        window.addEventListener('storage', (e) => {
          if (e.key === STORAGE_KEY && e.newValue) {
            const parsed = JSON.parse(e.newValue);
            setPoll(parsed);
          }
        });
      }
    } catch (e) { console.warn('BC not available', e) }

    return () => { if (bc) bc.removeEventListener('message', onMessage) };
  }, []);

  // Persist poll to storage and broadcast
  useEffect(() => {
    writeStorage(poll);
    try {
      if ('BroadcastChannel' in window) {
        const bc = new BroadcastChannel(CHANNEL_NAME);
        bc.postMessage({ type: 'update', payload: poll });
        bc.close();
      }
    } catch (e) { /* no-op */ }
  }, [poll]);

  const totalVotes = useMemo(() => (poll.options || []).reduce((s, o) => s + (o.votes || 0), 0), [poll.options]);

  // Voting
  const vote = useCallback((id) => {
    if (selected) return; // prevent multi-vote per tab
    const next = { ...poll, options: poll.options.map(o => o.id === id ? { ...o, votes: o.votes + 1 } : o), lastUpdated: Date.now() };
    setPoll(next);
    setSelected(String(id));
    try { sessionStorage.setItem(`${STORAGE_KEY}:voted`, String(id)); } catch {}
  }, [poll, selected]);

  // Builder actions
  const addOptionDraft = () => {
    setOptionsDraft(prev => [...prev, makeOption(prev.length + 1, '')]);
  };
  const removeOptionDraft = (idx) => {
    setOptionsDraft(prev => prev.filter((_, i) => i !== idx).map((o, i) => ({ ...o, id: i + 1 })));
  };
  const updateOptionDraft = (idx, text) => {
    setOptionsDraft(prev => prev.map((o, i) => i === idx ? { ...o, text } : o));
  };

  const startPoll = () => {
    // validation: at least 2 non-empty options
    const cleanOptions = optionsDraft.map(o => ({ ...o, text: String(o.text || '').trim() })).filter(o => o.text.length > 0);
    if (cleanOptions.length < 2) {
      alert('Please provide at least 2 options with text');
      return;
    }
    const numbered = cleanOptions.map((o, i) => ({ id: i + 1, text: o.text, votes: 0 }));
    const next = { title: String(titleDraft || 'Untitled Poll'), options: numbered, lastUpdated: Date.now() };
    setPoll(next);
    setIsEditing(false);
    setSelected(null);
    try { sessionStorage.removeItem(`${STORAGE_KEY}:voted`); } catch {}
    // broadcast edit (so other tabs show edit mode if desired)
    try { if ('BroadcastChannel' in window) { const bc = new BroadcastChannel(CHANNEL_NAME); bc.postMessage({ type: 'update', payload: next }); bc.close(); } } catch {}
  };

  const editPoll = () => {
    setIsEditing(true);
    setTitleDraft(poll.title || '');
    setOptionsDraft(poll.options ? poll.options.map(o => ({ id: o.id, text: o.text })) : [makeOption(1, ''), makeOption(2, '')]);
    try { if ('BroadcastChannel' in window) { const bc = new BroadcastChannel(CHANNEL_NAME); bc.postMessage({ type: 'edit', payload: { title: poll.title, options: poll.options } }); bc.close(); } } catch {}
  };

  const reset = () => {
    const next = defaultPoll;
    setPoll(next);
    setIsEditing(false);
    setTitleDraft(next.title);
    setOptionsDraft(next.options.map(o => ({ ...o })));
    setSelected(null);
    try { sessionStorage.removeItem(`${STORAGE_KEY}:voted`); } catch {}
    try { if ('BroadcastChannel' in window) { const bc = new BroadcastChannel(CHANNEL_NAME); bc.postMessage({ type: 'reset' }); bc.close(); } } catch {}
  };

  // UI: editing / voting
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="w-7 h-7 text-green-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Live Poll</h2>
            <p className="text-sm text-gray-600">Create a poll, then vote. Votes sync across tabs (BroadcastChannel/localStorage).</p>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <label className="block">
              <div className="text-sm font-medium text-gray-700">Poll title</div>
              <input value={titleDraft} onChange={e => setTitleDraft(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
            </label>

            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700">Options</div>
              {optionsDraft.map((opt, idx) => (
                <div key={idx} className="flex gap-2">
                  <input value={opt.text} onChange={e => updateOptionDraft(idx, e.target.value)} className="flex-1 rounded-md border-gray-300 p-2" placeholder={`Option ${idx + 1}`} />
                  <button onClick={() => removeOptionDraft(idx)} disabled={optionsDraft.length <= 2} className="px-3 rounded bg-red-100 text-red-700">Remove</button>
                </div>
              ))}

              <div>
                <button onClick={addOptionDraft} className="px-3 py-1 rounded bg-green-100 text-green-800">Add option</button>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={reset} className="px-3 py-2 rounded bg-gray-200">Reset to default</button>
              <button onClick={startPoll} className="px-4 py-2 rounded bg-green-600 text-white">Start Poll</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-3">
              <h3 className="text-xl font-semibold text-gray-800">{poll.title}</h3>
              <p className="text-sm text-gray-500">Total votes: {totalVotes}</p>
            </div>

            <div className="space-y-3">
              {poll.options.map(opt => {
                const pct = totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100);
                const isSelected = selected === String(opt.id);
                const locked = selected !== null;

                return (
                  <div key={opt.id} className="relative">
                    <button
                      onClick={() => vote(opt.id)}
                      disabled={locked}
                      className={`w-full text-left p-3 rounded-md border-2 flex items-center justify-between ${isSelected ? 'bg-green-600 text-white border-green-700' : locked ? 'bg-gray-50 text-gray-500 border-gray-200' : 'bg-white text-gray-800 hover:bg-green-50'}`}>
                      <span className="font-medium">{opt.text}</span>
                      <span className="text-sm text-gray-700">{opt.votes}</span>
                    </button>

                    {locked && (
                      <div className="absolute inset-0 pointer-events-none rounded-md">
                        <div style={{ width: `${pct}%` }} className="h-full bg-green-200 rounded-md opacity-70 transition-all" />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-700">{pct}%</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button onClick={editPoll} className="px-3 py-2 rounded bg-yellow-100">Edit Poll</button>
              <button onClick={reset} className="px-3 py-2 rounded bg-gray-200">Reset</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PollComponent;
