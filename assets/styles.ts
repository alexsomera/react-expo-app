import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBlock: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  search: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#E9F7FF',
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 16,
  }
});