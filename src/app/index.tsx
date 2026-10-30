import { Pressable, Text, View } from 'react-native';
import { useTracker } from '../context/TrackerContext';
import { STATUS_COLORS } from '../data/seed';

function ApplicationRow({ application, onAdvance, onDelete }) {
  const isOffer = application.status === 'offer';

  return (
    <View style={{ paddingVertical: 12 }}>
      <Text style={{ fontWeight: 'bold' }}>{application.company}</Text>
      <Text>{application.role}</Text>
      <Text style={{ color: STATUS_COLORS[application.status] }}>
        {application.status}
      </Text>
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <Pressable
          onPress={() => onAdvance(application.id)}
          disabled={isOffer}
          style={{ opacity: isOffer ? 0.4 : 1 }}
        >
          <Text>Advance</Text>
        </Pressable>
        <Pressable onPress={() => onDelete(application.id)}>
          <Text>✕</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function Tracker() {
  const { applications, advanceStatus, removeApplication } = useTracker();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {applications.map((app) => (
        <ApplicationRow
          key={app.id}
          application={app}
          onAdvance={advanceStatus}
          onDelete={removeApplication}
        />
      ))}
    </View>
  );
}