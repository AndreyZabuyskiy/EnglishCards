import style from './ImageUploadButton.module.css';

export const ImageUploadButton = () => {
  return (
    <>
      <input type='file' id="file" className={style.file} accept='image/*' />
      <label for='file'className={style.label}>Добавить изображение</label>
    </>
  );
}