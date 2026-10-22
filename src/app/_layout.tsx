import { Tabs } from 'expo-router';

export default function RootLayout() {
  return (
    <Tabs>
      {/* name must match the filename — "index" is the app's launch screen */}
      <Tabs.Screen name="index" options={{ title: 'Tracker' }} />
      <Tabs.Screen name="add" options={{ title: 'Add' }} />
      <Tabs.Screen name="dashboard" options={{ title: 'Dashboard' }} />
      {/* Period 2, Step 5: restructure this file — see the provider snippet there */}
    </Tabs>
  );
}