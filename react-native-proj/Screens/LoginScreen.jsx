import {
  View,
  ImageBackground,
  Pressable,
  Text,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = () => {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(false);

  const handleSubmit = () => {
    keyboardHide();
    console.log(state);
    setState(initialState);
  };
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={StyleSheet.absoluteFill}
          source={require("../assets/background.jpg")}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.containerLogIn,
              paddingBottom: isShowKeyboard ? 32 : 111,
            }}
          >
            {/* Елементи форми */}
            <View style={styles.form}>
              <Text style={styles.title}>Ввійти</Text>
              <TextInput
                placeholder="Адреса електронної пошти"
                placeholderTextColor={"#BDBDBD"}
                placeholderSize={16}
                value={state.email}
                onFocus={() => {
                  setIsShowKeyboard(true);
                  setIsEmailFocus(true);
                }}
                onBlur={() => setIsEmailFocus(false)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
                style={{
                  ...styles.input,
                  borderColor: isEmailFocus ? "#ff6c00" : "#e8e8e8",
                  backgroundColor: isEmailFocus ? "#fff" : "#f6f6f6",
                }}
              ></TextInput>
              <View style={{ position: "relative" }}>
                <TextInput
                  placeholder="Пароль"
                  value={state.password}
                  placeholderTextColor={"#BDBDBD"}
                  placeholderSize={16}
                  secureTextEntry={isPasswordHidden}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setIsPasswordFocus(true);
                  }}
                  onBlur={() => setIsPasswordFocus(false)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                  style={{
                    ...styles.input,
                    borderColor: isPasswordFocus ? "#ff6c00" : "#e8e8e8",
                    backgroundColor: isPasswordFocus ? "#fff" : "#f6f6f6",
                  }}
                ></TextInput>
                <Pressable
                  onPress={() => setIsPasswordHidden((prevState) => !prevState)}
                  style={styles.toggleButton}
                >
                  <Text style={styles.toggleText}>
                    {isPasswordHidden ? "Показати" : "Сховати"}
                  </Text>
                </Pressable>
              </View>
              {!isShowKeyboard && (
                <>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonText}>Ввійти</Text>
                  </TouchableOpacity>
                  <Text style={styles.logInText}>
                    Немає аккаунта? Зареєструватися
                  </Text>
                </>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaeaea",
    justifyContent: "flex-end",
  },

  containerLogIn: {
    position: "relative",
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
    width: "100%",
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 32,
  },

  title: {
    fontFamily: "Roboto-Medium",
    textAlign: "center",
    color: "#212121",
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 1.16,
    letterSpacing: 1.6,
    marginBottom: 32,
  },

  form: {
    flexDirection: "column",
    gap: 16,
    marginBottom: 20,
  },
  input: {
    height: 45,
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: "Roboto-Regular",
  },

  toggleButton: {
    position: "absolute",
    top: 12,
    right: 20,
  },
  toggleText: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.19,
  },

  button: {
    height: 51,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1,
    fontFamily: "Roboto-Regular",
  },
  logInText: {
    textAlign: "center",
    color: "#1B4371",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.19,
    fontFamily: "Roboto-Regular",
  },
});
