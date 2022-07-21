import style from './ModuleForm.module.css';
import { Navbar } from '../../components/Navbar';
import { NavbarModuleForm } from '../../components/NavbarModuleForm';

export const ModuleForm = () => {
  return (
    <div>
      <Navbar />

      <div className={style.container}>
        <NavbarModuleForm />
        
        <div className={style.content}>
          Module form main
        </div>
      </div>
    </div>
  );
}