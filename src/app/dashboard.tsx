import { Text, View } from 'react-native';
import { useTracker } from '../context/TrackerContext';
import { STATUSES, STATUS_COLORS } from '../data/seed';

export default function Dashboard() {
  const { applications } = useTracker();

  // Derived, not stored: recounted from the shared list every render
  const counts = STATUSES.map((status) => ({
    status,
    count: applications.filter((a) => a.status === status).length,
  }));

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 16 }}>
        {applications.length} applications tracked
      </Text>
      {counts.map(({ status, count }) => (
        <View key={status} style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 40, fontWeight: 'bold', color: STATUS_COLORS[status] }}>
            {count}
          </Text>
          <Text>{status}</Text>
        </View>
      ))}
    </View>
  );
}