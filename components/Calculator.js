import React, { useState } from "react";

import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Dimensions,
  Button,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const Calculator = ({ navigation, route }) => {
  const [rate, setRate] = useState("");
  const [wattage, setWattage] = useState("");
  const [cost, setCost] = useState(0);

  const handleSubmit = () => {
    const usage = (1 * route.params.w) / 1000;

    setCost(rate * usage);
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text
          style={{
            color: "#f2f1f2",
            fontSize: 50,
            fontWeight: "bold",
            textDecorationLine: "underline",
          }}
        >
          {route.params.a}
        </Text>
      </View>

      <View style={styles.btnBox}>
        <View style={styles.btnStyle}>
          <Text style={styles.buttonText}>Average wattage consumption</Text>

          <Text style={styles.buttonText}>{route.params.w} W</Text>
          <Text style={styles.label}>Enter Kw rate</Text>

          <TextInput
            placeholder="20 (price in cents)"
            style={styles.input}
            value={rate}
            onChangeText={(text) => setRate(text)}
            keyboardType="numeric"
          />

          <View style={styles.widgets}>
            <Text style={styles.label}>
              {parseFloat(cost.toFixed(2))} &euro;{" "}
            </Text>
            <Text style={styles.label}> per hour used</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}> Calculate </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Calculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f1f2",
  },

  box: {
    flex: 1,
    backgroundColor: "#e71e70",
    alignItems: "center",
    justifyContent: "center",
  },

  btnBox: {
    paddingTop: 50,
    flex: 2,
  },
  btnStyle: {
    flex: 1,

    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#f2f1f2",
    borderColor: "none",
    height: 40,
    width: "80%",
    padding: 10,
    borderRadius: 4,
    borderStyle: "solid",
    borderColor: "grey",
    borderWidth: 1,
    textAlign: "center",
  },
  label: {
    alignSelf: "stretch",
    textAlign: "center",
    color: "#e71e70",
    margin: 10,
    marginLeft: 0,
    fontSize: 20,
    textTransform: "uppercase",
  },
  button: {
    margin: 5,

    backgroundColor: "#f2f1f2",
    padding: 5,
    width: "50%",
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "black",
  },
  buttonText: {
    alignSelf: "stretch",
    textAlign: "center",
    color: "#e71e70",
    fontSize: 20,
    textTransform: "uppercase",
    padding: 5,
  },
  widgets: {
    marginTop: 20,
    backgroundColor: "#f1f4fa",
    height: 0.25 * windowWidth,
    width: 0.5 * windowWidth,
    marginBottom: 0.05 * windowHeight,
    borderStyle: "solid",
    borderColor: "#d9d9d9",
    borderWidth: 0.5,
    borderRadius: 15,
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
