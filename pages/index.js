import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { FiUser, FiLock } from 'react-icons/fi';


function Home() {

  const loginHandler = () => {
    alert('ok it works');
  }
  
  return (
    <div>
      <Head>
        <title>SADC Console</title>
      </Head>
      <div className={styles.page}>
        <div className={styles.titleContainer}>
          <span>Welcome to the SADC Console.</span>
        </div>
        <div className={styles.loginContainer}>
          {/* <div className={styles.login}>
            <div className={styles.icon}>
              <FiUser />
            </div>
            <div>
              <form>
                <input type="text" className={styles.userForm} placeholder="Username" />
              </form>
            </div>
          </div>
          <div className={styles.password}>
            <div className={styles.icon}>
              <FiLock />
            </div>
            <div>
              <form>
                <input type="password" className={styles.passwordForm} placeholder="Password" />
              </form>
            </div>
          </div> */}
          <Link href="/dashboard">
            <div className={styles.loginButton}>
              <a>
                <span>Login</span>
              </a>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;