import { createContext, useContext, useState } from 'react';
import { SEED, STATUSES } from '../data/seed';

const TrackerContext = createContext(null);

export function TrackerProvider({ children }) {
  const [applications, setApplications] = useState(SEED);

  function addApplication(application) {
    setApplications([...applications, application]);
  }

  function advanceStatus(id) {
    setApplications(
      applications.map((a) => {
        if (a.id !== id) return a;
        const nextStatus = STATUSES[STATUSES.indexOf(a.status) + 1];
        return { ...a, status: nextStatus };
      })
    );
  }

  return (
    <TrackerContext.Provider
      value={{ applications, addApplication, advanceStatus }}
    >
      {children}
    </TrackerContext.Provider>
  );
}

export function useTracker() {
  const value = useContext(TrackerContext);
  if (!value) {
    throw new Error('useTracker must be used inside <TrackerProvider>');
  }
  return value;
}