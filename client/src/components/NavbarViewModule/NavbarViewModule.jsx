import style from './NavbarViewModule.module.scss';

export const NavbarViewModule = ({title}) => {
  return (
    <div className={style.container}>
      <div className={style.container__content}>
        <div className={style.title}>
          {title}
        </div>
        
        <div className={style.button__edit__module}>
          <button>Learn</button>
        </div>
      </div>
    </div>
  );
}