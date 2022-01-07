import Link from 'next/link';
import Layout from '../../components/Layout';
import Separator from '../../components/Separator';
import styles from '../../styles/Home.module.css';
;

export default function News({ dataNews }) {
  // const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // const id = 12;
  return (
    <Layout>
      <Separator first={'Auto'} second={'News'} />

      <div className={styles['autonews-container']}>
        {dataNews.map((value, index) => {
          if (index === 0) {
            return (
              <div key={value.id} onClick={() => router.push(`/news/${value.id}`)}>
                <a className={styles['pagin-autonews']}>
                  <div className={styles['img-autonews-big']}>
                    <img src={value.image[0]} />
                    <div className={styles['content-autonews-big']}>
                      <h3 className={styles['title-content-autonews-big']}>{value.title} {value.content}</h3>
                      <p className={styles['date-content-autonews-big']}>{value.createdAt}</p>
                    </div>
                  </div>
                </a>
              </div>
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
                      <p className={styles['date-content-autonews']}>{value.createdAt}</p>
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

export async function getServerSideProps() {
  try {
    const resDataNews = await fetch(`http://localhost:3001/api/news?limit=10`);
    const dataNews = await resDataNews.json();

    return {
      props: {
        dataNews,
      }
    }
  } catch (error) {
    console.log(error);
  }

}