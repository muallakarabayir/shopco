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
      className="border border-gray-300 rounded-full py-3 items-center mt-4 mx-4"
    >
      <Text className="text-gray-800 font-semibold text-sm">
        {showAll ? showLessLabel : showAllLabel}
      </Text>
    </Pressable>
  );
}
