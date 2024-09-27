import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Avatar, Card } from "react-native-paper";
import { auth } from "../../config/firebaseConfig";
import styles from "../../themes/styles";

interface UserAuth {
  name: string;
}

export const HomeScreen = () => {
  //Hook useEffect: Para obtener la data del usuario
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserAuth({ name: user?.displayName ?? "N/A" });
    });
  }, []);

  //Hook useState: para manipular datos usuario
  const [userAuth, setUserAuth] = useState<UserAuth>({
    name: "",
  });

  return (
    <>
      <Card.Title
        title="Bienvenid@"
        titleStyle={{ fontWeight: "bold" }}
        subtitle={userAuth.name}
        style={styles.rootHeader}
        left={() => <Avatar.Icon icon="account" size={60} />}
      />
    </>
  );
};
