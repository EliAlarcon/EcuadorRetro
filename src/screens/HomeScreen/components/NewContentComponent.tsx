import React, { useState } from "react";
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
import { ShowMessage, SnackbarComponent } from "../../components/SnackbarComponent";
import { push, ref, set } from "firebase/database";
import { auth, dbRealTime } from "../../../config/firebaseConfig";

interface Props {
  showModalContent: boolean;
  setShowModalContent: Function;
}

interface FormContent {
  code: string;
  name: string;
  description: string;
  year: number;
  duration: string;
  category: string;
}

export const NewContentComponent = ({
  showModalContent,
  setShowModalContent,
}: Props) => {
  //Hook useState: manipular formulario
  const [formContent, setFormContent] = useState<FormContent>({
    code: "",
    name: "",
    description: "",
    year: 0,
    duration: "",
    category: "",
  });

  //Hook useState: controlar el Snackbar
  const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color: "",
  });

  //Función para setear formulario
  const handlerSetValues = (key: string, value: string) => {
    setFormContent({ ...formContent, [key]: value });
  };

  //Función para registrar contenido
  const handlerSaveContent = async () =>{
    if (!formContent.code || !formContent.name || !formContent.category || !formContent.year || !formContent.duration || !formContent.description) {
        setShowMessage({
            visible: true,
            message: "Complete todos los campos!",
            color: "#c70202",
          });
        return;
    }
    //1. Creamos la conexión a la base de datos
    const dbRef = ref(dbRealTime, 'content/'+ auth.currentUser?.uid);
    //2. Creamos una colección con los datos que se desea almacenar
    const saveContent = push(dbRef);
    //3. Enviamos los datos a la base de datos
    try {
        await set(saveContent, formContent);
        setShowModalContent(false);
    } catch (ex) {
        console.log(ex);
        setShowMessage({
            visible: true,
            message: "No se pudo completar el registro",
            color: "#c70202",
          });
        return;
    }
  }

  return (
    <>
      <Portal>
        <Modal
          visible={showModalContent}
          contentContainerStyle={styles.modalProfile}
        >
          <View style={styles.header}>
            <Text variant="titleLarge">Nuevo Contenido</Text>
            <View style={styles.iconHeader}>
              <IconButton
                icon="close-box"
                size={30}
                onPress={() => setShowModalContent(false)}
              />
            </View>
          </View>
          <Divider bold />
          <TextInput
            label="Código"
            mode="outlined"
            onChangeText={(value) => {
              handlerSetValues("code", value);
            }}
          />
          <TextInput
              label="Nombre"
              mode="outlined"
              onChangeText={(value) => {
                handlerSetValues("name", value);
              }}
            />
          <View style={styles.groupInput}>
            <TextInput
              label="Categoría"
              mode="outlined"
              style={{width:'36%'}}
              onChangeText={(value) => {
                handlerSetValues("category", value);
              }}
            />
            <TextInput
              label="Año"
              mode="outlined"
              keyboardType="numeric"
              style={{width:'21%'}}
              onChangeText={(value) => {
                handlerSetValues("year", value);
              }}
            />
            <TextInput
              label="Duración"
              mode="outlined"
              style={{width:'38%'}}
              onChangeText={(value) => {
                handlerSetValues("duration", value);
              }}
            />
          </View>
          <TextInput
            label="Descripción"
            mode="outlined"
            multiline
            numberOfLines={3}
            onChangeText={(value) => {
              handlerSetValues("description", value);
            }}
          />
          <Button icon="plus" mode="contained" onPress={handlerSaveContent}>
            Registrar
          </Button>
        </Modal>
        <SnackbarComponent showMessage={showMessage} setShowMessage={setShowMessage}/>
      </Portal>
    </>
  );
};
