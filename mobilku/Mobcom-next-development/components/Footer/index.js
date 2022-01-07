import Link from 'next/link'
import styles from './Footer.module.css'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link href=''>
        <a className={styles['footer-icon-container']}>
          <Image className={styles['footer-icon-item']} src='/icon/home.svg' width={50} height={50} />
          <span>
            Home
          </span>
        </a>
      </Link>
      <Link href=''>
        <a className={styles['footer-icon-container']}>
          <Image className={styles['footer-icon-item']} src='/icon/news.svg' width={50} height={50} />
          <span>
            News
          </span>
        </a>
      </Link>
      <Link href=''>
        <a className={styles['footer-icon-container-big']}>
          <Image className={styles['footer-icon-item']} src='/icon/mobildijual.svg' width={90} height={90} />
          <span>
            Cari
          </span>
        </a>
      </Link>
      <Link href=''>
        <a className={styles['footer-icon-container']}>
          <Image className={styles['footer-icon-item']} src='/icon/careview.svg' width={50} height={50} />
          <span>
            eView
          </span>
        </a>
      </Link>
      <Link href=''>
        <a className={styles['footer-icon-container']}>
          <Image className={styles['footer-icon-item']} src='/icon/account.svg' width={50} height={50} />
          <span>
            Account
          </span>
        </a>
      </Link>
    </footer>
  );
}

export default Footer;
