import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  Button,
  Divider,
  IconButton,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import styles from "../../../themes/styles";
import firebase from "@firebase/auth";
import { updateProfile } from "firebase/auth";

interface FormUser {
  name: string;
}

interface Props {
  showModalProfile: boolean;
  setShowModalProfile: Function;
  userData: firebase.User;
}

export const ProfileCardComponent = ({
  showModalProfile,
  setShowModalProfile,
  userData,
}: Props) => {
  useEffect(() => {
    setFormUser({ name: userData.displayName ?? "NA" });
  }, []);

  //Hook useState: para manipular datos usuario
  const [formUser, setFormUser] = useState<FormUser>({
    name: "",
  });

  //Función para setear datos para su actualización
  const handlerSetValues = (key: string, value: string) => {
    setFormUser({ ...formUser, [key]: value });
  };

  //Función update: datos usuario
  const handlerUpdateUser = async () => {
    try {
      await updateProfile(userData!, {
        displayName: formUser.name,
      });
    } catch (ex) {
      console.log(ex);
    }
    setShowModalProfile(false);
  };

  return (
    <Portal>
      <Modal
        visible={showModalProfile}
        contentContainerStyle={styles.modalProfile}
      >
        <View style={styles.header}>
          <Text variant="titleLarge">Mi Perfil</Text>
          <View style={styles.iconHeader}>
            <IconButton
              icon="close-box"
              size={30}
              onPress={() => setShowModalProfile(false)}
            />
          </View>
        </View>
        <Divider bold />
        <TextInput
          label="Nombre"
          mode="outlined"
          value={formUser.name}
          onChangeText={(value) => {
            handlerSetValues("name", value);
          }}
        />
        <TextInput
          label="Correo"
          mode="outlined"
          disabled={true}
          value={userData?.email!}
        />
        <Button
          icon="update"
          mode="contained"
          onPress={() => handlerUpdateUser()}
        >
          Actualizar
        </Button>
      </Modal>
    </Portal>
  );
};
