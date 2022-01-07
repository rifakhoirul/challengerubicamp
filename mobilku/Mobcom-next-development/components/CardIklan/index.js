import Link from 'next/link';
import styles from './CardIklan.module.css';

const CardIklan = ({name, city, imgCar, title, price, year, km, transmission, bbm}) => {
  return (
    <div className={styles['card-mobil-dijual']}>
      <Link href='/'>
        <a className={styles['box-mobil-dijual-container']}>
          <div className={styles['zoomOut-mobil-dijual']}>
            <div style={{position: 'relative'}}>
              <div style={{backgroundImage: `url(${imgCar})`}} className={styles['zoomIn-mobil-dijual']}></div>
              <div className={styles['sign-mobil-dijual-container']}>
                <img src='https://www.mobilku.net/frnt/fl/icon/inspected-02.png' />
              </div>
            </div>
            <div className={styles['btn-mobil-djiual-container']}>
              <button className={styles['btn-jual-cepat']}>Jual Cepat</button>
              <span>
                <div>
                  <img src='https://www.mobilku.net/frnt/fl/icon/play-button.png' />
                </div>
              </span>
            </div>
          </div>
          <div className={styles['detail-mobil-dijual-container']}>
            <p className={styles['title-iklan']}>{title}</p>
            <p className={styles['price-iklan']}>{price}</p>
            <div className={styles['grid-spec-mobil-dijual']}>
              <div className={styles['spec-mobil-dijual']}>
                <img src='https://www.mobilku.com/_nuxt/img/9d44bcb.svg' />
                <p className={styles['detail-spec-mobil-dijual']}>{year}</p>
              </div>
              <div className={styles['spec-mobil-dijual']}>
                <img src='https://www.mobilku.com/_nuxt/img/d7a8359.svg' />
                <p className={styles['detail-spec-mobil-dijual']}>{km}</p>
              </div>
              <div className={styles['spec-mobil-dijual']}>
                <img src='https://www.mobilku.com/_nuxt/img/fccc213.svg' />
                <p className={styles['detail-spec-mobil-dijual']}>{transmission}</p>
              </div>
              <div className={styles['spec-mobil-dijual']}>
                <img src='https://www.mobilku.com/_nuxt/img/f937160.svg' />
                <p className={styles['detail-spec-mobil-dijual']}>{bbm}</p>
              </div>
            </div>
          </div>
        </a>
      </Link>
      <Link href=''>
        <a className={styles['profile-seller-container']}>
          <div className={styles['image-profile-container']}>
            <img src='https://www.mobilku.net/frnt/fl/icon/mobcom.png' />
          </div>
          <div className={styles['name-profile-container']}>
            <p className={styles['name-profile']}>{name}</p>
            <p className={styles['city-profile']}>{city}</p>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default CardIklan;
