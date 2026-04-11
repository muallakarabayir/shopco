import { Feather } from "@expo/vector-icons";
import { TextInput, View, TextInputProps } from "react-native";
import { ComponentProps } from "react";

// Feather bileşeninin kabul ettiği 'name' tiplerini doğrudan çekiyoruz
type FeatherIconName = ComponentProps<typeof Feather>["name"];

interface InputProps extends TextInputProps {
  icon: FeatherIconName; // Hatalı 'keyof' yerine bunu kullanıyoruz
}

export default function Input({ icon, ...props }: InputProps) {
  return (
    <View className="bg-[#F0F0F0] rounded-full px-5 h-14 flex-row items-center mb-4">
      <Feather name={icon} size={20} color="#9ca3af" />
      <TextInput
        className="flex-1 ml-3 text-[16px]"
        style={{ fontFamily: "Satoshi-Variable" }}
        placeholderTextColor="#9ca3af"
        {...props}
      />
    </View>
  );
}