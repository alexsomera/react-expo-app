// AlbumsViewModel.ts
import { useState, useEffect } from 'react';
import { Album, fetchAlbums } from '../Model/AlbumModel';

export function useAlbumsViewModel(userId: string) {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);

    useEffect(() => {
        async function loadAlbums() {
            const albums = await fetchAlbums();
            setAlbums(albums);
            // Filter albums by user ID
            const userAlbums = albums.filter(album => album.userId === parseInt(userId));
            setFilteredAlbums(userAlbums);
        }
        loadAlbums();
    }, [userId]);

    return {
        albums,
        filteredAlbums,
    };
}