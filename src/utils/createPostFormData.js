import compressImage from './compressImage';

const createPostFormData = async (values, published) => {
  const formData = new FormData();
  const compressedImage = await compressImage(values.image);

  formData.append('title', values.title);
  formData.append('TEXTContent', values.TEXTContent);
  formData.append('HTMLContent', values.HTMLContent);
  formData.append('JSONContent', JSON.stringify(values.JSONContent));
  formData.append('cover_image', compressedImage);
  formData.append('published', published);

  return formData;
};

export default createPostFormData;
