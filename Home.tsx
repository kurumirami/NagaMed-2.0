import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";



export default function Home() {
  const fullname = "User"; // Replace this with actual user data

  const menuItems = [
    { text: "Book Appointment", image: require("../assets/images/bookappointments.png"), path: "/Appointment" },
    { text: "Health Records", image: require("../assets/images/healthrecords.png"), path: "/Status" },
    { text: "Consult Doctor", image: require("../assets/images/consultdoctor.png"), path: "/Doctors" }
  ];
  
  const appointments = [
    {
      doctor: "Dr. Marlo Aquino",
      status: "Appointment confirmed on January 4 at 09:00 AM."
    },
    {
      doctor: "Dr. Marlo Aquino",
      status: "Appointment request pending for approval."
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.hr} />
      <Text style={styles.pt1}>Good day, {fullname}!</Text>
      <View style={styles.pt2}>
        {menuItems.map((item, index) => (
          <Link key={index} href={item.path} asChild>
            <TouchableOpacity style={styles.boxWrapper} activeOpacity={0.7}>
              <View style={styles.box}>
                <Image source={item.image} style={styles.boxImage} />
              </View>
              <Text style={styles.boxText}>{item.text}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
      <View style={styles.header2}>
        <Text style={styles.header2txt}>Upcoming Appointment</Text>
        <Text style={styles.header2subtxt}>View all</Text>
      </View>
      <View style={styles.hr} />
      <View style={styles.horizontalBoxWrapper}>
        {appointments.map((appt, index) => (
          <View key={index} style={styles.horizontalBox}>
            <Text style={styles.maintext}>{appt.doctor}</Text>
            <Text style={styles.subtext}>{appt.status}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.header3txt}>Health Tips & News</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 15,
  },
  hr: {
    borderBottomColor: "#00000080",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  pt1: {
    fontFamily: "Poppins",
    fontSize: 20,
    fontWeight: "700",
  },
  pt2: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  box: {
    width: 110,
    height: 110,
    backgroundColor: "#A7EC80",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  boxWrapper: {
    alignItems: "center",
  },
  boxText: {
    marginTop: 10,
    fontSize: 15,
    fontFamily: "Poppins",
    fontWeight: "600",
  },
  boxImage: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
  },
  header2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header2txt: {
    fontFamily: "Poppins",
    fontSize: 20,
    fontWeight: "500",
  },
  header2subtxt: {
    fontFamily: "Poppins",
    fontSize: 12,
    color: "#0288D0",
    fontWeight: "500",
  },
  horizontalBoxWrapper: {
    gap: 10,
  },
  horizontalBox: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#00000099",
    elevation: 4,
  },
  maintext: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "500",
  },
  subtext: {
    fontFamily: "Poppins",
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "500",
  },
  header3txt: {
    fontFamily: "Poppins",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 15,
  },
});
