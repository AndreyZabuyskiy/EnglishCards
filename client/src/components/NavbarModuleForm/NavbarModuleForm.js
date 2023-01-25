import style from './NavbarModuleForm.module.css';

export const NavbarModuleForm = () => {
  return (
    <div className={style.navbar}>
      <div className={style.container}>
        <div>Create new study module</div>
        <div><button className={style.button}>Create</button></div>
      </div>
    </div>
  );
}