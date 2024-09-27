import React, { useState } from "react";
import { View } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { ShowMessage } from "./RegisterScreen";
import styles from "../themes/styles";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

interface FormLogin {
  email: string;
  password: string;
}

export const LoginScreen = () => {
  //Hook useState: controlar el formulario de registro
  const [formLogin, setFormLogin] = useState<FormLogin>({
    email: "",
    password: "",
  });

  //Hook useState: controlar el Snackbar
  const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color: "",
  });

  //Hook useState: control de hidden password
  const [hiddenPassword, sethiddenPassword] = useState<boolean>(true);

  //Hook de navegación
  const navigation = useNavigation();

  //Función modificar formulario
  const handlerSetValues = (key: string, value: string) => {
    setFormLogin({ ...formLogin, [key]: value });
  };

  //Función para iniciar sesión
  const handlerLoging = async () => {
    if (!formLogin.email || !formLogin.password) {
      setShowMessage({
        visible: true,
        message: "Complete todos los campos!",
        color: "#c70202",
      });
      return;
    }
    try {
      await signInWithEmailAndPassword(
        auth,
        formLogin.email,
        formLogin.password
      );
    } catch (error) {
      console.log(error);
      setShowMessage({
        visible: true,
        message: "Usuario y/o contraseña incorrecta.",
        color: "#c70202",
      });
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Inicia Sesión</Text>
      <TextInput
        label="Correo"
        placeholder="Ingrese su correo"
        mode="outlined"
        onChangeText={(value) => handlerSetValues("email", value)}
      />
      <TextInput
        label="Contraseña"
        placeholder="Ingrese su contraseña"
        mode="outlined"
        secureTextEntry={hiddenPassword}
        onChangeText={(value) => handlerSetValues("password", value)}
        right={
          <TextInput.Icon
            icon="eye"
            onPress={() => sethiddenPassword(!hiddenPassword)}
          />
        }
      />
      <Button
        icon="account-check"
        mode="contained"
        onPress={() => handlerLoging()}
      >
        Iniciar Sesión
      </Button>
      <Text
        style={styles.textRout}
        onPress={() =>
          navigation.dispatch(CommonActions.navigate({ name: "Register" }))
        }
      >
        No tienes una cuenta aún? Regístrate
      </Text>
      <Snackbar
        visible={showMessage.visible}
        onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
        style={{ backgroundColor: showMessage.color, width: "100%" }}
      >
        {showMessage.message}
      </Snackbar>
    </View>
  );
};
