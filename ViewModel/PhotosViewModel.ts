import { useState, useEffect } from 'react';
import { Photo, fetchPhotos } from '../Model/PhotosModel';

export function usePhotosViewModel(albumId: string) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [errorPhotos, setErrorPhotos] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    async function loadPhotos() {
      const photos = await fetchPhotos();
      setPhotos(photos);
      // Filter photos by album ID
      const albumPhotos = photos.filter(photo => photo.albumId === parseInt(albumId));
      setFilteredPhotos(albumPhotos);
    }
    loadPhotos();
  }, [albumId]);

  useEffect(() => {
    // Filter photos based on search query
    const filtered = photos.filter(photo =>
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) && photo.albumId === parseInt(albumId)
    );
    setFilteredPhotos(filtered);
  }, [searchQuery, photos, albumId]);

  const handleImageError = (id: number) => {
    setErrorPhotos(prev => new Set(prev).add(id));
  };

  return {
    photos,
    filteredPhotos,
    errorPhotos,
    searchQuery,
    setSearchQuery,
    handleImageError,
  };
}