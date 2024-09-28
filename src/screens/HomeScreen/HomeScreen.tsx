import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Divider,
  IconButton,
  MD3Colors,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { auth } from "../../config/firebaseConfig";
import styles from "../../themes/styles";
import { View } from "react-native";
import firebase from "@firebase/auth";
import { updateProfile } from "firebase/auth";

interface FormUser {
  name: string;
}

export const HomeScreen = () => {
  //Hook useEffect: Para cargar la data del usuario
  useEffect(() => {
    setUserData(auth.currentUser);
    setFormUser({ name: auth.currentUser?.displayName??"NA"});
  }, []);

  //Hook useState: para acceder a la data del usuario
  const [userData, setUserData] = useState<firebase.User | null>(null);

  //Hook useState: para manipular datos usuario
  const [formUser, setFormUser] = useState<FormUser>({
    name: "",
  });

  //Hook useState: manipulación de modal
  const [showModal, setShowModal] = useState<boolean>(false);

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
    setShowModal(false);
  };

  return (
    <>
      <Card.Title
        title="Bienvenid@"
        titleStyle={{ fontWeight: "bold" }}
        subtitle={userData?.displayName ?? 'NA'}
        style={styles.rootHeader}
        left={() => <Avatar.Icon icon="account" size={55} />}
        right={() => (
          <IconButton
            icon="square-edit-outline"
            size={30}
            onPress={() => setShowModal(true)}
          />
        )}
      />
      <Portal>
        <Modal visible={showModal} contentContainerStyle={styles.modalProfile}>
          <View style={styles.header}>
            <Text variant="titleLarge">Mi Perfil</Text>
            <View style={styles.iconHeader}>
              <IconButton
                icon="close-box"
                size={30}
                onPress={() => setShowModal(false)}
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
    </>
  );
};
