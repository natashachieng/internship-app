import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { SEED, STATUSES } from '../data/seed';

const KEY = 'applications:v1';

// READ from the notebook
async function loadApplications() {
  try {
    const stored = await AsyncStorage.getItem(KEY);
    if (stored == null) return SEED; // first launch: notebook is empty
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : SEED;
  } catch (e) {
    console.error('Failed to load applications', e);
    return SEED; // notebook is garbled: start fresh
  }
}

// WRITE to the notebook
async function saveApplications(applications) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(applications));
  } catch (e) {
    console.error('Failed to save applications', e);
  }
}

const TrackerContext = createContext(null);

export function TrackerProvider({ children }) {
  const [applications, setApplications] = useState([]);
  const [ready, setReady] = useState(false);

  // On launch: read the notebook ONE time
  useEffect(() => {
    loadApplications().then((stored) => {
      setApplications(stored);
      setReady(true);
    });
  }, []);

  // Whenever the list changes: write it down (only after the read is done)
  useEffect(() => {
    if (!ready) return; // don't write until the read has landed
    saveApplications(applications);
  }, [applications, ready]);

  function addApplication(application) {
    setApplications((current) => [...current, application]);
  }

  function advanceStatus(id) {
    setApplications((current) =>
      current.map((a) => {
        if (a.id !== id) return a;
        const nextStatus = STATUSES[STATUSES.indexOf(a.status) + 1];
        return { ...a, status: nextStatus };
      })
    );
  }

  function removeApplication(id) {
    setApplications((current) => current.filter((a) => a.id !== id));
  }

  // Show a spinner until the notebook has been read
  if (!ready) return <ActivityIndicator size="large" />;

  return (
    <TrackerContext.Provider
      value={{ applications, addApplication, advanceStatus, removeApplication }}
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