import CardIklan from '../CardIklan';
import SecondSeparator from '../Separator/second';
import styles from './IklanPopuler.module.css';

const IklanPopuler = ({dataAdsPopular}) => {
  // const elements = [1,2,3,4];
  return (
    <div>

      <SecondSeparator first={'Iklan Populer'} />
      <div className={styles['iklan-populer-container']}>
        {dataAdsPopular && dataAdsPopular.map((value, index) => {
          return (
            <CardIklan 
            key={index}
              name={value.name} 
              city={value.city}
              imgSeller={value.imgSeller}
              imgCar={value.imgCar}
              title={value.title} 
              price={value.price}
              year={value.year}
              km={value.km}
              transmission={value.transmission}
              bbm={value.bbm}          
            />
          )
        })}
      </div>

    </div>
  );
}

export default IklanPopuler;
