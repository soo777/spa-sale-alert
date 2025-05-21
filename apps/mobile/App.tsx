import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "react-native-elements";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "./screens/Main";

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

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SafeAreaView style={styles.container}>
          <Main />
        </SafeAreaView>
      </ThemeProvider>
    </QueryClientProvider>
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
