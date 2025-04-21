import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "react-native-elements";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const theme = {
  colors: {
    primary: "#007bff",
    background: "#f8f9fa",
    text: "#212529",
  },
  components: {
    Button: {
      raised: true,
    },
  },
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <View>
          <Text>Open up App.tsx to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
