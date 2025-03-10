import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { commonStyles } from "../assets/styles";
import { useUsersViewModel } from "../ViewModel/UsersViewModel";
import { MaterialIcons } from '@expo/vector-icons';

export default function Index() {
    const {
        filteredUsers,
        searchQuery,
        setSearchQuery,
    } = useUsersViewModel();
    const router = useRouter();

    return (
        <ScrollView style={commonStyles.container}>
            <Text style={commonStyles.title}>Selecione um usuário</Text>
            <View style={commonStyles.search}>
                <MaterialIcons name="search" size={24} color="black" />
                <TextInput
                    style={{ flex: 1 }}
                    placeholder="Pesquisar usuários..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            {filteredUsers.map(user => (
                <TouchableOpacity key={user.id} onPress={() => router.push(`/albums?id=${user.id}`)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, paddingBlock: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialIcons name="person" size={24} color="black" />
                        </View>
                        <Text>{user.name}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}
