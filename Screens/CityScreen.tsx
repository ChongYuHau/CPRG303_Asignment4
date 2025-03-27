import React from "react";
import { View, Text, TouchableOpacity, Image, Linking, StyleSheet } from "react-native";

type CityScreenProps = {
  city: string;
  link: string;
};

const CityScreen: React.FC<CityScreenProps> = ({ city, link }) => {
  return (
    <View style={styles.container}>
      {/* City Title */}
      <Text style={styles.title}>{city}</Text>

      {/* City Image */}
      <Image
        source={{
          uri: city === "Calgary"
            ? "https://media.istockphoto.com/id/1162026681/photo/calgary-stampede.jpg?s=612x612&w=0&k=20&c=OB_UoV2549MhwH9X807JNqZG0Dekh7_CyGd8ZpwAxW4="
            : "https://i.pinimg.com/736x/89/32/55/893255f9793e68f2880d5d5a3c595700.jpg"
        }}
        style={styles.image}
      />

      {/* Button to City Page */}
      <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(link)}>
        <Text style={styles.buttonText}>Go to city page</Text>
      </TouchableOpacity>

      {/* City Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.info}>
          {city === "Calgary"
            ? "Calgary is known for its annual Stampede and beautiful mountain views."
            : "Edmonton is famous for its river valley and West Edmonton Mall."}
        </Text>
      </View>
    </View>
  );
};

export default CityScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20, 
    backgroundColor: "#FFFFFF",
  },
  title: { 
    fontSize: 30, 
    fontWeight: "bold", 
    color: "#87CEFA",
    textAlign: "center", 
    marginBottom: 20,
  },
  image: {
    width: 300, 
    height: 200, 
    marginBottom: 10,
    borderRadius: 10,
  },
  infoContainer: {
    marginTop: 20, 
    paddingHorizontal: 10,
  },
  info: {
    fontSize: 16, 
    fontWeight: "600",
    textAlign: "center", 
    color: "#FFA500",
  },
  button: { 
    backgroundColor: "#FFFFFF", 
    paddingVertical: 12, 
    paddingHorizontal: 30, 
    borderRadius: 8, 
    marginTop: 20, 
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#87CEFA", 
    elevation: 5, 
    shadowColor: "#87CEFA", 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#FFA500", 
    fontSize: 18, 
    fontWeight: "bold", 
  },
});
