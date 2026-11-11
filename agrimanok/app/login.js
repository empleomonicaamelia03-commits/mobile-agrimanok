import { useState } from 'react';
import { View, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { C, F, T, H, Icon, Btn, Screen, Field, Bar } from '../src/theme';
import { useApp } from '../src/store';

export default function Login() {
  const { setUser } = useApp();
  const [ph, setPh] = useState('');
  const [pin, setPin] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const go = () => {
    if (ph.replace(/\D/g, '').length !== 10) return setErr('Enter a 10-digit mobile number, e.g. 917 123 4567');
    if (pin.length < 4) return setErr('PIN must be at least 4 digits');
    setErr(''); setBusy(true);
    setTimeout(() => { setUser({ name: 'Carlo' }); router.replace('/market'); }, 800);
  };
  return (
    <Screen>
      <Bar title="Breeder Login" sub="Mindanao Safe Trade Hub" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }} keyboardShouldPersistTaps="handled">
          <View style={{ alignItems: 'center', gap: 6, marginVertical: 10 }}>
            <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: C.pc, alignItems: 'center', justifyContent: 'center' }}><Icon n="bird" s={40} c="#fff" /></View>
            <H style={{ fontSize: 22 }}>Maayong pag-abot!</H>
            <T style={{ color: C.sub }}>Log in to post, inquire and book safe meetups.</T>
          </View>
          <Field label="Mobile Number" placeholder="917 123 4567" keyboardType="phone-pad" maxLength={12} value={ph} onChangeText={setPh} prefix={<T style={{ fontFamily: F.b, marginRight: 8 }}>🇵🇭 +63</T>} />
          <Field label="PIN / Password" placeholder="••••" secureTextEntry={!show} keyboardType="number-pad" value={pin} onChangeText={setPin} right={<Pressable onPress={() => setShow(!show)}><Icon n={show ? 'eye-off-outline' : 'eye-outline'} c={C.sub} /></Pressable>} />
          {err ? <T style={{ color: C.err }}>{err}</T> : null}
          <Pressable onPress={() => router.push('/reset')} style={{ alignSelf: 'flex-end' }}><T style={{ color: C.primary, fontFamily: F.b }}>Forgot password?</T></Pressable>
          <Btn label="Log In" icon="login" onPress={go} loading={busy} />
          <Btn kind="out" label="Browse as Guest" onPress={() => { setUser({ guest: true }); router.replace('/market'); }} />
          <T style={{ fontSize: 11, color: C.sub, textAlign: 'center' }}>Demo: any 10-digit number and a 4+ digit PIN.</T>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
