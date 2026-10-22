import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useTracker } from '../context/TrackerContext';

export default function Add() {
  const { addApplication } = useTracker();

  // the form's notepad stays LOCAL to this screen
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const canAdd = company.trim() !== '' && role.trim() !== '';

  function handleAdd() {
    addApplication({
      id: Date.now().toString(),
      company: company.trim(),
      role: role.trim(),
      status: 'saved',
      appliedOn: new Date().toISOString().slice(0, 10),
      notes: '',
    });
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
        onPress={handleAdd}
        disabled={!canAdd}
        style={{ opacity: canAdd ? 1 : 0.4 }}
      >
        <Text>Add</Text>
      </Pressable>
      {!canAdd && <Text>Both fields are required.</Text>}
    </View>
  );
}