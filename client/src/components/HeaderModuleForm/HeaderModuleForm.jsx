import React from 'react';
import style from './HeaderModuleForm.module.css';

export const HeaderModuleForm = React.memo(({ title, setTitle, description, setDescription }) => {
  return (
    <>
      <div className={style.header__content}>
        <input id="title" className={style.text__input}
          type="text" placeholder='Enter the title...'
          value={title} onChange={setTitle} />
        <label htmlFor="title" className={style.label}>Title</label>
        <input id={"description"} className={style.text__input}
          type="text" placeholder='Add description...'
          value={description} onChange={setDescription} />
        <label htmlFor="description" className={style.label}>Description</label>
      </div>

      <div className={style.container__permissions}>
        <div className={style.permissions}>
          <div className={style.permission}>
            <div>
              <span>Visibility: public</span>
            </div>
            <div>
              <button>Change</button>
            </div>
          </div>
          <div className={style.permission}>
            <div>
              <span>Who can edit: me only</span>
            </div>
            <div>
              <button>Change</button>
            </div>
          </div>
        </div>
        <div className={style.wrapper}>
          <button>⇆</button>
        </div>
      </div>
    </>
  );
});