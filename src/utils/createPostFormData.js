const createPostFormData = (values, published) => {
  const formData = new FormData();

  formData.append('title', values.title);
  formData.append('content', values.content);
  formData.append('cover_image', values.image);
  formData.append('published', published);

  return formData
};

export default createPostFormData;
