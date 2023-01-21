import style from './NavbarModules.module.css';

export const NavbarModules = () => {
  return (
    <div className={style.container}>
      <div className={style.modules}>
        <div className={style.module}>
          <div>test module 20</div>
          <div>user_557</div>
        </div>
        <div className={style.module}>
          <div>test module 20</div>
          <div>user_557</div>
        </div>
      </div>
      <div className={style.footer}>
        <button>Show all the modules</button>
      </div>
    </div>
  );
}