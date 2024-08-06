import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, StyleSheet, TextInput } from 'react-native';
import { useLoginMutation } from '../../api/queries';

function Login() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { mutate: login, isPending, error } = useLoginMutation();

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Login</ThemedText>
      </ThemedView>
      <ThemedText style={styles.desc}>This app includes example code to help you get started.</ThemedText>
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
        {errors.email && <ThemedText style={styles.errorText}>{errors.email.message}</ThemedText>}
        
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
        {errors.password && <ThemedText style={styles.errorText}>{errors.password.message}</ThemedText>}
        
        <Button title="Submit" onPress={handleSubmit(onSubmit)} disabled={isPending} />
        {error && <ThemedText style={styles.errorText}>{error.message}</ThemedText>}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  desc: {
    textAlign: 'center',
  },
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
});

export default Login;
