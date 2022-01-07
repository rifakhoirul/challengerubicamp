import Header from '../Header';
import Footer from '../Footer';
import styles from './Layout.module.css';
import NewsPopuler from '../NewsPopuler';
import IklanPopuler from '../IklanPopuler';

const Layout = ({children, dataNewsPopular,dataAdsPopular}) => {
  return (
    <div className={styles.container}>
        <Header />
          <div className={styles.content}>
            {children}
            <NewsPopuler dataNewsPopular={dataNewsPopular} />
            <IklanPopuler dataAdsPopular={dataAdsPopular}/>
          </div>
        <Footer />
    </div>
  );
}

export default Layout;
