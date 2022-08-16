import style from './HeaderModuleForm.module.css';

export const HeaderModuleForm = () => {
  return (
    <>
      <div className={style.header__content}>
        <input id="title"
          className={style.text__input}
          type="text" placeholder='Введите название' />
        <label for="title" className={style.label}>Название</label>
        <input id={"description"}
          className={style.text__input}
          type="text"
          placeholder='Добавьте описание...' />
        <label for="description" className={style.label}>Описание</label>
      </div>

      <div className={style.container__permissions}>
        <div className={style.permissions}>
          <div className={style.permission}>
            <div>
              <span>Видно всем</span>
            </div>
            <div>
              <button>Изменить</button>
            </div>
          </div>
          <div className={style.permission}>
            <div>
              <span>Редактируется только мной</span>
            </div>
            <div>
              <button>Изменить</button>
            </div>
          </div>
        </div>
        <div className={style.wrapper}>
          <button>⇆</button>
        </div>
      </div>
    </>
  );
}