import regStyles from '@/views/auth/register.module.css';
import styles from './AuthForm.module.css';
import { useEffect } from 'react';
import formLogo from '@/assets/logo_form.png'
import FormBackgroundSvg from './svg/FormBackgroundSvg';

interface Props<T> {
  content: T
  setFormData: () => void
  handleSubmit: () => void
}

function AuthForm<T> ({ content, setFormData, handleSubmit }: Props<T>) {
  useEffect(() => {
    const parent = document.querySelector(`.${regStyles.container}`)!;
    const svg = parent.querySelector('svg') as SVGElement | null;

    function scaleSVG() {
      const { width, height } = parent.getBoundingClientRect();

      if (svg) {
        svg.setAttribute('height', `${height}`);
        svg.setAttribute('width', `${width}`);
      }
    }

    // window.addEventListener('resize', scaleSVG);
    // scaleSVG();

    return () => {
      window.removeEventListener('resize', scaleSVG);
    }
  })

  return (
    <>
      <div className={styles.svgContainer}>
        <FormBackgroundSvg classes={{ shadow: styles.shadow }} />
      </div>

      <div className={styles.form}>
        <div className={styles.formContainer}>
          <img src={formLogo} alt="form logo" />
          <div className={styles.formTitle}>
            <h4>Registration</h4>
            <p>For Both Staff & Students</p>
          </div>

          <div className={styles.formContainer}>
            <form></form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthForm;
