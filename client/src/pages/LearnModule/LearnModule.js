import { Navbar, CardWriteAnswer, ModeControls, WriteEndView } from '../../components';
import style from './LearnModule.module.css';

export const LearnModule = () => {
  return (
    <>
      <Navbar />

      <div className={style.container}>
        <div className={style.container__content}>
          <ModeControls />
          {/* <CardWriteAnswer /> */}
          <WriteEndView />
        </div>
      </div>
    </>
  );
}