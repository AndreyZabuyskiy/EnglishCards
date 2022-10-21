import { Navbar, CardWriteAnswer, ModeControls } from '../../components';
import style from './LearnModule.module.css';

export const LearnModule = () => {
  return (
    <>
      <Navbar />

      <div className={style.container}>
        <ModeControls />
        <CardWriteAnswer />
      </div>
    </>
  );
}