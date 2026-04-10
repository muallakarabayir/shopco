import { Feather } from "@expo/vector-icons";
import { Modal, Pressable, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";

interface SearchModalProps {
  visible: boolean;
  value: string;
  onClose: () => void;
  onChangeText: (text: string) => void;
}

export default function SearchModal({ visible, value, onClose, onChangeText }: SearchModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-start", paddingTop: 60 }}>
          <TouchableWithoutFeedback>
            <View className="bg-white mx-4 rounded-2xl p-4">
              <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
                <Feather name="search" size={16} color="#9ca3af" />
                <TextInput
                  autoFocus
                  className="flex-1 ml-2 text-sm text-gray-700"
                  placeholder="Search for products..."
                  placeholderTextColor="#9ca3af"
                  value={value}
                  onChangeText={onChangeText}
                />
                {value.length > 0 && (
                  <Pressable onPress={() => onChangeText("")}>
                    <Feather name="x" size={16} color="#9ca3af" />
                  </Pressable>
                )}
              </View>
              <Pressable onPress={onClose} className="mt-3 items-center">
                <Text className="text-gray-500 text-sm">Close</Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
