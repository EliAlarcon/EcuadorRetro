import React, { useState } from "react";
import { View } from "react-native";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import styles from "../themes/styles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { ShowMessage, SnackbarComponent } from "./components/SnackbarComponent";

interface FormRegister {
  email: string;
  password: string;
}

export const RegisterScreen = () => {
  //Hook useState: controlar el formulario de registro
  const [formRegister, setFormRegister] = useState<FormRegister>({
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

  //Hook useNavigate: control de rutas
  const navigate = useNavigation();

  //Función modificar formulario
  const handlerSetValues = (key: string, value: string) => {
    setFormRegister({ ...formRegister, [key]: value });
  };

  //Función para registro
  const handlerRegister = async () => {
    if (!formRegister.email || !formRegister.password) {
      setShowMessage({
        visible: true,
        message: "Complete todos los campos!",
        color: "#c70202",
      });
      return;
    }
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        formRegister.email,
        formRegister.password
      );
      setShowMessage({
        visible: true,
        message: "Registro exitoso!",
        color: "#0dad00",
      });
    } catch (error) {
      setShowMessage({
        visible: true,
        message: "No se pudo completar el registro!",
        color: "#c70202",
      });
      console.log(error);
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Regístrate</Text>
      <TextInput
        label="Correo"
        placeholder="Ingrese un correo"
        mode="outlined"
        onChangeText={(value) => handlerSetValues("email", value)}
      />
      <TextInput
        label="Contraseña"
        placeholder="Ingrese una contraseña"
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
        icon="account-plus"
        mode="contained"
        onPress={() => handlerRegister()}
      >
        Registrarme
      </Button>
      <Text
        style={styles.textRout}
        onPress={() =>
          navigate.dispatch(CommonActions.navigate({ name: "Login" }))
        }
      >
        Ya tienes una cuenta? Inicia Sesión
      </Text>
      <SnackbarComponent showMessage={showMessage} setShowMessage={setShowMessage}/>
    </View>
  );
};
