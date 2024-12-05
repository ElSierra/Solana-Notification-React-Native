import * as SecureStore from "expo-secure-store";
export async function save(key: string, value: string) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (e) {
    console.log(e);
  }
}

export async function getValueFor(key: any) {
  let result = await SecureStore.getItemAsync(key);
 return result;
}

export async function deleteValueFor(key: any) {
  await SecureStore.deleteItemAsync(key);
}