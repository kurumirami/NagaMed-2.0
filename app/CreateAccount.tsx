import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function CreateAccount() {
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignUp = async () => {
    if (!fullname.trim()) {
      Alert.alert("Error", "Full Name is required.");
      return;
    }
    if (!username.trim()) {
      Alert.alert("Error", "Username is required.");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://devapi-618v.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, username, password, type_id: 4 }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Account created successfully! Logging you in...", [
          { text: "OK", onPress: () => loginUser() },
        ]);
      } else {
        Alert.alert("Signup Failed", data.message || "Failed to create account.");
      }
    } catch (error) {
      Alert.alert("Network Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async () => {
    try {
      const response = await fetch("https://devapi-618v.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const loginData = await response.json();

      if (response.ok) {
        Alert.alert("Login Successful", "Welcome to NagaMed!", [
          { text: "OK", onPress: () => router.push("/Home") },
        ]);
      } else {
        Alert.alert("Login Failed", "Account created, but login failed. Please try manually.");
        router.push("/Signin");
      }
    } catch (error) {
      Alert.alert("Login Error", "Network issue. Please try logging in manually.");
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
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
                placeholderTextColor="#999"
                value={fullname}
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
                placeholderTextColor="#999"
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
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                <FontAwesome name={passwordVisible ? "eye-slash" : "eye"} size={20} color="#777" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="**********"
                placeholderTextColor="#999"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!confirmPasswordVisible}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                <FontAwesome name={confirmPasswordVisible ? "eye-slash" : "eye"} size={20} color="#777" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.signUpButton, loading && styles.disabledButton]}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInRedirect} onPress={() => router.push("/Signin")}>
            <Text>
              Already have an account? <Text style={styles.loginText}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  formContainer: { flex: 1, justifyContent: "center", paddingHorizontal: 20, gap: 16, marginTop: -50 },
  logoContainer: { flexDirection: "row", justifyContent: "center" },
  naga: { fontSize: 28, fontWeight: "700", color: "#007bff" },
  med: { fontSize: 28, fontWeight: "700", color: "#28a745" },
  sign: { fontSize: 24, fontWeight: "bold", paddingLeft: 5, color: "#1170B3" },
  inputContainer: { marginBottom: 15 },
  label: { fontSize: 16, color: "#333", fontWeight: "500", marginBottom: 5 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#F5F5F5",
  },
  input: { flex: 1, height: 48, fontSize: 16, paddingHorizontal: 10, color: "#000" },
  signUpButton: { backgroundColor: "#28B6F6", height: 48, borderRadius: 8, justifyContent: "center", alignItems: "center", marginTop: 24 },
  disabledButton: { backgroundColor: "#aaa" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  signInRedirect: { marginTop: 20, alignSelf: "center" },
  loginText: { color: "#007bff", fontWeight: "bold" },
});
