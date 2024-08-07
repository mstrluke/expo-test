import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import { useSignupMutation } from '../api/queries';
import { Link, router } from 'expo-router';

function Signup() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { mutateAsync: signup, isPending, error } = useSignupMutation();

  const onSubmit = async (data: any) => {
    try {
      const res = await signup(data);

      router.push('/')
    } catch (err) {
      console.warn('signup', JSON.stringify(err));
    }
  };

  return (
    <ThemedView style={{ backgroundColor: '#fff', flex: 1 }}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.textCenter}>Signup</ThemedText>
        <ThemedView style={styles.formContainer}>
          <Controller
            control={control}
            name="email"
            rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email address' } }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.email && styles.errorInput]}
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.email && <ThemedText style={styles.errorText}>{errors.email.message as string}</ThemedText>}

          <Controller
            control={control}
            name="password"
            rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.password && styles.errorInput]}
                placeholder="Password"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.password && <ThemedText style={styles.errorText}>{errors.password.message as string}</ThemedText>}

          <Pressable style={styles.button} onPress={handleSubmit(onSubmit)} disabled={isPending}>
            <ThemedText style={styles.buttonText}>Submit</ThemedText>
          </Pressable>
          {error && <ThemedText style={styles.errorTextCentered}>{error.message}</ThemedText>}
          <ThemedText style={styles.textCenter}>or</ThemedText>
          <Link href="/" style={styles.textCenter}>Sign In</Link>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 'auto',
    marginBottom: 'auto',
    textAlign: 'center'
  },
  button: {
    borderRadius: 6,
    backgroundColor: '#52a9ff',
  },
  buttonText: { color: '#fff', padding: 8, textAlign: 'center' },
  textCenter: { textAlign: 'center' },
  formContainer: {
    margin: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  errorTextCentered: {
    color: 'red',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Signup;
