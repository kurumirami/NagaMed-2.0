import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, Stack } from "expo-router";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false); // State for login confirmation
  const router = useRouter();
  
  // Handle Sign-In API Call
  const handleSignIn = async () => {
    console.log("Signing in with:", username, password);
  
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      console.log("Response Data:", data); // 🔍 Check the API response
  
      if (response.ok) {
        if (!data.account_id) {
          console.error("❌ account_id is missing in API response");
          setErrorMessage("Login failed. No account ID found.");
          return;
        }
  
        console.log("Login Successful:", data);
        await AsyncStorage.setItem("account_id", data.account_id.toString());
        setLoginSuccess(true);
      } else {
        console.error("Login Failed:", data);
        setErrorMessage(data.message || "Invalid username or password.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage("Network error. Please try again.");
    }
  };
  

  const handleContinue = () => {
    setLoginSuccess(false);
    router.push("/Home");
  };

  return (
    <>
      <Stack.Screen />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.formContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.naga}>Naga</Text>
            <Text style={styles.med}>Med</Text>
          </View>

          <Text style={styles.sign}>Sign In</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoComplete="username"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => router.push("/ForgotPassword")}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Modal confirmation for successful login */}
      <Modal visible={loginSuccess} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.successText}>You have successfully logged in!</Text>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 16,
    marginTop: -30,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  naga: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#1170B3",
  },
  med: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#82C45C",
  },
  sign: {
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 5,
    color: "#1170B3",
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#F5F5F5",
  },
  signInButton: {
    backgroundColor: "#28B6F6",
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    color: "#28B6F6",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    width: "80%",
  },
  successText: {
    color: "green",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  continueButton: {
    backgroundColor: "#28B6F6",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});
