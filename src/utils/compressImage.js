import imageCompression from 'browser-image-compression';

const compressImage = async file => {
  try {
    const compressedImage = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1440,
      fileType: 'image/jpeg',
      initialQuality: 0.9,
      useWebWorker: true,
    });
    
    return compressedImage;
  } catch (err) {
    console.error('Image compress fail', err);

    return file;
  }
};

export default compressImage;
