import Link from 'next/link'
import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a><img className={styles.logo} src='https://www.mobilku.com/_nuxt/img/a8376d9.svg' alt='logo' /></a>
      </Link>
    </header>
  );
}

export default Header;
