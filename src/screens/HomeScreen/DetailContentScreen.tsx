import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { Content } from "./HomeScreen";
import styles from "../../themes/styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ref, remove, update } from "firebase/database";
import { auth, dbRealTime } from "../../config/firebaseConfig";

export const DetailContentScreen = () => {
  const route = useRoute();
  //@ts-ignore
  const { content } = route.params;

  useEffect(() => {
    setFormEdit(content);
  }, []);

  const navigation = useNavigation();

  const [formEdit, setFormEdit] = useState<Content>({
    id: "",
    code: "",
    name: "",
    category: "",
    year: 0,
    duration: "",
    description: "",
  });

  const handleSetValues = (key: string, value: string) => {
    setFormEdit({ ...formEdit, [key]: value });
  };

  const handleUpdateContent = async () => {
    //1. Conexión base de datos
    const dbRef = ref(
      dbRealTime,
      "content/" + auth.currentUser?.uid + "/" + formEdit.id
    );
    try {
      await update(dbRef, {
        code: formEdit.code,
        name: formEdit.name,
        category: formEdit.category,
        year: formEdit.year,
        duration: formEdit.duration,
        description: formEdit.description,
      });
      navigation.goBack();
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleDeleteContent = async () => {
    //1. Conexión base de datos
    const dbRef = ref(
        dbRealTime,
        "content/" + auth.currentUser?.uid + "/" + formEdit.id
      );
      try {
        await remove(dbRef);
        navigation.goBack();
      } catch (ex) {
        console.log(ex);
      }
  };

  return (
    <View style={styles.rootDetail}>
      <View>
        <Text variant="titleSmall">Código</Text>
        <TextInput
          label="Código"
          mode="outlined"
          value={formEdit.code}
          onChangeText={(value) => {
            handleSetValues("code", value);
          }}
        />
      </View>
      <View>
        <Text variant="titleSmall">Nombre</Text>
        <TextInput
          label="Nombre"
          mode="outlined"
          value={formEdit.name}
          onChangeText={(value) => {
            handleSetValues("name", value);
          }}
        />
      </View>

      <View>
        <View style={styles.groupInput}>
          <Text variant="titleSmall" style={{ width: "38%" }}>
            Categoría
          </Text>
          <Text variant="titleSmall" style={{ width: "20%" }}>
            Año
          </Text>
          <Text variant="titleSmall">Duración</Text>
        </View>

        <View style={styles.groupInput}>
          <TextInput
            label="Categoría"
            mode="outlined"
            value={formEdit.category}
            style={{ width: "36%" }}
            onChangeText={(value) => {
              handleSetValues("category", value);
            }}
          />
          <TextInput
            label="Año"
            mode="outlined"
            value={formEdit.year.toString()}
            keyboardType="numeric"
            style={{ width: "21%" }}
            onChangeText={(value) => {
              handleSetValues("year", value);
            }}
          />
          <TextInput
            label="Duración"
            mode="outlined"
            value={formEdit.duration}
            style={{ width: "38%" }}
            onChangeText={(value) => {
              handleSetValues("duration", value);
            }}
          />
        </View>
      </View>
      <View>
        <Text variant="titleSmall">Descripción</Text>
        <TextInput
          label="Descripción"
          mode="outlined"
          value={formEdit.description}
          multiline
          numberOfLines={3}
          onChangeText={(value) => {
            handleSetValues("description", value);
          }}
        />
      </View>
      <View style={styles.groupButton}>
        <Button icon="update" mode="contained" onPress={handleUpdateContent}>
          Actualizar
        </Button>
        <Button
          icon="delete-empty-outline"
          mode="contained"
          style={{ backgroundColor: "#e85454" }}
          onPress={handleDeleteContent}
        >
          Eliminar
        </Button>
      </View>
    </View>
  );
};
