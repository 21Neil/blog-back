const createPostFormData = (values, published) => {
  const formData = new FormData();
  formData.append('title', values.title);
  formData.append('TEXTContent', values.TEXTContent);
  formData.append('HTMLContent', values.HTMLContent);
  formData.append('JSONContent', JSON.stringify(values.JSONContent));
  formData.append('cover_image', values.image);
  formData.append('published', published);

  return formData
};

export default createPostFormData;
