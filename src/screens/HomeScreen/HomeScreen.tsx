import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Divider,
  FAB,
  IconButton,
  MD3Colors,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { auth } from "../../config/firebaseConfig";
import styles from "../../themes/styles";
import { FlatList, View } from "react-native";
import firebase from "@firebase/auth";
import { updateProfile } from "firebase/auth";
import { ContentCardComponent } from "./components/ContentCardComponent";
import { NewContentComponent } from "./components/NewContentComponent";

interface FormUser {
  name: string;
}

interface Content {
  id: string;
  code: string;
  name: string;
  description: string;
  year: number;
  duration: string;
  category: string;
}

export const HomeScreen = () => {
  //Hook useEffect: Para cargar la data del usuario
  useEffect(() => {
    setUserData(auth.currentUser);
    setFormUser({ name: auth.currentUser?.displayName ?? "NA" });
  }, []);

  //Hook useState: para acceder a la data del usuario
  const [userData, setUserData] = useState<firebase.User | null>(null);

  //Hook useState: para manipular datos usuario
  const [formUser, setFormUser] = useState<FormUser>({
    name: "",
  });

  //Hook useState: manipulación de modal
  const [showModalProfile, setShowModalProfile] = useState<boolean>(false);

  //Hook useState: manipulación modal new content
  const [showModalContent, setShowModalContent] = useState<boolean>(false);

  //Hook useState: manipulacion lista de productos
  const [content, setContent] = useState<Content[]>([
    {
      id: "1",
      code: "25s",
      name: "Camino a la Ayahuasca",
      year: 2022,
      description:
        "Un joven documentalista se introduce en la Amazonía ecuatoriana para experimentar la legendaria ayahuasca.",
      duration: "69 minutos",
      category: "Documental",
    },
  ]);

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
    <>
      <View>
        <Card.Title
          title="Bienvenid@"
          titleStyle={{ fontWeight: "bold" }}
          subtitle={userData?.displayName ?? "NA"}
          style={styles.rootHeader}
          left={() => <Avatar.Icon icon="account" size={55} />}
          right={() => (
            <IconButton
              icon="square-edit-outline"
              size={30}
              onPress={() => setShowModalProfile(true)}
            />
          )}
        />

        <Divider />

        {/* FLATLIST PRODUCTO */}
        <FlatList
          data={content}
          renderItem={({ item }) => <ContentCardComponent />}
          keyExtractor={(item) => item.id}
        />
      </View>

      <Portal>
        <Modal visible={showModalProfile} contentContainerStyle={styles.modalProfile}>
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

      {/* FAB NUEVO CONTENIDO */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setShowModalContent(true)}
      />
      <NewContentComponent showModalContent={showModalContent} setShowModalContent={setShowModalContent}/>
    </>
  );
};
