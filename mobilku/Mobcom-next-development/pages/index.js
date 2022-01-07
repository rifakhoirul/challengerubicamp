import Link from 'next/link';
import Layout from '../components/Layout';
import Separator from '../components/Separator';
import styles from '../styles/Home.module.css';

// All data is static
export default function Home({ dataNews, dataNewsPopular, dataAdsPopular }) {
  // const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // const id = 12;

  return (
    <Layout dataNewsPopular={dataNewsPopular} dataAdsPopular={dataAdsPopular}>
      {/* Tes Cek Data Hasil Fetch */}
      {/* {console.log('dataNews',dataNews)} */}
      <Separator first={'Auto'} second={'News'} />

      <div className={styles['autonews-container']}>
        {dataNews.map((value, index) => {
          if (index === 0) {
            return (
              <Link key={value.id} href={`/news/${value.id}`}>
                <a className={styles['pagin-autonews']}>
                  <div className={styles['img-autonews-big']}>
                    <img src={value.image[0]} />
                    <div className={styles['content-autonews-big']}>
                      <h3 className={styles['title-content-autonews-big']}>{value.title} {value.content}</h3>
                      <p className={styles['date-content-autonews-big']}>{value.updatedAt}</p>
                    </div>
                  </div>
                </a>
              </Link>
            )
          }
          else {
            return (
              <Link key={value.id} href={`/news/${value.id}`}>
                <a className={styles['pagin-autonews']}>
                  <div className={styles['card-autonews']}>
                    <div className={styles['img-card-autonews-container']}>
                      <div className={styles['img-card-autonews']} style={{ backgroundImage: `url(${value.image[0]})` }}></div>
                    </div>
                    <div className={styles['content-autonews']}>
                      <h3 className={styles['title-content-autonews']}>{value.title}</h3>
                      <p className={styles['date-content-autonews']}>{value.updatedAt}</p>
                      <p className={styles['content-content-autonews']}>{value.content}</p>
                    </div>
                  </div>
                </a>
              </Link>
            )
          }
        })}
      </div>
    </Layout>
  )
}

// tes Fetch Pakai Json Placeholder dengan GetSertverSideProps
export async function getServerSideProps() {
  try {
    const resDataNews = await fetch('http://localhost:3001/api/news?limit=5');
    const resDataNewsPopular = await fetch('http://localhost:3001/api/news/popular?limit=4');
    const resDataAdsPopular = await fetch('http://localhost:3001/api/ads/popular?limit=4');

    const dataNews = await resDataNews.json();
    const dataNewsPopular = await resDataNewsPopular.json();
    const dataAdsPopular = await resDataAdsPopular.json();
    if (!dataNews.status || !dataNewsPopular.status || !dataAdsPopular.status) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        dataNews: dataNews.data,
        dataNewsPopular: dataNewsPopular.data,
        dataAdsPopular: dataAdsPopular.data,
      }
    }
  } catch (error) {
    console.log(error);
  }
}