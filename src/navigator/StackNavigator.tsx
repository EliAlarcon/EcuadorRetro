import { createStackNavigator } from "@react-navigation/stack";
import { RegisterScreen } from "../screens/RegisterScreen";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { LoginScreen } from "../screens/LoginScreen";
import { HomeScreen } from "../screens/HomeScreen/HomeScreen";
import { DetailContentScreen } from "../screens/HomeScreen/DetailContentScreen";

interface Routes {
  name: string;
  screen: () => JSX.Element;
  headerShown?: boolean;
  title?: string;
}

const Stack = createStackNavigator();

//Array usuario autenticado
const routes: Routes[] = [
  { name: "Login", screen: LoginScreen },
  { name: "Register", screen: RegisterScreen },
  { name: "Home", screen: HomeScreen },
  { name: "Detail", screen: DetailContentScreen, headerShown:true, title: 'Detalle Contenido' },
];

export const StackNavigator = () => {
  //Hook useEffect: carga el estado de la autenticación
  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      }
      setIsLoading(false);
    });
  }, []);

  //Hook useState: controla si el usuario esta autenticado
  const [isAuth, setIsAuth] = useState<boolean>(false);

  //Hook useState: controlar el activityindicator
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      {isLoading ? (
        <View>
          <ActivityIndicator animating={true} color="#5A4499" />
        </View>
      ) : (
        <Stack.Navigator initialRouteName={isAuth ? "Home" : "Login"}>
          {routes.map((item, index) => (
            <Stack.Screen
              key={index}
              name={item.name}
              component={item.screen}
              options={{
                headerShown: item.headerShown ?? false,
                title: item.headerShown ? item.title : item.name
              }}
            />
          ))}
        </Stack.Navigator>
      )}
    </>
  );
};
