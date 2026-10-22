import { Tabs } from 'expo-router';
import { TrackerProvider, useTracker } from '../context/TrackerContext';

// INNER: sits inside the provider, so useTracker() works here
function AppTabs() {
  const { applications } = useTracker();
  const countSaved = applications.filter((a) => a.status === 'saved').length;

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: 'Tracker', tabBarBadge: countSaved }}
      />
      <Tabs.Screen name="add" options={{ title: 'Add' }} />
      <Tabs.Screen name="dashboard" options={{ title: 'Dashboard' }} />
    </Tabs>
  );
}

// OUTER: holds the shared list
export default function RootLayout() {
  return (
    <TrackerProvider>
      <AppTabs />
    </TrackerProvider>
  );
}