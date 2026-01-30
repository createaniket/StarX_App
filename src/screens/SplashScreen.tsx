import React, { useEffect } from "react";
import { View, Image, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home"); // ya "Login"
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/splashstarx.jpeg")}
        style={styles.logo}
        resizeMode="contain"   // 🔥 Full screen cover
      />

      <ActivityIndicator size="large" color="#fff" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    width: width,
    height: height,
    position: "absolute", // 🔥 background banane ke liye
  },

  loader: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
  },
});
