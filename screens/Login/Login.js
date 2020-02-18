import React from "react";
import { Fragment } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { Button, Input, Text, Icon } from "react-native-elements";
import * as firebase from "firebase";
import { Formik } from "formik";
import FormInput from "../../src/components/FormInput/FormInput";
import FormButton from "../../src/components/FormButton/FormButton";
import ErrorMessage from "../../src/components/ErrorMessage/ErrorMessage";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import * as Google from "expo-google-app-auth";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(4, "Password must have at least 4 characters ")
});

export default class Login extends React.Component {
  state = {
    passwordVisibility: true,
    rightIcon: "ios-eye"
  };

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = googleUser => {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function(result) {
              console.log("user signed in ");
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now()
                  })
                  .then(function(snapshot) {
                    //console.log('Snapshot', snapshot);
                  });
              } else {
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .update({
                    last_logged_in: Date.now()
                  });
              }
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      }.bind(this)
    );
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        //androidClientId: YOUR_CLIENT_ID_HERE,
        iosClientId:
          "319623885326-mqtr2rg5unfiellgrqi8mnaamnhi102e.apps.googleusercontent.com",

        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  handleEmailChange = email => {
    this.setState({ email });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  handleSubmit = values => {
    if (values.email.length > 0 && values.password.length > 0) {
      firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then(cred => {
          if (cred.user.emailVerified) {
            console.log("Is email verified?:" + cred.user.emailVerified);
            this.props.navigation.navigate("Home");
          } else {
            this.props.navigation.navigate("EmailValidation");
            console.log("Is email verified?:" + cred.user.emailVerified);
          }
        })
        .then(cred => {
          return firebase
            .database()
            .ref("/users/" + cred.user.uid)
            .update({
              last_logged_in: Date.now()
            });
        })
         .catch(error => this.setState({ errorMessage: error.message }));
    }
  };

  

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      rightIcon: prevState.rightIcon === "ios-eye" ? "ios-eye-off" : "ios-eye",
      passwordVisibility: !prevState.passwordVisibility
    }));
  };

  render() {
    const { passwordVisibility, rightIcon } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} enabled behavior="padding">
        <SafeAreaView>
          <View style={styles.mainTitle}>
            <Text h1>Log in</Text>
          </View>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={values => {
              this.handleSubmit(values);
            }}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              values,
              handleSubmit,
              errors,
              isValid,
              isSubmitting,
              touched,
              handleBlur
            }) => (
              <Fragment>
                <FormInput
                  name="email"
                  value={values.email}
                  placeholder="Enter email"
                  autoCapitalize="none"
                  onChangeText={handleChange("email")}
                  iconName="ios-mail"
                  iconColor="#2C384A"
                  onBlur={handleBlur("email")}
                />
                <ErrorMessage errorValue={touched.email && errors.email} />
                <FormInput
                  name="password"
                  value={values.password}
                  placeholder="Enter password"
                  secureTextEntry={passwordVisibility}
                  onChangeText={handleChange("password")}
                  iconName="ios-lock"
                  iconColor="#2C384A"
                  onBlur={handleBlur("password")}
                  rightIcon={
                    <TouchableOpacity onPress={this.handlePasswordVisibility}>
                      <Ionicons name={rightIcon} size={28} color="grey" />
                    </TouchableOpacity>
                  }
                />
                <ErrorMessage
                  errorValue={touched.password && errors.password}
                />
                <FormButton
                  onPress={handleSubmit}
                  title="Log in"
                  buttonColor="#039BE5"
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
                <Button
                  onPress={() => this.signInWithGoogleAsync()}
                  icon={
                    <Icon
                      name="logo-google"
                      type="ionicon"
                      size={25}
                      color="white"
                      marginRight={10}
                    />
                  }
                  title="Sign in with Google"
                  buttonStyle={styles.button}
                  loading={isSubmitting}
                />
              </Fragment>
            )}
          </Formik>

          <Button
            type="outline"
            title="No account? Sign Up"
            onPress={() => this.props.navigation.navigate("SignUp")}
            buttonStyle={styles.button}
          />
          <Button
            title="Forgot password?"
            type="clear"
            onPress={() => this.props.navigation.push("PasswordReset")}
            buttonStyle={styles.button}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  mainTitle: {
    paddingBottom: 40,
    alignItems: "center"
  },
  textInput: {
    height: 40,
    marginTop: 8
  },
  button: {
    width: 250,
    height: 40,
    marginTop: 10
  }
});
