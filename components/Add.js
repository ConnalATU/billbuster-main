import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,  Dimensions,} from 'react-native';
import Constants from "expo-constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export function Add() {
  const [prediction, setPrediction] = useState('');
  const [week, setWeek] = useState('');
  const [amount, setAmount] = useState('');
  const [company, setCompany] = useState('');
  const [date, setDate] = useState('');

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/energy', { week, amount, company, date });
      alert("Thank you, your data has been submitted, click OK to get next week's usage prediction");
      setPrediction(response.data.prediction.toFixed(0));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Week:</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={week}
        onChangeText={(week) => setWeek(week)}
      />
      <Text style={styles.label}>Amount:</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={amount}
        onChangeText={(amount) => setAmount(amount)}
      />
      <Text style={styles.label}>Company:</Text>
      <TextInput
        style={styles.input}
        value={company}
        onChangeText={(company) => setCompany(company)}
      />
      <Text style={styles.label}>Date:</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={(date) => setDate(date)}
      />



    
<View style={styles.widgets}>
       

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Usage</Text>
      </TouchableOpacity>
      <Text style={styles.prediction}>Predicted Usage For Next Week = {prediction} units, amount is +/- last week</Text>
      <Text style={styles.prediction}>Cost of Usage Based On Average Unit Rate € {prediction * 0.44}</Text>
    
      
    
    
    
    
    </View>
      </View>

    
  );
}

const styles = StyleSheet.create({
  label: {
    color: "#000000",
    margin: 20,
    marginLeft: 0,
    fontSize: 16,
  },
  button: {
    marginTop: 40,
    color: "#ffffff",
    height: 40,
    backgroundColor: "#FFA500",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: "#FFFFFF",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "none",
    height: 40,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 16,
  },
  prediction: {
    color: "#000000",
    margin: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  widgetText: {
    fontSize: 30,
    adjustsFontSizeToFit: true,
    color: "#e71e70",
    padding: 1,
  },
  widgets: {
    backgroundColor: "#f1f4fa",
    height: 0.25 * windowWidth,
    width: 0.9 * windowWidth,
    marginBottom: 0.05 * windowHeight,
    borderStyle: "solid",
    borderColor: "#d9d9d9",
    borderWidth: 0.5,
    borderRadius: 15,
    elevation: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  widget: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 0.02 * windowHeight,
    marginRight: 0.02 * windowHeight,
    marginTop: 0.02 * windowHeight,
  },
});