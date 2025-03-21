import { View, Text, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Image, TextInput } from "react-native";

export default function Appointment() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }} 
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ padding: 15,paddingBottom: 50 }}>
          {/* Profile Section */}
          <View style={styles.profileContainer}>
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} />
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>Hello, </Text>
              <Text style={styles.username}>username</Text>
            </View>
          </View>

          <View style={styles.searchContainer}>
  <TextInput 
    placeholder="Search Doctor, Health Issues" 
    style={styles.searchInput}
  />
  <FontAwesome5 name="search" size={12} color="#00000080" />
</View>


          {/* Boxes Section */}
          <View style={styles.boxRow}>
            <View style={styles.boxOne}>
              <Text style={styles.boxtxt}>Online Consultation</Text>
              <TouchableOpacity style={styles.button}><Text style={styles.boxsubtxt}>Find Doctors</Text></TouchableOpacity>
            </View>
            <View style={styles.boxTwo}>
              <Text style={styles.boxtxt}>Nearby Clinics in Naga City</Text>
              <TouchableOpacity style={styles.button}><Text style={styles.boxsubtxt}>Find Clinics</Text></TouchableOpacity>
            </View>
          </View>

          {/* Upcoming Appointment Section */}
          <View style={styles.header2}>
            <Text style={styles.header2txt}>Upcoming Appointment</Text>
            <Text style={styles.header2subtxt}>View all</Text>
          </View>

          {/* Appointment Card */}
          <View style={styles.card}>
            <View style={styles.upperSection}>
              <View style={styles.imageBox} />
              <View style={styles.details}>
                <Text style={styles.doctorName}>Dr. "Name of Doctor"</Text>
                <Text style={styles.specialty}>"Specialty"</Text>
              </View>
              <Text style={styles.status}>● Online</Text>
            </View>

            <View style={styles.scheduleBox}>
              <View style={styles.scheduleItem}>
                <FontAwesome5 name="calendar" size={14} color="#000000B2" />
                <Text style={styles.scheduleText}>Mon. 00, 2025</Text>
              </View>
              <View style={styles.scheduleItem}>
                <FontAwesome5 name="clock" size={14} color="#000000B2" />
                <Text style={styles.scheduleText}>XX:XX AM</Text>
              </View>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.rescheduleButton}>
                <Text style={styles.btntxt2}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.btntxt3}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Create New Appointment Button */}
          <TouchableOpacity style={styles.createButton} onPress={() => router.push("/CreateAppointment")}>
            <Text style={styles.createButtonText}>Create New</Text>
            <FontAwesome5 name="plus" size={15} color="#FEF7FF" />
          </TouchableOpacity>

          {/* Extra Padding to Ensure Scroll */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  btn: {
      backgroundColor: "#28B6F6",
      padding: 20,
      borderRadius: 10,
      width: "90%",
      alignSelf: "center",
      marginTop: 10,
  },
  btntxt: {
      color: "white",
      fontFamily: "Inter",
      fontSize: 16,
      textAlign: "center",
      fontWeight: "600",
  },
  header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: 7,
      marginTop: 20,
  },
  appname: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  profileContainer: {
      alignItems: 'center',
      marginBottom: 20,
      marginTop: 10,
  },
  profileImage: {
      width: 90,
      height: 90,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: '#D6EEF9',
      marginBottom: 10,
      color: '#D6EEF9',
  },
  greetingContainer: {
      flexDirection: 'row',
  },
  greeting: {
      fontSize: 17,
      fontWeight: '400',
  },
  username: {
      color: '#1170B3',
      fontWeight: '500',
      fontFamily: 'Poppins',
      fontSize: 17,
  },
  addressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
  },
  address: {
      marginLeft: 5,
      color: '#000000',
      fontFamily: 'Poppins',
      fontSize: 12,
      fontWeight: '500',
  },
  searchContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  borderRadius: 25,
  width: '90%',  // Make it take more width
  alignSelf: 'center', // Center it horizontally
  paddingHorizontal: 15,
  paddingVertical: 10,
  borderWidth: 0.5,
  borderColor: '#00000080',
  marginVertical: 15, 
},
  searchInput: {
  flex: 1,
  fontFamily: 'Poppins',
  fontWeight: '500',
  color: '#00000080',
  fontSize: 14,
  textAlign: 'left', 
},
  boxRow: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
  },
  boxOne: {
      flex: 1,
      backgroundColor: '#D6EEF9',
      height: 130,
      borderRadius: 23,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 5,
      shadowColor: '#00000040',
      shadowOffset: {
          width: 0,
          height: 2
      },
      shadowOpacity: 0.5,
  },
  boxTwo: {
      flex: 1,
      backgroundColor: '#C0F6A1',
      height: 130,
      borderRadius: 23,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 5,
      shadowColor: '#00000040',
      shadowOffset: {
          width: 0,
          height: 2
      },
      shadowOpacity: 0.5,
  },
  boxtxt: {
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 17,
      padding: 20,
      textAlign: 'left',
      alignSelf: 'flex-start',
      width: '100%',
      paddingLeft: 15,
      marginTop: 5,
  },
  button: {
      width: 115,
      height: 24,
      borderWidth: 0.5,
      borderRadius: 13,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 'auto',
      backgroundColor: '#ffffff',
      marginBottom: 20,
  },
  boxsubtxt: {
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 10,
  },
  header2txt: {
      fontFamily: 'Poppins',
      fontWeight: "500",
      fontSize: 20,
      marginTop: 15,
  },
  header2subtxt: {
      fontFamily: 'Poppins',
      fontSize: 12,
      color: '#0288D0',
      fontWeight: "500",
      marginTop: 20,
  },
  header2: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      // width: '100%',
      gap: 130,
      marginTop: 5,
  },
  card: {
      backgroundColor: '#F1F1F1B2',
      width: '80%',
      height: "25%",
      borderRadius: 14,
      alignSelf: 'center',
      shadowColor: '#00000040',
      shadowOffset: {
          width: 0,
          height: 4
      },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
      marginTop: 10,
  },
  upperSection: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
  },
  imageBox: {
      width: 80,
      height: 80,
      backgroundColor: '#ccc',
      borderRadius: 10,
      marginRight: 10,
  },
  details: {
      flex: 1,
  },
  doctorName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
  },
  specialty: {
      fontSize: 12,
      color: 'gray',
      marginLeft: 40,
  },
  status: {
      color: '#34A853',
      fontWeight: 'bold',
      position: 'absolute',
      top: 10,
      right: 10,
      fontSize: 8,
  },
  
  scheduleBox: {
      backgroundColor: '#28B6F6',
      width: '100%',
      height: 25,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      marginBottom: 10,
  },
  scheduleItem: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  scheduleText: {
      color: '#00000099',
      marginLeft: 5,
      fontSize: 12,
      fontFamily: 'Poppins',
      fontWeight: '600',
  },
  buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginBottom: 10,
  },
  rescheduleButton: {
      flex: 1,
      maxWidth: "40%",
      height: 24,
      borderWidth: 0.5,
      borderRadius: 23,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      marginHorizontal: 5,
  },
  cancelButton: {
      flex: 1,
      maxWidth: "40%",
      height: 24,
      borderWidth: 0.5,
      borderRadius: 23,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1170B3',
      marginHorizontal: 5,
  },
  
  btntxt2: {
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 12,
      color: '#1170B3',
  },
  btntxt3: {
      fontFamily: 'Poppins',
      fontWeight: '500',
      fontSize: 12,
      color: '#ffffff',
  },
  createButton: {
      width: '55%',
      height: '8%',
      borderRadius: 12,
      backgroundColor: '#82C45C',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: 20,
  },
  createButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'Poppins',
  },
 
  boxImage: {
      width: '70%',
      height: '70%',
      resizeMode: 'contain',
      alignSelf: 'center',
      marginTop: 15,
  },
});
