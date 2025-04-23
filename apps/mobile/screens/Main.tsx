import React, { useRef, useState } from "react";
import { SectionList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-elements";
import { brandData } from "../constant/brand";
import BrandModal from "../components/BrandModal";

export default function Main() {
  const sectionListRef = useRef<SectionList>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = (brand: string) => {
    console.log(brand);
    setSelectedBrand(brand);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.title}>
        <Text h3>Brands</Text>
      </View>
      <View style={styles.container}>
        <SectionList
          ref={sectionListRef}
          sections={brandData}
          keyExtractor={(item, index) => item + index}
          initialNumToRender={30}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openModal(item)}>
              <View style={styles.item}>
                <Text style={styles.itemText}>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{title}</Text>
            </View>
          )}
        />
      </View>

      <BrandModal
        isModalOpen={isModalVisible}
        closeModal={closeModal}
        selectedBrand={selectedBrand}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  title: {
    alignSelf: "flex-start",
    padding: 10,
  },
  item: {
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    backgroundColor: "white",
  },
  itemText: {
    fontSize: 16,
  },
  sectionHeader: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#f0f0f0",
  },
  sectionText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
