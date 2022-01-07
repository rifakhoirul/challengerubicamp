import Link from 'next/link';
import SecondSeparator from '../Separator/second';
import styles from './NewsPopuler.module.css'

const NewsPopuler = ({dataNewsPopular}) => {
  // const elements = [1,2,3,4];
  return (
    <div>

      <SecondSeparator first={'News Populer'} />
      <div className={styles['popular-news-container']}>
        {dataNewsPopular && dataNewsPopular.map((value, index) => {
          return (
            <div key={index} className={styles['card-popular-news']}>
              <Link href={`/news/${value.id}`}>
                <a>
                  <div className={styles['img-card-popular-news-container']}>
                    <div className={styles['img-card-popular-news']} style={{ backgroundImage: `url(${value.image[0]})` }}></div>
                  </div>
                  <div className={styles['content-popular-news']}>
                    <p className={styles['title-content-popular-news']}>{value.title}</p>
                    <p className={styles['date-content-popular-news']}>{value.updatedAt}</p>
                  </div>
                </a>
              </Link>
          </div>
          )
        })}
      </div>

    </div>
  );
}

export default NewsPopuler;
