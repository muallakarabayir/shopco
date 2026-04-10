import { Feather } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Modal, Pressable, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import { GestureDetector, Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import { SCREEN_WIDTH } from "../constants/layout";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

export interface FilterState {
  colors: string[];
  sizes: string[];
  dressStyle: string | null;
  minPrice: number;
  maxPrice: number;
}

const COLORS = ["#22c55e", "#ef4444", "#eab308", "#f97316", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#ffffff", "#1f2937"];
const SIZES = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"];
const DRESS_STYLES = ["Casual", "Formal", "Party", "Gym"];
const CATEGORIES = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];

const SLIDER_WIDTH = SCREEN_WIDTH - 80;
const MIN = 0;
const MAX = 500;
const HANDLE_SIZE = 24;

function RangeSlider({ minVal, maxVal, onMinChange, onMaxChange }: {
  minVal: number; maxVal: number;
  onMinChange: (v: number) => void;
  onMaxChange: (v: number) => void;
}) {
  const toPercent = (v: number) => (v - MIN) / (MAX - MIN);
  const toValue = (px: number) => Math.round(Math.max(MIN, Math.min(MAX, MIN + (px / SLIDER_WIDTH) * (MAX - MIN))));

  const minLeft = toPercent(minVal) * SLIDER_WIDTH;
  const maxLeft = toPercent(maxVal) * SLIDER_WIDTH;

  const minStartX = useRef(minLeft);
  const maxStartX = useRef(maxLeft);

  const minGesture = Gesture.Pan()
    .runOnJS(true)
    .onBegin(() => {
      minStartX.current = toPercent(minVal) * SLIDER_WIDTH;
    })
    .onUpdate((e) => {
      const newX = Math.max(0, Math.min(toPercent(maxVal) * SLIDER_WIDTH - 20, minStartX.current + e.translationX));
      onMinChange(toValue(newX));
    });

  const maxGesture = Gesture.Pan()
    .runOnJS(true)
    .onBegin(() => {
      maxStartX.current = toPercent(maxVal) * SLIDER_WIDTH;
    })
    .onUpdate((e) => {
      const newX = Math.max(toPercent(minVal) * SLIDER_WIDTH + 20, Math.min(SLIDER_WIDTH, maxStartX.current + e.translationX));
      onMaxChange(toValue(newX));
    });

  return (
    <View style={{ marginVertical: 16 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
        <Text style={{ fontSize: 13, color: "#6b7280" }}>
          Min: <Text style={{ fontWeight: "700", color: "#111827" }}>${minVal}</Text>
        </Text>
        <Text style={{ fontSize: 13, color: "#6b7280" }}>
          Max: <Text style={{ fontWeight: "700", color: "#111827" }}>${maxVal}</Text>
        </Text>
      </View>

      <View style={{ height: HANDLE_SIZE + 8, justifyContent: "center" }}>
        {/* Background Track */}
        <View style={{ height: 4, backgroundColor: "#e5e7eb", borderRadius: 2, width: SLIDER_WIDTH }} />

        {/* Active Track */}
        <View style={{
          position: "absolute",
          height: 4,
          backgroundColor: "#000",
          borderRadius: 2,
          left: minLeft,
          width: Math.max(0, maxLeft - minLeft),
        }} />

        {/* Min Handle */}
        <GestureDetector gesture={minGesture}>
          <View style={{
            position: "absolute",
            left: minLeft - HANDLE_SIZE / 2,
            width: HANDLE_SIZE,
            height: HANDLE_SIZE,
            borderRadius: HANDLE_SIZE / 2,
            backgroundColor: "#000",
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 4,
          }} />
        </GestureDetector>

        {/* Max Handle */}
        <GestureDetector gesture={maxGesture}>
          <View style={{
            position: "absolute",
            left: maxLeft - HANDLE_SIZE / 2,
            width: HANDLE_SIZE,
            height: HANDLE_SIZE,
            borderRadius: HANDLE_SIZE / 2,
            backgroundColor: "#000",
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 4,
          }} />
        </GestureDetector>
      </View>
    </View>
  );
}

export default function FilterModal({ visible, onClose, onApply }: FilterModalProps) {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(200);

  const [openPrice, setOpenPrice] = useState(true);
  const [openColors, setOpenColors] = useState(true);
  const [openSizes, setOpenSizes] = useState(true);
  const [openDressStyle, setOpenDressStyle] = useState(true);

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleApply = () => {
    onApply({ colors: selectedColors, sizes: selectedSizes, dressStyle: selectedStyle, minPrice, maxPrice });
    onClose();
  };

  const handleReset = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedStyle(null);
    setMinPrice(50);
    setMaxPrice(200);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" }}>
          <TouchableWithoutFeedback>
            <GestureHandlerRootView>
              <View style={{ backgroundColor: "white", borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: "90%", paddingBottom: 32 }}>

                {/* Header */}
                <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100">
                  <Pressable onPress={handleReset}>
                    <Text className="text-gray-400 text-sm">Reset</Text>
                  </Pressable>
                  <Text className="text-lg font-black">Filters</Text>
                  <Pressable onPress={onClose}>
                    <Feather name="x" size={22} color="#000" />
                  </Pressable>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>

                  {/* Categories */}
                  <View className="border-b border-gray-100">
                    {CATEGORIES.map((cat) => (
                      <Pressable key={cat} className="flex-row items-center justify-between px-6 py-4 border-b border-gray-50">
                        <Text className="text-gray-700 text-sm">{cat}</Text>
                        <Feather name="chevron-right" size={16} color="#9ca3af" />
                      </Pressable>
                    ))}
                  </View>

                  {/* Price */}
                  <View className="px-6 py-4 border-b border-gray-100">
                    <Pressable onPress={() => setOpenPrice(!openPrice)} className="flex-row items-center justify-between">
                      <Text className="text-base font-black">Price</Text>
                      <Feather name={openPrice ? "chevron-up" : "chevron-down"} size={18} color="#000" />
                    </Pressable>
                    {openPrice && (
                      <RangeSlider
                        minVal={minPrice}
                        maxVal={maxPrice}
                        onMinChange={setMinPrice}
                        onMaxChange={setMaxPrice}
                      />
                    )}
                  </View>

                  {/* Colors */}
                  <View className="px-6 py-4 border-b border-gray-100">
                    <Pressable onPress={() => setOpenColors(!openColors)} className="flex-row items-center justify-between mb-4">
                      <Text className="text-base font-black">Colors</Text>
                      <Feather name={openColors ? "chevron-up" : "chevron-down"} size={18} color="#000" />
                    </Pressable>
                    {openColors && (
                      <View className="flex-row flex-wrap gap-3">
                        {COLORS.map((color) => (
                          <Pressable
                            key={color}
                            onPress={() => toggleColor(color)}
                            style={{
                              width: 36, height: 36, borderRadius: 18,
                              backgroundColor: color,
                              borderWidth: selectedColors.includes(color) ? 3 : color === "#ffffff" ? 1 : 0,
                              borderColor: selectedColors.includes(color) ? "#000" : "#e5e7eb",
                              alignItems: "center", justifyContent: "center",
                            }}
                          >
                            {selectedColors.includes(color) && (
                              <Feather name="check" size={16} color={color === "#ffffff" ? "#000" : "#fff"} />
                            )}
                          </Pressable>
                        ))}
                      </View>
                    )}
                  </View>

                  {/* Sizes */}
                  <View className="px-6 py-4 border-b border-gray-100">
                    <Pressable onPress={() => setOpenSizes(!openSizes)} className="flex-row items-center justify-between mb-4">
                      <Text className="text-base font-black">Size</Text>
                      <Feather name={openSizes ? "chevron-up" : "chevron-down"} size={18} color="#000" />
                    </Pressable>
                    {openSizes && (
                      <View className="flex-row flex-wrap gap-2">
                        {SIZES.map((size) => (
                          <Pressable
                            key={size}
                            onPress={() => toggleSize(size)}
                            className={`px-4 py-2 rounded-full border ${selectedSizes.includes(size) ? "bg-black border-black" : "bg-gray-100 border-gray-100"}`}
                          >
                            <Text className={`text-xs font-medium ${selectedSizes.includes(size) ? "text-white" : "text-gray-700"}`}>
                              {size}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    )}
                  </View>

                  {/* Dress Style */}
                  <View className="px-6 py-4">
                    <Pressable onPress={() => setOpenDressStyle(!openDressStyle)} className="flex-row items-center justify-between mb-4">
                      <Text className="text-base font-black">Dress Style</Text>
                      <Feather name={openDressStyle ? "chevron-up" : "chevron-down"} size={18} color="#000" />
                    </Pressable>
                    {openDressStyle && DRESS_STYLES.map((style) => (
                      <Pressable
                        key={style}
                        onPress={() => setSelectedStyle(style === selectedStyle ? null : style)}
                        className="flex-row items-center justify-between py-3 border-b border-gray-50"
                      >
                        <Text className={`text-sm ${selectedStyle === style ? "font-bold text-black" : "text-gray-700"}`}>
                          {style}
                        </Text>
                        <Feather name="chevron-right" size={16} color="#9ca3af" />
                      </Pressable>
                    ))}
                  </View>

                </ScrollView>

                {/* Apply Button */}
                <View className="px-6 pt-4">
                  <Pressable onPress={handleApply} className="bg-black rounded-full py-4 items-center">
                    <Text className="text-white font-bold text-base">Apply Filter</Text>
                  </Pressable>
                </View>

              </View>
            </GestureHandlerRootView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}