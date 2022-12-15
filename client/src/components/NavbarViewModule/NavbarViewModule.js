import style from './NavbarViewModule.module.scss';

export const NavbarViewModule = (props) => {
  return (
    <div className={style.container}>
      <div className={style.container__content}>
        <div className={style.title}>
          {props.title}
        </div>
        
        <div className={style.button__edit__module}>
          <button>Учить</button>
        </div>
      </div>
    </div>
  );
}