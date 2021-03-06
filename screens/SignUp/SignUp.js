import React from "react";
import { Fragment } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import * as firebase from "firebase";
import * as Yup from "yup";
import { Formik } from "formik";
import { Ionicons } from "@expo/vector-icons";
import { Button, Text } from "react-native-elements";
import FormInput from "../../src/components/FormInput/FormInput";
import FormButton from "../../src/components/FormButton/FormButton";
import ErrorMessage from "../../src/components/ErrorMessage/ErrorMessage";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label("Name")
    .required()
    .min(2, "Must have at least 2 characters"),
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(4, "Password must have more than 4 characters "),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Confirm Password must matched Password")
    .required("Confirm Password is required")
});

export default class SignUp extends React.Component {
state = {
    passwordVisibility: true,
    confirmPasswordVisibility: true,
    passwordIcon: "ios-eye",
    confirmPasswordIcon: "ios-eye"
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
        .createUserWithEmailAndPassword(values.email, values.password)
        .then(cred => {
          return firebase
            .database()
            .ref("/users/" + cred.user.uid)
            .set({
              name: values.name,
              email: cred.user.email,
              created_at: Date.now()
            });
        })
        .then(() => {
          this.sendEmailVerification();
        })
        .catch(error => this.setState({ errorMessage: error.message }));
    }
  };

  sendEmailVerification = () => {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
      alert('Check your email to verify your address and gain full access')
    }).catch(function(error) {
      alert('Verification email not sent. A problem occurred')
    })
  };

    handlePasswordVisibility = () => {
    this.setState(prevState => ({
      passwordIcon:
        prevState.passwordIcon === "ios-eye" ? "ios-eye-off" : "ios-eye",
      passwordVisibility: !prevState.passwordVisibility
    }));
  };

  handleConfirmPasswordVisibility = () => {
    this.setState(prevState => ({
      confirmPasswordIcon:
        prevState.confirmPasswordIcon === "ios-eye" ? "ios-eye-off" : "ios-eye",
      confirmPasswordVisibility: !prevState.confirmPasswordVisibility
    }));
  };

  render() {
    const {
      passwordVisibility,
      confirmPasswordVisibility,
      passwordIcon,
      confirmPasswordIcon
    } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} enabled behavior="padding">
        <SafeAreaView>
          <View style={styles.mainTitle}>
            <Text h1>Sign Up</Text>
          </View>
          <View style={styles.formInputs}>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: ""
            }}
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
                  name="name"
                  value={values.name}
                  onChangeText={handleChange("name")}
                  placeholder="Enter your full name"
                  iconName="md-person"
                  iconColor="#2C384A"
                  onBlur={handleBlur("name")}
                />
                <ErrorMessage errorValue={touched.name && errors.name} />
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
                  onChangeText={handleChange("password")}
                  iconName="ios-lock"
                  iconColor="#2C384A"
                  onBlur={handleBlur("password")}
                  secureTextEntry={passwordVisibility}
                  rightIcon={
                    <TouchableOpacity onPress={this.handlePasswordVisibility}>
                      <Ionicons name={passwordIcon} size={28} color="grey" />
                    </TouchableOpacity>
                  }
                />
                <ErrorMessage
                  errorValue={touched.password && errors.password}
                />
                <FormInput
                  name="password"
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  placeholder="Confirm password"
                  iconName="ios-lock"
                  iconColor="#2C384A"
                  onBlur={handleBlur("confirmPassword")}
                  secureTextEntry={confirmPasswordVisibility}
                  rightIcon={
                    <TouchableOpacity
                      onPress={this.handleConfirmPasswordVisibility}
                    >
                      <Ionicons
                        name={confirmPasswordIcon}
                        size={28}
                        color="grey"
                      />
                    </TouchableOpacity>
                  }
                />
                <ErrorMessage
                  errorValue={touched.confirmPassword && errors.confirmPassword}
                />
                <FormButton
                  onPress={handleSubmit}
                  title="Sign Up"
                  buttonColor="#039BE5"
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </Fragment>
            )}
          </Formik>
          <Button
            type="outline"
            title="Have an account? Login"
            onPress={() => this.props.navigation.navigate("Login")}
            buttonStyle={styles.button}
          />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  mainTitle: {
    alignItems: "center",
    justifyContent: "center"
  },
  formInputs: {
    width: "100%"
  },
    button: {
    height: 40,
    width: "100%",
    marginTop: 10
  },
});
