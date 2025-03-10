import React from 'react';
import { Text, TextInput, View, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { commonStyles } from "../assets/styles";
import { usePhotosViewModel } from "../ViewModel/PhotosViewModel";
import { MaterialIcons } from '@expo/vector-icons';

export default function Photos() {
    const router = useRouter();
    const { albumId } = useLocalSearchParams();
    const albumIdString = Array.isArray(albumId) ? albumId[0] : albumId;
    const {
        filteredPhotos,
        errorPhotos,
        searchQuery,
        setSearchQuery,
        handleImageError,
    } = usePhotosViewModel(albumIdString);

    const handlePhotoClick = (photoUrl: string, photoTitle: string) => {
        router.push(`/photo?photoUrl=${photoUrl}&photoTitle=${encodeURIComponent(photoTitle)}`);
    };

    return (
        <FlatList
            ListHeaderComponent={
                <>
                    <Text style={commonStyles.title}>Selecione uma foto</Text>
                    <View style={commonStyles.search}>
                        <MaterialIcons name="search" size={24} color="black" />
                        <TextInput
                            style={{ flex: 1 }}
                            placeholder="Pesquisar fotos..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </>
            }
            data={filteredPhotos}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handlePhotoClick(item.url, item.title)} style={styles.itemContainer}>
                    <View style={styles.item}>
                        <Image
                            source={errorPhotos.has(item.id) ? require('../assets/images/thumbnail.png') : { uri: item.thumbnailUrl }}
                            style={styles.image}
                            onError={() => handleImageError(item.id)}
                        />
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                </TouchableOpacity>
            )}
            contentContainerStyle={commonStyles.container}
        />
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        margin: 5,
    },
    item: {
        margin: 5,
        flex: 1,
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 100,
    },
    title: {
        marginTop: 5,
    }
});