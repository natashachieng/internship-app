import { Pressable, Text, View } from 'react-native';
import { useTracker } from '../context/TrackerContext';
import { STATUS_COLORS } from '../data/seed';

function ApplicationRow({ application, onAdvance }) {
  const isOffer = application.status === 'offer';

  return (
    <View style={{ paddingVertical: 12 }}>
      <Text style={{ fontWeight: 'bold' }}>{application.company}</Text>
      <Text>{application.role}</Text>
      <Text style={{ color: STATUS_COLORS[application.status] }}>
        {application.status}
      </Text>
      <Pressable
        onPress={() => onAdvance(application.id)}
        disabled={isOffer}
        style={{ opacity: isOffer ? 0.4 : 1 }}
      >
        <Text>Advance</Text>
      </Pressable>
    </View>
  );
}

export default function Tracker() {
  const { applications, advanceStatus } = useTracker();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {applications.map((app) => (
        <ApplicationRow key={app.id} application={app} onAdvance={advanceStatus} />
      ))}
    </View>
  );
}