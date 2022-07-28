import style from './TestModule.module.css';
import { ListCardsTrueFalse } from '../../components/ListCardsTrueFalse';

export const TestModule = () => {
  return (
    <div className={style.container}>
      <ListCardsTrueFalse />
    </div>
  );
}