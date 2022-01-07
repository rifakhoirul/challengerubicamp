import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import styles from './News.module.css';
import Slider from 'react-slick';
import Separator from '../../components/Separator';
import Gallery from '../../components/Gallery';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// All data is static
const News = ({detailNews}) => {
	const router = useRouter();
	const {id} = router.query;
	const elements = [1,2,3,4,5];
	const urlImage = [
		'https://www.mobilku.net/hot/str/News/5276.1638927269-1.c.jpeg',
		'https://www.mobilku.net/hot/str/News/5276.1638927269-3.c.jpeg',
		'https://www.mobilku.net/hot/str/News/5276.1638927269-4.c.jpeg',
		'https://www.mobilku.net/hot/str/News/5276.1638927269-5.c.jpeg'
	]
	const settings = {
		className: "center",
		infinite: false,
		slidesToShow: 3,
		swipeToSlide: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			}
		]
	};
  return (
    <Layout>
			{/* News Slider */}
			<div className={styles['card-news-slider']}>
				{/* Tes Cek Hasil Data fetch */}
				{console.log(detailNews)}
				<Slider {...settings}>
					{elements.map((value, index) => {
						return (
							<Link key={index} href={`/news/${index}`}>
								<a>
									<div className={styles['zoomOut-news-slider']}>
										<div style={{backgroundImage: `url('https://www.mobilku.net/hot/str/News/5276.1638927269-1.c.jpeg')`}} className={styles['zoomIn-news-slider']}></div>
									</div>
									<div className={styles['title-news-slider-container']}>
										<p className={styles['title-news-slider']}>MUAT RATUSAN MOBIL, RUMAH MEWAH INI PUNYA GARASI DUA LANTAI 7 December 2021 Mobilku.com - Punya rumah besar dan luas sepertinya merupakan mimpi semua orang. Namun, pernahkah kalian membayangk</p>
									</div>
								</a>
							</Link>
						)
					})}
				</Slider>
			</div>
			<Separator first={'Auto'} second={'News'} />
			<div  className={styles['card-autonews-detail']}>
				<Gallery urlImage={urlImage} />

				<div className={styles['content-autonews-detail']}>
					<h3 className={styles['title-content-autonews-detail']}>MUAT RATUSAN MOBIL, RUMAH MEWAH INI PUNYA GARASI DUA LANTAI 7 December 2021 Mobilku.com - Punya rumah besar dan luas sepertinya merupakan mimpi semua orang. Namun, pernahkah kalian membayangk</h3>
					<p className={styles['date-content-autonews-detail']}>Tue, 07 Dec 2021</p>
					<p className={styles['content-content-autonews-detail']}>MUAT RATUSAN MOBIL, RUMAH MEWAH INI PUNYA GARASI DUA LANTAI 7 December 2021 Mobilku.com - Punya rumah besar dan luas sepertinya merupakan mimpi semua orang. Namun, pernahkah kalian membayangkan jika memiliki rumah yang besar dengan ratusan mobil mewah dan antik di dalamnya? Sebuah rumah di Michigan, Amerika Serikat ini bisa jadi inspirasi kalian.    Sebuah rumah di dekat danau Michigan ini menawarkan fitur yang sangat di impi-impikan oleh kolektor mobil, yakni garasi besar seluas 1114 meter persegi yang siap dipakai untuk menyimpan berbagai koleksi otomotif kalian.    Bukan hanya garasinya saja yang luas, seluruh properti dari Michigan Lake House ini berdiri diatas hutan seluas 16 hektar dan dilengkapi oleh jogging track, lintasan motocross sepanjang 1,6 km, dan juga danau    Kemewahan rumah ini ternyata tidak berhenti sampai disitu. Bagi kalian yang bermimpi ingin menjadi Bruce Wayne / Batman, rumah ini juga menyediakan terowongan bawah tanah yang langsung mengarah dari garasi dan jalan pintas menuju rumah utama.     Selain itu di garasi lantai dua, garasi ini dilengkapi dengan dua ruang ganti, ruang cuci, kamar mandi, hingga area untuk duduk santai.    Dari foto-foto yang ada di internet, sang pemilik rumah tersebut bukan hanya memiliki ratusan mobil, tetapi ada juga koleksi sepeda motor, motor trail, perahu, hingga mobil salju. Menurut informasi, kolektor yang tinggal di sana saat ini sedang gemar dengan muscle car dan sedang membuat area khusus untuk mobil berotot tersebut.    Kalian mungkin berpikir mengapa Mobilku.com menampilkan berita mengenai rumah super mahal yang sepertinya tidak banyak orang yang mampu untuk membelinya?     Jawabannya sangat sederhana. Jika kami biasanya mengulas mobil-mobil mahal, sekarang kami ingin mengajak kalian melihat kegiatan dan properti apa saja yang biasanya dimiliki oleh para kolektor atau sultan.     Kami berharap berita ini juga bisa menjadi ladang bisnis baru, dimana kalian bisa mengumpulkan uang untuk membangun sebuah garasi raksasa yang menawarkan jasa perawatan serta penitipan mobil mewah bagi para sultan-sultan di Indonesia.</p>
				</div>
			</div>

    </Layout>
  );
}

export default News;


// tes Fetch Pakai Json Placeholder dengan getStaticPaths dan getStaticProps
export async function getStaticPaths() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
	const dataNews = await res.json();

	const paths = dataNews.map((val) => ({
		params: {
			id: `${val.id}`,
		}
	}));
	return {
		paths,
		fallback: false,
	}

}

export async function getStaticProps(context) {
	const {id} = context.params;
	const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
	const detailNews = await res.json();

	return {
		props: {
			detailNews,
		}
	}
}
