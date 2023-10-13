import React from "react";
import RootNavigation from "./navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import store from "./Redux/store";

function App() {
  const [initRoute, setInitRoute] = React.useState("");

  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 3000);

  React.useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem("email");
        if (value !== null && value.length > 3) {
          setInitRoute("Btabs");
        } else {
          setInitRoute("getstarted");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (initRoute !== "") {
    return <RootNavigation initRoute={initRoute} />;
  }
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
