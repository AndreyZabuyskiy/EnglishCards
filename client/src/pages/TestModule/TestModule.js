import style from './TestModule.module.css';
import { ListCardsTrueFalse } from '../../components/ListCardsTrueFalse';
import { ListCardChoiceAnswer } from '../../components/ListCardChoiceAnswer';
import { ListCardWriteAnswer } from '../../components/ListCardWriteAnswer/ListCardWriteAnswer';

export const TestModule = () => {
  return (
    <div className={style.container}>
      <ListCardWriteAnswer />
    </div>
  );
}