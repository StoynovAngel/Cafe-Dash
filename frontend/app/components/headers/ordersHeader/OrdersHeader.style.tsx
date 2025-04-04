import { StyleSheet } from "react-native";
import theme from "@/app/theme/theme";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    elevation: theme.elevation.sm,
    height: 60,
  },
  backButton: {
    marginLeft: "auto",
    marginRight: -4,
    height: 50,
    width: 50,
  },
  headerTitle: {
    fontSize: theme.fontSizes.header,
    color: theme.colors.textPrimary,
    fontWeight: "bold",
  },
});

export default styles;
