import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Appointment() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.naga}>Naga <Text style={styles.med} >Med</Text></Text>
      <Text style={styles.info}>Schedule and manage your appointments.</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Book an Appointment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "space-between", alignItems: "center", backgroundColor: "#f9f9f9" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  info: { fontSize: 16, color: "#666", marginBottom: 20 },
  button: { backgroundColor: "blue", padding: 15, borderRadius: 8 },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  NavBar: { flexDirection: "row", justifyContent: "space-around", position: "absolute", bottom: 0, width: "100%", backgroundColor: "#fff", paddingVertical: 10, borderTopWidth: 1, borderTopColor: "#ccc" },
  navButton: { paddingVertical: 10, paddingHorizontal: 15 },
  navText: { fontSize: 16, fontWeight: "bold", color: "#333" },
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
});
