import { Feather } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Dimensions, Modal, Pressable, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import { GestureDetector, Gesture, GestureHandlerRootView } from "react-native-gesture-handler";

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

const SCREEN_WIDTH = Dimensions.get("window").width;
const SLIDER_WIDTH = SCREEN_WIDTH - 16 * 2 - 16 * 2;
const MIN = 0;
const MAX = 500;
const HANDLE_SIZE = 24;

const satoshi = { fontFamily: "Satoshi-Variable", fontWeight: "400" as const, fontSize: 14, lineHeight: 20, letterSpacing: 0 };

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
    .onBegin(() => { minStartX.current = toPercent(minVal) * SLIDER_WIDTH; })
    .onUpdate((e) => {
      const newX = Math.max(0, Math.min(toPercent(maxVal) * SLIDER_WIDTH - 20, minStartX.current + e.translationX));
      onMinChange(toValue(newX));
    });

  const maxGesture = Gesture.Pan()
    .runOnJS(true)
    .onBegin(() => { maxStartX.current = toPercent(maxVal) * SLIDER_WIDTH; })
    .onUpdate((e) => {
      const newX = Math.max(toPercent(minVal) * SLIDER_WIDTH + 20, Math.min(SLIDER_WIDTH, maxStartX.current + e.translationX));
      onMaxChange(toValue(newX));
    });

  return (
    <View className="mt-4 mb-2">
      <View className="flex-row justify-between mb-4">
        <Text style={{ ...satoshi, color: "#6b7280" }}>
          Min: <Text style={{ fontWeight: "700", color: "#111827" }}>${minVal}</Text>
        </Text>
        <Text style={{ ...satoshi, color: "#6b7280" }}>
          Max: <Text style={{ fontWeight: "700", color: "#111827" }}>${maxVal}</Text>
        </Text>
      </View>

      <View style={{ height: HANDLE_SIZE + 8, justifyContent: "center" }}>
        <View style={{ height: 4, backgroundColor: "#e5e7eb", borderRadius: 2, width: SLIDER_WIDTH }} />
        <View style={{
          position: "absolute", height: 4, backgroundColor: "#000", borderRadius: 2,
          left: minLeft, width: Math.max(0, maxLeft - minLeft),
        }} />
        <GestureDetector gesture={minGesture}>
          <View style={{
            position: "absolute", left: minLeft - HANDLE_SIZE / 2,
            width: HANDLE_SIZE, height: HANDLE_SIZE, borderRadius: HANDLE_SIZE / 2,
            backgroundColor: "#000", shadowColor: "#000", shadowOpacity: 0.25, shadowRadius: 4, elevation: 4,
          }} />
        </GestureDetector>
        <GestureDetector gesture={maxGesture}>
          <View style={{
            position: "absolute", left: maxLeft - HANDLE_SIZE / 2,
            width: HANDLE_SIZE, height: HANDLE_SIZE, borderRadius: HANDLE_SIZE / 2,
            backgroundColor: "#000", shadowColor: "#000", shadowOpacity: 0.25, shadowRadius: 4, elevation: 4,
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

  const toggleColor = (color: string) => setSelectedColors((prev) =>
    prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
  );

  const toggleSize = (size: string) => setSelectedSizes((prev) =>
    prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
  );

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
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose} statusBarTranslucent>
      <GestureHandlerRootView className="flex-1">
        <TouchableWithoutFeedback onPress={onClose}>
          <View className="flex-1 justify-end" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
            <TouchableWithoutFeedback>
              <View className="bg-white w-full rounded-t-[20px] pb-8" style={{ maxHeight: "90%" }}>

                {/* Header - Filters solda, X sağda */}
                <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
                  <Text style={{ fontFamily: "IntegralCF-Bold", fontSize: 20, color: "#111827" }}>Filters</Text>
                  <Pressable onPress={onClose}>
                    <Feather name="x" size={22} color="#000" />
                  </Pressable>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>

                  {/* Categories */}
                  <View className="border-b border-gray-100">
                    {CATEGORIES.map((cat) => (
                      <Pressable key={cat} className="flex-row items-center justify-between px-4 py-4 border-b border-gray-50">
                        <Text style={{ ...satoshi, color: "#374151" }}>{cat}</Text>
                        <Feather name="chevron-right" size={16} color="#9ca3af" />
                      </Pressable>
                    ))}
                  </View>

                  {/* Price */}
                  <View className="px-4 py-4 border-b border-gray-100">
                    <Pressable onPress={() => setOpenPrice(!openPrice)} className="flex-row items-center justify-between">
                      <Text style={{ ...satoshi, fontWeight: "700", fontSize: 16, color: "#111827" }}>Price</Text>
                      <Feather name={openPrice ? "chevron-up" : "chevron-down"} size={18} color="#000" />
                    </Pressable>
                    {openPrice && (
                      <View className="px-4">
                        <RangeSlider minVal={minPrice} maxVal={maxPrice} onMinChange={setMinPrice} onMaxChange={setMaxPrice} />
                      </View>
                    )}
                  </View>

                  {/* Colors */}
                  <View className="px-4 py-4 border-b border-gray-100">
                    <Pressable onPress={() => setOpenColors(!openColors)} className={`flex-row items-center justify-between ${openColors ? "mb-4" : ""}`}>
                      <Text style={{ ...satoshi, fontWeight: "700", fontSize: 16, color: "#111827" }}>Colors</Text>
                      <Feather name={openColors ? "chevron-up" : "chevron-down"} size={18} color="#000" />
                    </Pressable>
                    {openColors && (
                      <View className="flex-row flex-wrap gap-3">
                        {COLORS.map((color) => (
                          <Pressable
                            key={color}
                            onPress={() => toggleColor(color)}
                            style={{
                              width: 36, height: 36, borderRadius: 18, backgroundColor: color,
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
                  <View className="px-4 py-4 border-b border-gray-100">
                    <Pressable onPress={() => setOpenSizes(!openSizes)} className={`flex-row items-center justify-between ${openSizes ? "mb-4" : ""}`}>
                      <Text style={{ ...satoshi, fontWeight: "700", fontSize: 16, color: "#111827" }}>Size</Text>
                      <Feather name={openSizes ? "chevron-up" : "chevron-down"} size={18} color="#000" />
                    </Pressable>
                    {openSizes && (
                      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                        {SIZES.map((size) => {
                          const selected = selectedSizes.includes(size);
                          return (
                            <Pressable
                              key={size}
                              onPress={() => toggleSize(size)}
                              style={{
                                width: (SCREEN_WIDTH - 32 - 16) / 3,
                                paddingVertical: 10, borderRadius: 20,
                                backgroundColor: selected ? "#000" : "#F0F0F0",
                                alignItems: "center", justifyContent: "center",
                              }}
                            >
                              <Text style={{ ...satoshi, fontSize: 12, color: selected ? "#fff" : "#374151" }}>
                                {size}
                              </Text>
                            </Pressable>
                          );
                        })}
                      </View>
                    )}
                  </View>

                  {/* Dress Style */}
                  <View className="px-4 py-4">
                    <Pressable onPress={() => setOpenDressStyle(!openDressStyle)} className={`flex-row items-center justify-between ${openDressStyle ? "mb-4" : ""}`}>
                      <Text style={{ ...satoshi, fontWeight: "700", fontSize: 16, color: "#111827" }}>Dress Style</Text>
                      <Feather name={openDressStyle ? "chevron-up" : "chevron-down"} size={18} color="#000" />
                    </Pressable>
                    {openDressStyle && DRESS_STYLES.map((style) => (
                      <Pressable
                        key={style}
                        onPress={() => setSelectedStyle(style === selectedStyle ? null : style)}
                        className="flex-row items-center justify-between py-3 border-b border-gray-50"
                      >
                        <Text style={{ ...satoshi, fontWeight: selectedStyle === style ? "700" : "400", color: selectedStyle === style ? "#111827" : "#374151" }}>
                          {style}
                        </Text>
                        <Feather name="chevron-right" size={16} color="#9ca3af" />
                      </Pressable>
                    ))}
                  </View>

                </ScrollView>

                {/* Apply + Reset Buttons */}
                <View className="px-4 pt-4 gap-3">
                  <Pressable onPress={handleApply} className="bg-black rounded-full py-4 items-center">
                    <Text style={{ ...satoshi, fontWeight: "700", color: "white", fontSize: 16 }}>Apply Filter</Text>
                  </Pressable>
                  <Pressable onPress={handleReset} className="border border-gray-300 rounded-full py-4 items-center">
                    <Text style={{ ...satoshi, fontWeight: "600", color: "#374151", fontSize: 16 }}>Reset</Text>
                  </Pressable>
                </View>

              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </GestureHandlerRootView>
    </Modal>
  );
}
