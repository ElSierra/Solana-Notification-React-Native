import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBar from "../components/navigation/CustomTabBar";
import { AnimatedIcon } from "../components/navigation/CustomTabBar/AnimatedIcon";
import { DarkModeIcon } from "../components/navigation/CustomTabBar/DarkModeIcon";
import {
  HomeFocused,
  HomeIcon,
  DiscoverIconFocused,
  DiscoverIconUnfocused,
} from "../components/global/icons";
import Explore from "../screen/Explore";
import Home from "../screen/Home";
import { DrawerNavigation } from "./DrawerNavigation";
import { View } from "react-native";
import LinearBackground from "../components/global/LinearBackground";
const Tab = createBottomTabNavigator();
export const MyTabs = createBottomTabNavigator({
  tabBar: (props) => <CustomTabBar {...props} />,

  screenOptions: {
    headerShown: false,
    animation: "fade",

    sceneStyle: {
      backgroundColor: "transparent",
    },

    //background color of page
  },

  screens: {
    Home: {
      options: {
        tabBarIcon: ({ color, size, focused }) => (
          <AnimatedIcon
            focused={focused}
            size={size}
            FocusedIcon={HomeFocused}
            UnfocusedIcon={HomeIcon}
          />
        ),
      },
      screen: DrawerNavigation,
    },
    Explore: {
      options: {
        tabBarIcon: ({ color, size, focused }) => (
          <AnimatedIcon
            focused={focused}
            size={size}
            FocusedIcon={DiscoverIconFocused}
            UnfocusedIcon={DiscoverIconUnfocused}
          />
        ),
      },
      screen: Explore,
    },

    DarkMode: {
      options: {
        //MAKE THE ICON JUST A BUTTON

        tabBarIcon: ({ color, size, focused }) => <DarkModeIcon size={size} />,
      },
      screen: Home,
    },
    // Likes: {
    //   options: {
    //     tabBarIcon: ({ color, size, focused }) => (
    //       <AnimatedIcon
    //         focused={focused}
    //         size={size}
    //         FocusedIcon={LikeIconFocused}
    //         UnfocusedIcon={LikeIconUnfocused}
    //       />
    //     ),
    //   },
    //   screen: Likes,
    // },

    // Profile: {
    //   options: {
    //     tabBarIcon: ({ color, size, focused }) => (
    //       <AnimatedIcon
    //         focused={focused}
    //         size={size}
    //         FocusedIcon={ProfileIconFocused}
    //         UnfocusedIcon={ProfileIconUnfocused}
    //       />
    //     ),
    //   },
    //   screen: Profile,
    // },
  },
});

export const BottomTabNav = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <LinearBackground />
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          animation: "shift",

          sceneStyle: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <AnimatedIcon
                focused={focused}
                size={size}
                FocusedIcon={HomeFocused}
                UnfocusedIcon={HomeIcon}
              />
            ),
          }}
          name="Home"
          component={DrawerNavigation}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <AnimatedIcon
                focused={focused}
                size={size}
                FocusedIcon={DiscoverIconFocused}
                UnfocusedIcon={DiscoverIconUnfocused}
              />
            ),
          }}
          name="Explore"
          component={Explore}
        />
      </Tab.Navigator>
    </View>
  );
};
