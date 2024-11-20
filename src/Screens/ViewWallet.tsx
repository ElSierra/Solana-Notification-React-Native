import { StatusBar } from "expo-status-bar";
import { View, useWindowDimensions } from "react-native";
import WebView from "react-native-webview";
import { ViewWalletProp } from "../../types/navigation";
import { useNavigation } from "@react-navigation/native";

export const ViewWallet = ({ route }: ViewWalletProp) => {
  console.log(route.params.address);
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <>
      <StatusBar
        animated={true}
        style={"light"}
        backgroundColor="transparent"
      />
      <View style={{ height: height }}>
        <WebView
          source={{ uri: `https://solscan.io/address/${route.params.address}` }}
          style={{ flex: 1, backgroundColor: 'black' }}
          useWebView2={true}
          injectedJavaScript={`
 (function() {
              const htmlElement = document.querySelector('html');
              const bodyElement = document.querySelector('body');
           
                bodyElement.style.display = 'none';
             
              if (htmlElement) {
                htmlElement.classList.remove('light');
                htmlElement.classList.add('dark');
                if (bodyElement) {
                  bodyElement.style.display = 'block';
                }
              }
              const observer = new MutationObserver(() => {
                const htmlElement = document.querySelector('html');
                if (htmlElement) {
                  htmlElement.classList.remove('light');
                  htmlElement.classList.add('dark');
                  if (bodyElement) {
                    bodyElement.style.display = 'block';
                  }
                  observer.disconnect();
                }
              });
              observer.observe(document, { childList: true, subtree: true });
            })();
          `}
        />
      </View>
    </>
  );
};