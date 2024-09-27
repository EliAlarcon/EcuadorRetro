import { createStackNavigator } from "@react-navigation/stack";
import { RegisterScreen } from "../screens/RegisterScreen";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { LoginScreen } from "../screens/LoginScreen";
import { HomeScreen } from "../screens/HomeScreen/HomeScreen";

interface Routes {
  name: string;
  screen: () => JSX.Element;
}

const Stack = createStackNavigator();

//Array usuario autenticado
const routeAuth: Routes[] = [
    { name: "Home", screen: HomeScreen }
];

//Array usuario no autenticado
const routeNoAuth: Routes[] = [
  { name: "Login", screen: LoginScreen },
  { name: "Register", screen: RegisterScreen },
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
        <Stack.Navigator>
          {!isAuth
            ? routeNoAuth.map((item, index) => (
                <Stack.Screen
                  key={index}
                  name={item.name}
                  component={item.screen}
                  options={{ headerShown: false }}
                />
              ))
            : routeAuth.map((item, index) => (
                <Stack.Screen
                  key={index}
                  name={item.name}
                  component={item.screen}
                  options={{ headerShown: true }}
                />
              ))}
        </Stack.Navigator>
      )}
    </>
  );
};
