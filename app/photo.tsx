import React from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { commonStyles } from "../assets/styles";
import { usePhotoViewModel } from "../ViewModel/PhotoViewModel";

export default function Photo() {
  const { photoUrl, photoTitle } = useLocalSearchParams();
  const { photo, error, setError } = usePhotoViewModel(photoUrl);

  return (
    <ScrollView style={commonStyles.container}>
      <Text style={commonStyles.title}>{photoTitle}</Text>
      <View style={Styles.imageContainer}>
        <Image
          source={error ? require('../assets/images/placeholder.png') : { uri: photoUrl }}
          style={Styles.image}
          resizeMode="contain"
          onError={() => setError(true)}
        />
      </View>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
  },
});