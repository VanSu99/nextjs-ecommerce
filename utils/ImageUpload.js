export default async function ImageUpload(images) {
  let imgArr = [];
  for(const item of images) {
    const formData = new FormData();
    formData.append('file', item);
  }

  return imgArr;
}
