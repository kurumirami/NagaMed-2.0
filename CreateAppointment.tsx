import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Appointment() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [reason, setReason] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch("https://api.example.com/doctors");
      const data = await response.json();
      if (response.ok) {
        setDoctors(data);
      } else {
        setErrorMessage("Failed to load doctors.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
    }
  };

  const handleBookAppointment = async () => {
    if (!name || !selectedDoctor || !reason) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    setErrorMessage("");

    const appointmentData = {
      name,
      doctor_id: selectedDoctor,
      appointment_date: date.toISOString(),
      reason,
    };

    try {
      const response = await fetch("https://api.example.com/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      });
      
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Your appointment has been booked!");
        router.push("/Home");
      } else {
        setErrorMessage(data.message || "Failed to book appointment.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Your Name</Text>
            <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Select a Doctor</Text>
            <View style={styles.pickerWrapper}>
              <Picker selectedValue={selectedDoctor} onValueChange={setSelectedDoctor}>
                <Picker.Item label="Choose a doctor" value="" />
                {doctors.map((doctor) => (
                  <Picker.Item key={doctor.id} label={doctor.name} value={doctor.id} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity style={styles.datePicker} onPress={() => setShowDatePicker(true)}>
              <Text>{date.toDateString()}</Text>
              <FontAwesome name="calendar" size={20} color="#777" />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker value={date} mode="date" display="default" onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDate(selectedDate);
              }} />
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Reason for Consultation</Text>
            <TextInput style={[styles.input, styles.textArea]} placeholder="Enter reason" value={reason} onChangeText={setReason} multiline />
          </View>

          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <TouchableOpacity style={styles.submitButton} onPress={handleBookAppointment}>
            <Text style={styles.buttonText}>Confirm Appointment</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  formContainer: { flex: 1, justifyContent: "center", paddingHorizontal: 20, gap: 16, marginTop: -50 },
  inputContainer: { gap: 15 },
  label: { fontSize: 16, color: "#333", fontWeight: "500" },
  input: { height: 48, borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 8, paddingHorizontal: 16, fontSize: 16, backgroundColor: "#F5F5F5" },
  textArea: { height: 80 },
  pickerWrapper: { borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 8, backgroundColor: "#F5F5F5" },
  datePicker: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 8, padding: 12, backgroundColor: "#F5F5F5" },
  submitButton: { backgroundColor: "#28B6F6", height: 48, borderRadius: 8, justifyContent: "center", alignItems: "center", marginTop: 24 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  errorText: { color: "red", fontSize: 14, marginTop: 10, textAlign: "center" },
});
