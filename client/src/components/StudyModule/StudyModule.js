import style from './StudyModule.module.css';

export const StudyModule = (props) => {
  return (
    <div className={style.module}>
      <div>
        <span className={style.count__words}> { props.countWords } words</span>
        <span className={style.login}>{ props.login }</span>
      </div>
      <div className={style.title}>{ props.title }</div>
    </div>
  );
}