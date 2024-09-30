import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  Divider,
  FAB,
  IconButton,
} from "react-native-paper";
import { auth, dbRealTime } from "../../config/firebaseConfig";
import styles from "../../themes/styles";
import { FlatList, View } from "react-native";
import firebase from "@firebase/auth";
import { ContentCardComponent } from "./components/ContentCardComponent";
import { NewContentComponent } from "./components/NewContentComponent";
import { ProfileCardComponent } from "./components/ProfileCardComponent";
import { onValue, ref } from "firebase/database";

export interface Content {
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
    getAllProducts();
  }, []);

  //Hook useState: para acceder a la data del usuario
  const [userData, setUserData] = useState<firebase.User | null>(null);

  //Hook useState: manipulación de modal
  const [showModalProfile, setShowModalProfile] = useState<boolean>(false);

  //Hook useState: manipulación modal new content
  const [showModalContent, setShowModalContent] = useState<boolean>(false);

  //Hook useState: manipulacion lista de productos
  const [content, setContent] = useState<Content[]>([]);

  //READ
  const getAllProducts = () =>{
    //1. Conexión a la base de datos
    const dbRef = ref(dbRealTime, 'content/' + auth.currentUser?.uid);
    //2. Obtener data
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        console.log("Sin información");
        setContent([]);
        return;
      }
      //3. Obtenemos las keys
      const getKeys = Object.keys(data);
      //4. Creamos la colección
      const listContent: Content[] = [];
      //5. Recorremos las keys
      getKeys.forEach((key) => {
        const value = {...data[key], id: key};
        listContent.push(value);
      })
      setContent(listContent);
    })
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
        <Divider bold/>
        {/* FLATLIST PRODUCTO */}
        <FlatList
          data={content}
          renderItem={({ item }) => <ContentCardComponent content={item}/>}
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
