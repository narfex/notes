// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "aibtc-d7138.firebaseapp.com",
  projectId: "aibtc-d7138",
  storageBucket: "aibtc-d7138.appspot.com",
  messagingSenderId: "750860643521",
  appId: "1:750860643521:web:f2c6744a09746d11cdf840"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFileToFirebase(image_url: string, name: string) {
  try {
    // Fetch the image from the URL
    const response = await fetch(image_url);
    
    // Check if the response is okay
    if (!response.ok) {
      throw new Error(`Failed to fetch image from URL: ${response.statusText}`);
    }

    // Convert the response to an array buffer
    const buffer = await response.arrayBuffer();

    // Create a unique file name
    const file_name = name.replace(/\s+/g, '') + Date.now() + ".jpeg";

    // Get a reference to the storage
    const storageRef = ref(storage, file_name);

    // Upload the file
    await uploadBytes(storageRef, new Uint8Array(buffer), {
      contentType: "image/jpeg",
    });

    // Get the download URL
    const firebase_url = await getDownloadURL(storageRef);

    // Return the download URL
    return firebase_url;

  } catch (error) {
    console.error("Error uploading file to Firebase:", error);
    throw error;
  }
}
