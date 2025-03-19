import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Appointment() {
  const router = useRouter();

  const CreateAppointment = () => {
    router.push("/CreateAppointment") 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Book an Appointment</Text>
      <Text style={styles.info}>Schedule an appointment with your preferred doctor.</Text>

      {/* Book Appointment Button */}
      <TouchableOpacity style={styles.createAppointment} onPress={CreateAppointment}>
        <Text style={styles.createAppointmentText}>Book an Appointment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  createAppointment: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  createAppointmentText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
