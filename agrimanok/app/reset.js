import { useEffect, useState } from 'react';
import { View, Pressable, Alert, Linking, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { C, F, T, H, Icon, Btn, Screen, Field, Card } from '../src/theme';

export default function Reset() {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState('sms');
  const [ph, setPh] = useState('917 842 9841');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [pin, setPin] = useState('');
  const [pin2, setPin2] = useState('');
  const [busy, setBusy] = useState(false);
  const [sec, setSec] = useState(54);
  const [err, setErr] = useState('');

  useEffect(() => {
    if (step !== 2) return;
    const i = setInterval(() => setSec((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(i);
  }, [step]);

  const send = () => {
    if (mode === 'sms' ? ph.replace(/\D/g, '').length !== 10 : !/^\S+@\S+\.\S+$/.test(email)) return setErr(mode === 'sms' ? 'Enter a valid 10-digit mobile number.' : 'Enter a valid email address.');
    setErr(''); setBusy(true);
    setTimeout(() => { setBusy(false); setSec(54); setOtp(''); setStep(2); }, 1000);
  };
  const verify = () => (otp.length === 6 ? (setErr(''), setStep(3)) : setErr('Enter the 6-digit code.'));
  const save = () => {
    if (pin.length < 4) return setErr('PIN must be at least 4 digits.');
    if (pin !== pin2) return setErr('PINs do not match.');
    Alert.alert('PIN updated', 'You can now log in with your new PIN.', [{ text: 'Back to Login', onPress: () => router.replace('/login') }]);
  };
  const alt = (via) => { if (sec > 0) return Alert.alert('Please wait', `You can request another code in ${sec}s.`); setSec(54); Alert.alert('Code requested', `A new code is on its way ${via}.`); };
  const back = () => (step > 1 ? (setErr(''), setStep(step - 1)) : router.back());

  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12, gap: 10, backgroundColor: '#fff' }}>
        <Pressable onPress={back} hitSlop={12}><Icon n="arrow-left" /></Pressable>
        <View style={{ flex: 1 }}><H>Reset Password</H><T style={{ fontSize: 11, color: C.sub }}>Recover your account</T></View>
        <Pressable onPress={() => Linking.openURL('tel:+639171234567')}><Icon n="headset" c={C.primary} /></Pressable>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }} keyboardShouldPersistTaps="handled">
        <Card style={{ alignItems: 'center', gap: 8 }}>
          <View style={{ flexDirection: 'row', gap: 6 }}>{[1, 2, 3].map((n) => <View key={n} style={{ width: 56, height: 6, borderRadius: 3, backgroundColor: n <= step ? C.pc : C.high }} />)}</View>
          <T style={{ fontSize: 11, color: C.sub }}>{['1. Verified Contact', '2. Enter OTP', '3. New PIN'][step - 1]}</T>
          <H>{['Verify Account Ownership', 'Enter the 6-digit code', 'Create a new PIN'][step - 1]}</H>
        </Card>

        {step === 1 && (<>
          <View style={{ flexDirection: 'row', backgroundColor: C.high, borderRadius: 10, padding: 4 }}>
            {[['sms', 'Mobile SMS'], ['email', 'Email Address']].map(([k, l]) => (
              <Pressable key={k} onPress={() => { setMode(k); setErr(''); }} style={{ flex: 1, padding: 10, borderRadius: 8, alignItems: 'center', backgroundColor: mode === k ? '#fff' : 'transparent' }}>
                <T style={{ fontFamily: F.b, color: mode === k ? C.primary : C.sub }}>{l}</T>
              </Pressable>
            ))}
          </View>
          {mode === 'sms'
            ? <Field label="Mobile Phone Number" keyboardType="phone-pad" maxLength={12} value={ph} onChangeText={setPh} prefix={<T style={{ fontFamily: F.b, marginRight: 8 }}>🇵🇭 +63</T>} />
            : <Field label="Registered Email Address" autoCapitalize="none" keyboardType="email-address" placeholder="breeder@agrimanok.ph" value={email} onChangeText={setEmail} />}
          <Card style={{ borderLeftWidth: 4, borderLeftColor: C.primary }}><T style={{ fontSize: 12, color: C.sub }}>DA-BAI Biosecurity Level 2 Account Protection: never share your 6-digit OTP with anyone.</T></Card>
          {err ? <T style={{ color: C.err }}>{err}</T> : null}
          <Btn label="Send Verification Code" icon="arrow-right" onPress={send} loading={busy} />
        </>)}

        {step === 2 && (<>
          <T style={{ color: C.sub, textAlign: 'center' }}>Code sent to {mode === 'sms' ? '+63 ' + ph : email}</T>
          <Field placeholder="••••••" keyboardType="number-pad" maxLength={6} value={otp} onChangeText={(v) => setOtp(v.replace(/\D/g, ''))} style={{ fontSize: 24, letterSpacing: 10, textAlign: 'center', fontFamily: F.h }} />
          {err ? <T style={{ color: C.err }}>{err}</T> : null}
          <Btn label="Verify Code" icon="check" onPress={verify} />
          <Card style={{ gap: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><T style={{ fontFamily: F.b }}>Having trouble with SMS?</T><T style={{ color: C.sec, fontFamily: F.b }}>00:{String(sec).padStart(2, '0')}s</T></View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Btn kind="out" label="Via Viber" style={{ flex: 1 }} onPress={() => alt('via Viber')} />
              <Btn kind="out" label="Voice Call" style={{ flex: 1 }} onPress={() => alt('by voice call')} />
            </View>
          </Card>
        </>)}

        {step === 3 && (<>
          <Field label="New PIN" secureTextEntry keyboardType="number-pad" value={pin} onChangeText={setPin} />
          <Field label="Confirm New PIN" secureTextEntry keyboardType="number-pad" value={pin2} onChangeText={setPin2} />
          {err ? <T style={{ color: C.err }}>{err}</T> : null}
          <Btn label="Save New PIN" icon="check" onPress={save} />
        </>)}

        <Pressable onPress={() => router.replace('/login')} style={{ alignItems: 'center', padding: 8 }}><T style={{ color: C.primary, fontFamily: F.b }}>Back to Mobile Login</T></Pressable>
      </ScrollView>
    </Screen>
  );
}
