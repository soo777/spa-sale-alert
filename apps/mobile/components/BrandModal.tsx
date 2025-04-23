import { Linking, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { Text } from "react-native-elements";
import ZaraLogo from "../assets/svg/brand_logo/zara.svg";
import InstagramLogo from "../assets/svg/brand_logo/instagram.svg";
import { brandInfo } from "../constant/brand";

interface BrandModalProps {
  isModalOpen: boolean;
  selectedBrand?: string | null;
  closeModal: () => void;
}

export default function BrandModal({
  isModalOpen,
  selectedBrand,
  closeModal,
}: BrandModalProps) {
  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <>
      <Modal
        isVisible={isModalOpen}
        onBackdropPress={closeModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropTransitionOutTiming={0}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text h4>{selectedBrand}</Text>
          <ZaraLogo style={styles.logo} />
          <Text style={styles.brandDetail}>{`세일 여부: ${
            brandInfo["ZARA"].isOnsale ? "지금 세일중🔥🔥🔥" : "세일 ❌"
          }`}</Text>
          <Text style={styles.brandDetail}>
            {`세일 내용: ${brandInfo["ZARA"].saleInfo.description}`}
          </Text>
          <Text style={styles.brandDetail}>
            {brandInfo["ZARA"].description}
          </Text>
          <View style={styles.brandLink}>
            <Text
              style={styles.pdt_3}
              onPress={() => {
                handleLinkPress(brandInfo.ZARA.url);
              }}
            >
              🌐 홈페이지
            </Text>
            <View style={styles.flex_row}>
              <InstagramLogo width={22} height={22} />
              <Text
                style={{ alignSelf: "center" }}
                onPress={() => {
                  handleLinkPress(brandInfo.ZARA.instagram);
                }}
              >
                인스타그램
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    paddingBottom: 60,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    minHeight: 200,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  brandDetail: {
    paddingTop: 5,
  },
  brandLink: {
    flexDirection: "row",
    paddingTop: 5,
  },
  pdt_3: {
    paddingTop: 3,
  },
  flex_row: {
    flexDirection: "row",
  },
});
