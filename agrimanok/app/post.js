import { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Screen, Bar, Field, Btn, Radio } from '../src/theme';
import { useApp, CATS } from '../src/store';

export default function Post() {
  const { id } = useLocalSearchParams();
  const { products, saveProduct } = useApp();
  const old = products.find((p) => p.id === id);
  const [name, setName] = useState(old?.name || '');
  const [price, setPrice] = useState(old ? String(old.price) : '');
  const [unit, setUnit] = useState(old?.unit || 'head');
  const [cat, setCat] = useState(old?.cat || 'Native');
  const save = () => {
    const n = Number(price);
    if (name.trim().length < 3) return Alert.alert('Missing name', 'Enter a listing name.');
    if (!n || n <= 0) return Alert.alert('Invalid price', 'Enter a price greater than 0.');
    saveProduct({ id: old?.id, name: name.trim(), price: n, unit: unit.trim() || 'head', cat });
    Alert.alert('Saved', old ? 'Listing updated.' : 'Your listing is now live in the Market.', [{ text: 'OK', onPress: () => router.back() }]);
  };
  return (
    <Screen>
      <Bar title={old ? 'Edit Listing' : 'Post Live Bird Listing'} />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }} keyboardShouldPersistTaps="handled">
        <Field label="Listing name" placeholder="e.g. Darag Native Hens" value={name} onChangeText={setName} />
        <Field label="Price (₱)" keyboardType="numeric" value={price} onChangeText={setPrice} />
        <Field label="Per (head, tray, piece...)" value={unit} onChangeText={setUnit} />
        <Radio opts={CATS.slice(1).map((c) => ({ k: c, label: c }))} val={cat} set={setCat} />
        <Btn label={old ? 'Save Changes' : 'Publish Listing'} icon="check" onPress={save} />
      </ScrollView>
    </Screen>
  );
}
