import style from './TestModule.module.css';
import { ListCardsTrueFalse, ListCardChoiceAnswer, ListCardWriteAnswer, CardWordsSelection }
  from '../../components';

export const TestModule = () => {
  return (
    <div className={style.container}>
      <ListCardsTrueFalse />
      <ListCardChoiceAnswer />
      <ListCardWriteAnswer />
      <CardWordsSelection />
    </div>
  );
}