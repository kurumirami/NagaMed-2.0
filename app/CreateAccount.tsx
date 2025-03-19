import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function CreateAccount() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    setErrorMessage("");
  
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, username, password }),
      });
  
      const text = await response.text(); // Get raw response
      console.log("Raw Response:", text);
  
      let data;
      try {
        data = JSON.parse(text); // Parse JSON safely
      } catch (e) {
        console.error("Failed to parse JSON:", e);
        setErrorMessage("Unexpected server response.");
        return;
      }
  
      console.log("Response Status:", response.status);
      console.log("Response Data:", data);
  
      if (response.ok) {
        console.log("Account created successfully:", data);
        router.push("/Signin");
      } else {
        setErrorMessage(data.message || "Failed to create account.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setErrorMessage("Network error. Please try again.");
    }
  };
  
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.formContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.naga}>Naga</Text>
            <Text style={styles.med}> Med</Text>
          </View>

          <Text style={styles.sign}>Sign up</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoComplete="username"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Create a password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="**********"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                style={styles.eyeIcon}
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <FontAwesome
                  name={passwordVisible ? 'eye-slash' : 'eye'}
                  size={20}
                  color="#777"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="**********"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!confirmPasswordVisible}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                style={styles.eyeIcon}
                onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              >
                <FontAwesome
                  name={confirmPasswordVisible ? 'eye-slash' : 'eye'}
                  size={20}
                  color="#777"
                />
              </TouchableOpacity>
            </View>
          </View>

          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <TouchableOpacity 
            style={styles.signUpButton}
            onPress={handleSignUp}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.signInRedirect}
            onPress={() => router.push('/Signin')}
          >
            <Text>
              Already have an account? <Text >Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 16,
    marginTop: -50,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  naga: {
    fontSize: 28,
    fontWeight: '700',
    color: '#007bff',
  },
  med: {
    fontSize: 28,
    fontWeight: '700',
    color: '#28a745',
  },
  sign: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 5,
    color: '#1170B3',
  },
  inputContainer: {
    gap: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  signUpButton: {
    backgroundColor: '#28B6F6',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  signInRedirect: {
    marginTop: 20,
    alignSelf: 'center',
  },
});
