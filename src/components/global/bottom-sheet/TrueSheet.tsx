import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { ReactNode, useRef } from "react";
import { View, Button } from "react-native";

export const TrusheetTesy = ({ children }: { children: ReactNode }) => {
  const sheet = useRef<TrueSheet>(null);

  // Present the sheet ✅
  const present = async () => {
    await sheet.current?.present();
    console.log("horray! sheet has been presented 💩");
  };

  // Dismiss the sheet ✅
  const dismiss = async () => {
    await sheet.current?.dismiss();
    console.log("Bye bye 👋");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      {children}
      <Button onPress={present} title="Present" />
      <TrueSheet onSizeChange={(e)=>{
        console.log("🚀 ~ file: TrueSheet.tsx ~ e", e)
      }} ref={sheet} sizes={["60%", "large"]} cornerRadius={24}>
        <>
          <Button onPress={dismiss} title="Dismiss" />
        </>
      </TrueSheet>
    </View>
  );
};
