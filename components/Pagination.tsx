import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 16, gap: 4 }}>
      {/* Previous */}
      <Pressable
        onPress={() => currentPage > 1 && onPageChange(currentPage - 1)}
        style={{
          flexDirection: "row", alignItems: "center", gap: 4,
          paddingHorizontal: 12, paddingVertical: 8,
          borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 8,
          opacity: currentPage === 1 ? 0.4 : 1,
        }}
      >
        <Feather name="arrow-left" size={14} color="#374151" />
        <Text style={{ fontSize: 13, color: "#374151", fontWeight: "500" }}>Previous</Text>
      </Pressable>

      {/* Page Numbers */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 4, alignItems: "center" }}>
        {getPages().map((page, index) =>
          page === "..." ? (
            <Text key={`dots-${index}`} style={{ paddingHorizontal: 8, color: "#9ca3af", fontSize: 13 }}>...</Text>
          ) : (
            <Pressable
              key={page}
              onPress={() => onPageChange(page as number)}
              style={{
                width: 36, height: 36, borderRadius: 8,
                alignItems: "center", justifyContent: "center",
                backgroundColor: currentPage === page ? "#000" : "transparent",
                borderWidth: currentPage === page ? 0 : 1,
                borderColor: "#e5e7eb",
              }}
            >
              <Text style={{
                fontSize: 13, fontWeight: "600",
                color: currentPage === page ? "#fff" : "#374151",
              }}>
                {page}
              </Text>
            </Pressable>
          )
        )}
      </ScrollView>

      {/* Next */}
      <Pressable
        onPress={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        style={{
          flexDirection: "row", alignItems: "center", gap: 4,
          paddingHorizontal: 12, paddingVertical: 8,
          borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 8,
          opacity: currentPage === totalPages ? 0.4 : 1,
        }}
      >
        <Text style={{ fontSize: 13, color: "#374151", fontWeight: "500" }}>Next</Text>
        <Feather name="arrow-right" size={14} color="#374151" />
      </Pressable>
    </View>
  );
}
