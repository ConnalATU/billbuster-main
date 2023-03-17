import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Image,
  Platform,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Constants from "expo-constants";
import { firebase } from "../config";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { db } from "../config";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default () => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fname: "",
      address: "",
      phone: "",
      email: "",
    },
  });

  const [email, setEmail] = useState("");
  const [fname, setfname] = useState("");
  const [address, setAddress] = useState("");

  const [phone, setPhone] = useState("");

  const db = getFirestore();

  function onSubmit() {
    addDoc(collection(db, "form"), {
      fname: fname,
      address: address,
      phone: phone,
      email: email,
    })
      .then(() => {
        // Data saved successfully!
        console.log("data submitted");

        alert("Your information has been sent!");

        // <Lightbox renderContent={()=> {
        //   return(
        //     <Image
        //      source={require('bbLogo,jpg')}
        //      style={{ width: 80, height: 80 }}
        //      resizeMode='center'
        //     />
        //   )
        // }}>
        //  <Image
        //    source={require('bbLogo.jpg')}
        //    style={{ width: 80, height: 80 }}
        //    resizeMode='center'
        //  />
        // </Lightbox>
      })
      .catch((error) => {
        // The write failed...
        console.log(error);
      });
  }

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  console.log("errors", errors);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Image
            style={{ resizeMode: "contain", width: "100%", height: "100%" }}
            source={require("../assets/form.png")}
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={styles.label}>First name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(fname) => setfname(fname)}
          />
        </View>
        <Text style={styles.label}>Last name</Text>

        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input}
            onChangeText={(address) => setAddress(address)}
          />
        </View>

        <Text style={styles.label}>Address</Text>

        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input}
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <Text style={styles.label}>Phone No</Text>

        <View style={{ alignItems: "center" }}>
          <TextInput
            style={styles.input}
            onChangeText={(phone) => setPhone(phone)}
            name="phone"
          />
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 0.03 * windowHeight,
                width: 0.8 * windowWidth,
                color: "#f2f1f2",
                backgroundColor: "#e71e70",
                padding: 0.01 * windowHeight,
                borderRadius: 0.01 * windowHeight,
                eborderStyle: "solid",
                borderColor: "grey",
                borderWidth: 0.5,
                textAlign: "center",
              }}
            >
              Proceed
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "#e71e70",
    margin: 10,
    marginLeft: 0.1 * windowWidth,
    alignSelf: "flex-start",
  },
  button: {
    marginTop: 0.04 * windowHeight,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f2f1f2",
    height: "100%",
    width: "100%",
  },
  imgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: "#0e101c",
  },
  input: {
    backgroundColor: "#f2f1f2",
    borderColor: "none",
    width: 0.8 * windowWidth,
    height: 40,
    padding: 10,
    borderRadius: 4,
    borderStyle: "solid",
    borderColor: "grey",
    borderWidth: 1,
  },
  bbLogo: {
    height: "100%",
    width: "100%",
    padding: 10,
    marginBottom: 20,
    borderRadius: 4,
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    height: "30%",
  },
  scrollView: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
