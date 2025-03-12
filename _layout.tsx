import { Stack, useRouter, useSegments } from "expo-router";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

export default function Layout() {
  const router = useRouter();
  const segments = useSegments();

  // Hide navbar & header
  const hideNavBar =
    segments.length === 0 ||
    segments[0] === "Signin" ||
    segments[0] === "CreateAccount" ||
    segments[0] === "ForgotPassword";

  const isHome = segments.length === 0 || segments[0] === "Home";

  return (
    <View style={styles.container}>
      {!hideNavBar && (
        <View style={styles.header}>
    
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => (isHome ? console.log("Open Notifications") : router.back())}
          >
            <Ionicons
              name={isHome ? "notifications-outline" : "arrow-back"}
              size={30}
              color={isHome ? "blue" : "black"}
            />
          </TouchableOpacity>

          
          <Text style={styles.headerText}>
            Naga <Text style={styles.med}>Med</Text>
          </Text>

          {/* Placeholder for spacing balance or future icon */}
          <View style={styles.iconPlaceholder} />
        </View>
      )}

      {/* Stack Navigation */}
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

      {/* Bottom Navigation Bar */}
      {!hideNavBar && (
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navButton} onPress={() => router.push("/Home")}>
            <FontAwesome5 name="home" size={20} color="#333" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => router.push("/Appointment")}>
            <FontAwesome5 name="calendar-alt" size={20} color="#333" />
            <Text style={styles.navText}>Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => router.push("/Doctors")}>
            <FontAwesome5 name="user-md" size={20} color="#333" />
            <Text style={styles.navText}>Doctor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => router.push("/Status")}>
            <FontAwesome5 name="chart-line" size={20} color="#333" />
            <Text style={styles.navText}>Status</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => router.push("/Profile")}>
            <FontAwesome5 name="user" size={20} color="#333" />
            <Text style={styles.navText}>Profile</Text>
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
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#007bff",
  },
  med: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#28a745",
  },
  iconButton: {
    padding: 10,
  },
  iconPlaceholder: {
    width: 40, // Keeps layout balanced when no icon on the right
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
    fontSize: 10,
    fontWeight: "bold",
    color: "#333",
  },
});
