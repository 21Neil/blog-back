import imageCompression from 'browser-image-compression';

const compressImage = async file => {
  return await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1440,
    fileType: 'image/jpeg',
    initialQuality: 0.9,
    useWebWorker: true,
  });
};

export default compressImage;
