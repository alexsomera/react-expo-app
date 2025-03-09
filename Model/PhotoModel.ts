export interface Photo {
    id: number;
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: string;
  }
  
  export async function fetchPhoto(photoUrl: string): Promise<Photo> {
    const response = await fetch(photoUrl);
    const data = await response.json();
    return data;
  }