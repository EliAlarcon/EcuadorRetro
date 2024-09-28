import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  Divider,
  FAB,
  IconButton,
} from "react-native-paper";
import { auth } from "../../config/firebaseConfig";
import styles from "../../themes/styles";
import { FlatList, View } from "react-native";
import firebase from "@firebase/auth";
import { ContentCardComponent } from "./components/ContentCardComponent";
import { NewContentComponent } from "./components/NewContentComponent";
import { ProfileCardComponent } from "./components/ProfileCardComponent";

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
  }, []);

  //Hook useState: para acceder a la data del usuario
  const [userData, setUserData] = useState<firebase.User | null>(null);

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
      {/* FAB NUEVO CONTENIDO */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setShowModalContent(true)}
      />
      <ProfileCardComponent showModalProfile={showModalProfile} setShowModalProfile={setShowModalProfile} userData={userData!}/>
      <NewContentComponent showModalContent={showModalContent} setShowModalContent={setShowModalContent}/>
    </>
  );
};
