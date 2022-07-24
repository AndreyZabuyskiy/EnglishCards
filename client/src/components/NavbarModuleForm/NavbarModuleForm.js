import style from './NavbarModuleForm.module.css';

export const NavbarModuleForm = () => {
  return (
    <div className={style.navbar}>
      <div className={style.container}>
        <div>Создать новый учебный модуль</div>
        <div><button className={style.button}>Создать</button></div>
      </div>
    </div>
  );
}