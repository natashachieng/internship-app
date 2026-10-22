import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SEED, STATUSES, STATUS_COLORS } from '../data/seed';

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
  const [applications, setApplications] = useState(SEED);
  const [company, setCompany] = useState('');
const [role, setRole] = useState('');
const canAdd = company.trim() !== '' && role.trim() !== '';

  function advance(id) {
    setApplications(
      applications.map((a) => {
        if (a.id !== id) return a;
        const nextStatus = STATUSES[STATUSES.indexOf(a.status) + 1];
        return { ...a, status: nextStatus };
      })
    );
  }

  function addApplication() {
  const newApp = {
    id: Date.now().toString(),
    company: company.trim(),
    role: role.trim(),
    status: 'saved',
    appliedOn: new Date().toISOString().slice(0, 10),
    notes: '',
  };
  setApplications([...applications, newApp]);
  setCompany('');
  setRole('');
}

  return (
    <View style={{ flex: 1, padding: 16 }}>
        <TextInput
        placeholder="Company"
        value={company}
        onChangeText={setCompany}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
      <TextInput
        placeholder="Role"
        value={role}
        onChangeText={setRole}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
      <Pressable
        onPress={addApplication}
        disabled={!canAdd}
        style={{ opacity: canAdd ? 1 : 0.4, marginBottom: 16 }}
      >
        <Text>Add</Text>
      </Pressable>
      {applications.map((app) => (
        <ApplicationRow key={app.id} application={app} onAdvance={advance} />
      ))}
    </View>
  );
}