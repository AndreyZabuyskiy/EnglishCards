import style from './TestModule.module.css';
import { ListCardsTrueFalse } from '../../components/ListCardsTrueFalse';
import { ListCardChoiceAnswer } from '../../components/ListCardChoiceAnswer';
import { ListCardWriteAnswer } from '../../components/ListCardWriteAnswer/ListCardWriteAnswer';
import { CardWordsSelection } from '../../components/CardWordsSelection/CardWordsSelection';

export const TestModule = () => {
  return (
    <div className={style.container}>
      <CardWordsSelection />
    </div>
  );
}