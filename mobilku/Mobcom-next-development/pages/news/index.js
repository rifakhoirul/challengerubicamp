import Link from 'next/link';
import Layout from '../../components/Layout';
import Separator from '../../components/Separator';
import styles from '../../styles/Home.module.css';
;

export default function News({dataPost}) {
  const elements = [1,2,3,4,5,6,7,8,9,10];
  const id = 12;
  return (
    <Layout>
      {console.log(dataPost)}
      <Separator first={'Auto'} second={'News'} />

      <div className={styles['autonews-container']}>
        {elements.map((value, index) => {
          if (index === 0) {
            return (
            <div key={value.id} onClick={() => router.push(`/news/${value.id}`)}>
              <a className={styles['pagin-autonews']}>
                <div className={styles['img-autonews-big']}>
                  <img src='https://www.mobilku.net/hot/str/News/5276.1638927269-1.c.jpeg' />
                  <div className={styles['content-autonews-big']}>
                    <h3 className={styles['title-content-autonews-big']}>MUAT RATUSAN MOBIL, RUMAH MEWAH INI PUNYA GARASI DUA LANTAI 7 December 2021 Mobilku.com - Punya rumah besar dan luas sepertinya merupakan mimpi semua orang. Namun, pernahkah kalian membayangk</h3>
                    <p className={styles['date-content-autonews-big']}>Tue, 07 Dec 2021</p>
                  </div>
                </div>            
              </a>
            </div>
            )
          }
          else {
            return (
              <Link key={value.id} href={`/news/${id}`}>
                <a className={styles['pagin-autonews']}>
                  <div className={styles['card-autonews']}>
                    <div className={styles['img-card-autonews-container']}>
                      <div className={styles['img-card-autonews']} style={{ backgroundImage: `url('https://www.mobilku.net/hot/str/News/5276.1638927269-1.c.jpeg')` }}></div>
                    </div>
                    <div className={styles['content-autonews']}>
                      <h3 className={styles['title-content-autonews']}>MUAT RATUSAN MOBIL, RUMAH MEWAH INI PUNYA GARASI DUA LANTAI 7 December 2021 Mobilku.com - Punya rumah besar dan luas sepertinya merupakan mimpi semua orang. Namun, pernahkah kalian membayangk</h3>
                      <p className={styles['date-content-autonews']}>Tue, 07 Dec 2021</p>
                      <p className={styles['content-content-autonews']}>MUAT RATUSAN MOBIL, RUMAH MEWAH INI PUNYA GARASI DUA LANTAI 7 December 2021 Mobilku.com - Punya rumah besar dan luas sepertinya merupakan mimpi semua orang. Namun, pernahkah kalian membayangkan jika memiliki rumah yang besar dengan ratusan mobil mewah dan antik di dalamnya? Sebuah rumah di Michigan, Amerika Serikat ini bisa jadi inspirasi kalian.    Sebuah rumah di dekat danau Michigan ini menawarkan fitur yang sangat di impi-impikan oleh kolektor mobil, yakni garasi besar seluas 1114 meter persegi yang siap dipakai untuk menyimpan berbagai koleksi otomotif kalian.    Bukan hanya garasinya saja yang luas, seluruh properti dari Michigan Lake House ini berdiri diatas hutan seluas 16 hektar dan dilengkapi oleh jogging track, lintasan motocross sepanjang 1,6 km, dan juga danau    Kemewahan rumah ini ternyata tidak berhenti sampai disitu. Bagi kalian yang bermimpi ingin menjadi Bruce Wayne / Batman, rumah ini juga menyediakan terowongan bawah tanah yang langsung mengarah dari garasi dan jalan pintas menuju rumah utama.     Selain itu di garasi lantai dua, garasi ini dilengkapi dengan dua ruang ganti, ruang cuci, kamar mandi, hingga area untuk duduk santai.    Dari foto-foto yang ada di internet, sang pemilik rumah tersebut bukan hanya memiliki ratusan mobil, tetapi ada juga koleksi sepeda motor, motor trail, perahu, hingga mobil salju. Menurut informasi, kolektor yang tinggal di sana saat ini sedang gemar dengan muscle car dan sedang membuat area khusus untuk mobil berotot tersebut.    Kalian mungkin berpikir mengapa Mobilku.com menampilkan berita mengenai rumah super mahal yang sepertinya tidak banyak orang yang mampu untuk membelinya?     Jawabannya sangat sederhana. Jika kami biasanya mengulas mobil-mobil mahal, sekarang kami ingin mengajak kalian melihat kegiatan dan properti apa saja yang biasanya dimiliki oleh para kolektor atau sultan.     Kami berharap berita ini juga bisa menjadi ladang bisnis baru, dimana kalian bisa mengumpulkan uang untuk membangun sebuah garasi raksasa yang menawarkan jasa perawatan serta penitipan mobil mewah bagi para sultan-sultan di Indonesia.</p>
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
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const dataPost = await res.json();
  
  return{
    props: {
      dataPost,
    }
  }
}