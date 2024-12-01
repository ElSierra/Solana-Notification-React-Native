import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, TouchableOpacity, Animated } from "react-native";
import { useSharedValue, useAnimatedStyle } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Home from "../screen/Home";
import CustomDrawer from "../components/navigation/CustomDrawer";
import { HamBurgerIcon } from "../components/global/icons";
import DrawerIcon from "../components/navigation/CustomDrawer/DrawerIcon";
import { createStaticNavigation } from "@react-navigation/native";
import { HeaderCustom } from "../components/navigation/CustomDrawer/HeaderCustom";

const Drawer = createDrawerNavigator();

export const MyDrawer = createDrawerNavigator({
  drawerContent: CustomDrawer,

  screenOptions: {
    drawerHideStatusBarOnOpen: true,
    drawerType: "front",
    header: ({ navigation }) => {
      const { top } = useSafeAreaInsets();
      const rotateX = useSharedValue(0);
      console.log("🚀 ~ file: Main.tsx:94 ~ top:", top);
      const style = useAnimatedStyle(() => {
        return {
          transform: [{ rotateX: `${rotateX.value}deg` }],
        };
      });

      return (
        <View
          style={{
            backgroundColor: "transparent",
            position: "absolute",
            marginTop: top,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}
            style={{
              padding: 20,
            }}
          >
            <DrawerIcon />
          </TouchableOpacity>
        </View>
      );
    },
    headerStyle: {
      backgroundColor: "transparent",
      elevation: 0,
    },
    drawerStyle: {
      backgroundColor: "transparent",
      width: "50%",
    },
  },
  screens: {
    DrawerHome: Home,
  },
});

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        // drawerHideStatusBarOnOpen: true,
        drawerType: "front",
        header: HeaderCustom,
        headerStyle: {
          backgroundColor: "transparent",
          elevation: 0,
        },

        sceneStyle: {
          backgroundColor: "transparent",
        },
        drawerStyle: {
          backgroundColor: "transparent",
          width: "50%",
        },
      }}
      drawerContent={(props) => <CustomDrawer />}
    >
      <Drawer.Screen name="Tab" component={Home} />
    </Drawer.Navigator>
  );
};
