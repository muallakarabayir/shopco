import { Pressable, Text, ActivityIndicator, View } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: "primary" | "outline";
}

export default function Button({ title, onPress, loading = false, variant = "primary" }: ButtonProps) {
  const isPrimary = variant === "primary";
  
  return (
    <Pressable 
      onPress={onPress}
      disabled={loading}
      className={`${isPrimary ? "bg-black" : "border border-black"} h-14 rounded-full items-center justify-center mt-6 active:opacity-70`}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? "white" : "black"} />
      ) : (
        <Text 
          className={`${isPrimary ? "text-white" : "text-black"} font-bold text-[16px]`}
          style={{ fontFamily: "Satoshi-Variable" }}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}