import style from './TestModule.module.css';
import { ListCardsTrueFalse } from '../../components/ListCardsTrueFalse';
import { ListCardChoiceAnswer } from '../../components/ListCardChoiceAnswer';

export const TestModule = () => {
  return (
    <div className={style.container}>
      <ListCardChoiceAnswer />
    </div>
  );
}