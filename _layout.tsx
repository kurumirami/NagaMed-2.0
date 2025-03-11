import { Stack, useRouter, useSegments } from "expo-router";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; 

export default function Layout() {
  const router = useRouter();
  const segments = useSegments();
  const hideNavBar = segments.length === 0 || segments[0] === "Signin" || segments[0] === "CreateAccount" || segments[0] === "ForgotPassword";



  return (
    <View style={styles.container}>
      {/* Stack Navigation (Manages Screen Changes) */}
      <View style={styles.content}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Index" />
          <Stack.Screen name="Signin" />
          <Stack.Screen name="Home" />
          <Stack.Screen name="Profile" />
          <Stack.Screen name="Appointment" />
          <Stack.Screen name="Doctors" />
          <Stack.Screen name="Status" />
        </Stack>
      </View>

      {!hideNavBar && (
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navButton} onPress={() => router.push("/Home")}>
            <FontAwesome5 name="home" size={20} color="#333" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => router.push("/Appointment")}>
            <FontAwesome5 name="calendar-alt" size={20} color="#333" />
            <Text style={styles.navText}>Appoint</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => router.push("/Doctors")}>
            <FontAwesome5 name="user-md" size={20} color="#333" />
            <Text style={styles.navText}>Doc</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => router.push("/Status")}>
            <FontAwesome5 name="chart-line" size={20} color="#333" />
            <Text style={styles.navText}>Stat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => router.push("/Profile")}>
            <FontAwesome5 name="user" size={20} color="#333" />
            <Text style={styles.navText}>Prof</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1, // Ensures screen content takes full height above the navbar
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#82C45C",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  navText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
});
