import { Feather } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SCREEN_WIDTH } from "../constants/layout";

const REVIEWS = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    name: "Alex K.",
    rating: 5,
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable.",
  },
  {
    name: "James L.",
    rating: 4,
    text: "As someone who's picky about clothing, I'm impressed with Shop.co's quality. The stitching is excellent and the materials feel premium.",
  },
  {
    name: "Mooen A.",
    rating: 4,
    text: "As someone who is always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The clothes have a distinct style.",
  },
];

const CARD_W = SCREEN_WIDTH * 0.82;
const SIDE_PADDING = (SCREEN_WIDTH - CARD_W) / 2;
const ITEM_GAP = 12;

export default function HappyCustomers() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const goNext = () => {
    const next = Math.min(activeIndex + 1, REVIEWS.length - 1);
    setActiveIndex(next);
    flatListRef.current?.scrollToIndex({ index: next, animated: true });
  };

  const goPrev = () => {
    const prev = Math.max(activeIndex - 1, 0);
    setActiveIndex(prev);
    flatListRef.current?.scrollToIndex({ index: prev, animated: true });
  };

  return (
    <View style={{ paddingTop: 32, paddingBottom: 32 }}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 mb-4">
        <Text className="text-2xl font-black uppercase leading-tight">
          Our Happy{"\n"}Customers
        </Text>
        <View className="flex-row gap-3">
          <Pressable
            onPress={goPrev}
            style={{ opacity: activeIndex === 0 ? 0.3 : 1 }}
            className="w-8 h-8 rounded-full border border-gray-300 items-center justify-center"
          >
            <Feather name="arrow-left" size={16} color="#000" />
          </Pressable>
          <Pressable
            onPress={goNext}
            style={{ opacity: activeIndex === REVIEWS.length - 1 ? 0.3 : 1 }}
            className="w-8 h-8 rounded-full border border-gray-300 items-center justify-center"
          >
            <Feather name="arrow-right" size={16} color="#000" />
          </Pressable>
        </View>
      </View>

      {/* Reviews */}
      <FlatList
        ref={flatListRef}
        data={REVIEWS}
        keyExtractor={(item) => item.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_W + ITEM_GAP}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: SIDE_PADDING,
          gap: ITEM_GAP,
        }}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / (CARD_W + ITEM_GAP));
          setActiveIndex(index);
        }}
        renderItem={({ item }) => (
          <View
            style={{ width: CARD_W }}
            className="border border-gray-200 rounded-2xl p-5"
          >
            <Text className="text-yellow-400 text-base mb-2">
              {"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}
            </Text>
            <View className="flex-row items-center gap-1 mb-3">
              <Text className="font-bold text-gray-900">{item.name}</Text>
              <Feather name="check-circle" size={14} color="#22c55e" />
            </View>
            <Text className="text-gray-500 text-sm leading-relaxed">"{item.text}"</Text>
          </View>
        )}
      />
    </View>
  );
}
