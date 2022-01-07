import Link from 'next/link';
import Layout from '../components/Layout';
import Separator from '../components/Separator';
import styles from '../styles/Home.module.css';

// All data is static
export default function Home({ dataNews,dataNewsPopular }) {
  // const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // const id = 12;

  return (
    <Layout dataNewsPopular={dataNewsPopular}>
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
                    <img src={value.image} />
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
                      <div className={styles['img-card-autonews']} style={{ backgroundImage: `url(${value.image})` }}></div>
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
  const resDataNews = await fetch('http://localhost:3001/api/news/');
  const resDataNewsPopular = await fetch('http://localhost:3001/api/news/popular');

  const dataNews = await resDataNews.json();
  const dataNewsPopular = await resDataNewsPopular.json();

  if (!dataNews.status || !dataNewsPopular.status) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      dataNews: dataNews.data,
      dataNewsPopular: dataNewsPopular.data
    }
  }
}