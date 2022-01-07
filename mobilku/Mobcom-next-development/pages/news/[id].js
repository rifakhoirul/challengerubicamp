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
const News = ({ detailNews,dataNews, dataNewsPopular, dataAdsPopular }) => {
	const router = useRouter();
	// const { id } = router.query;
	// const elements = [1, 2, 3, 4, 5];
	// const urlImage = [
	// 	'https://www.mobilku.net/hot/str/News/5276.1638927269-1.c.jpeg',
	// 	'https://www.mobilku.net/hot/str/News/5276.1638927269-3.c.jpeg',
	// 	'https://www.mobilku.net/hot/str/News/5276.1638927269-4.c.jpeg',
	// 	'https://www.mobilku.net/hot/str/News/5276.1638927269-5.c.jpeg'
	// ]
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
		<Layout dataNewsPopular={dataNewsPopular} dataAdsPopular={dataAdsPopular}>
			{/* News Slider */}
			<div className={styles['card-news-slider']}>
				{/* Tes Cek Hasil Data fetch */}
				{/* {console.log(detailNews)} */}
				<Slider {...settings}>
					{dataNews.map((value, index) => {
						return (
							<Link key={index} href={`/news/${value.id}`}>
								<a>
									<div className={styles['zoomOut-news-slider']}>
										<div style={{ backgroundImage: `url(${value.image[0]})` }} className={styles['zoomIn-news-slider']}></div>
									</div>
									<div className={styles['title-news-slider-container']}>
										<p className={styles['title-news-slider']}>{value.title}</p>
									</div>
								</a>
							</Link>
						)
					})}
				</Slider>
			</div>
			<Separator first={'Auto'} second={'News'} />
			<div className={styles['card-autonews-detail']}>
				<Gallery urlImage={detailNews.image} />

				<div className={styles['content-autonews-detail']}>
					<h3 className={styles['title-content-autonews-detail']}>{detailNews.title}</h3>
					<p className={styles['date-content-autonews-detail']}>{detailNews.updatedAt}</p>
					<p className={styles['content-content-autonews-detail']}>{detailNews.content}</p>
				</div>
			</div>
		</Layout>
	);
}

export default News;


// tes Fetch Pakai Json Placeholder dengan getStaticPaths dan getStaticProps
export async function getStaticPaths() {
	try {
		const resDataNewsId = await fetch(`http://localhost:3001/api/news/all-id`);
		const dataNewsId = await resDataNewsId.json();

		const paths = dataNewsId.data.map((val) => ({
			params: {
				id: `${val.id}`,
			}
		}));

		return {
			paths,
			fallback: false,
		}
	} catch (error) {
		console.log(error)
	}
}

export async function getStaticProps(context) {
	try {
		const { id } = context.params;
		const resDetailNews = await fetch(`http://localhost:3001/api/news/${id}`);
		const resDataNews = await fetch(`http://localhost:3001/api/news?limit=3`);
		const resDataNewsPopular = await fetch('http://localhost:3001/api/news/popular?limit=4');
		const resDataAdsPopular = await fetch('http://localhost:3001/api/ads/popular?limit=4');
		const detailNews = await resDetailNews.json();
		const dataNews = await resDataNews.json();
		const dataNewsPopular = await resDataNewsPopular.json();
		const dataAdsPopular = await resDataAdsPopular.json();
		return {
			props: {
				detailNews: detailNews.data,
				dataNews: dataNews.data,
				dataNewsPopular: dataNewsPopular.data,
				dataAdsPopular: dataAdsPopular.data
			}
		}
	} catch (error) {
		console.log(error);
	}
}
