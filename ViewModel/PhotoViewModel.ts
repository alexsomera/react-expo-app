import { useState, useEffect } from 'react';
import { Photo, fetchPhoto } from '../Model/PhotoModel';

export function usePhotoViewModel(photoUrl: string) {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadPhoto() {
      try {
        const photo = await fetchPhoto(photoUrl);
        setPhoto(photo);
      } catch (e) {
        setError(true);
      }
    }
    loadPhoto();
  }, [photoUrl]);

  return {
    photo,
    error,
    setError,
  };
}