import style from './NavbarModuleForm.module.css';

export const NavbarModuleForm = () => {
  return (
    <div className={style.navbar}>
      <div className={style.container}>
        <div>
          Создать новый учебный модуль
        </div>
        <div>
          <button type="">Создать</button>
        </div>
      </div>
    </div>
  );
}