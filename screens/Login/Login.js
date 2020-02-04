import React from "react";
import { Fragment } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import {
  Button,
  Input,
  Text,
  Icon
} from "react-native-elements";
import * as firebase from "firebase";
import { Formik } from "formik";
import FormInput from "../../src/components/FormInput/FormInput";
import FormButton from "../../src/components/FormButton/FormButton";
import ErrorMessage from "../../src/components/ErrorMessage/ErrorMessage";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";

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
        .then(() => this.props.navigation.navigate("Home"))
        .catch(error => this.setState({ errorMessage: error.message }));
    }
  };

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      rightIcon: prevState.rightIcon === "ios-eye" ? "ios-eye-off" : "ios-eye",
      passwordVisibility: !prevState.passwordVisibility
    }))
  };
  
  
  render() {
    const { passwordVisibility, rightIcon } = this.state
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
