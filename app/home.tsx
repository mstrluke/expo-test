import { useLogoutMutation } from '@/api/queries';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Home: React.FC = () => {
  const { setUser, setSignedIn } = useAuth();
  const { mutate: logout, isPending } = useLogoutMutation();

  const handleLogout = () => {
    setSignedIn(false);
    setUser(null);
    logout();
  };

  return (
    <ThemedView style={{ backgroundColor: '#fff', flex: 1 }}>
      <ThemedView style={styles.content}>
        <Text style={styles.textCenter}>Home Screen</Text>
        <Button title="Sign Out" onPress={handleLogout} disabled={isPending} />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 'auto',
    marginBottom: 'auto',
    textAlign: 'center'
  },
  textCenter: { textAlign: 'center' },
});

export default Home;
