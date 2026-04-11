import { Pressable, Text } from "react-native";

interface ToggleButtonProps {
  showAll: boolean;
  onToggle: () => void;
  showLessLabel?: string;
  showAllLabel?: string;
}

export default function ToggleButton({
  showAll,
  onToggle,
  showLessLabel = "Show Less",
  showAllLabel = "View All",
}: ToggleButtonProps) {
  return (
    <Pressable
      onPress={onToggle}
      
      className="w-[358px] h-[46px] border border-gray-300 rounded-[62px] items-center justify-center mt-4 self-center bg-white"
    >
      <Text 
        className="text-black text-[16px] font-medium text-center"
        style={{ fontFamily: "Satoshi-Variable" }}
      >
        {showAll ? showLessLabel : showAllLabel}
      </Text>
    </Pressable>
  );
}