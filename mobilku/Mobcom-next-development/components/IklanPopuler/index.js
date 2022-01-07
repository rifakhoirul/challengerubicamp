import CardIklan from '../CardIklan';
import SecondSeparator from '../Separator/second';
import styles from './IklanPopuler.module.css';

const IklanPopuler = () => {
  const elements = [1,2,3,4];
  return (
    <div>

      <SecondSeparator first={'Iklan Populer'} />
      <div className={styles['iklan-populer-container']}>
        {elements.map((value, index) => {
          return (
            <CardIklan 
            key={index}
              name={'Nama'} 
              city={'Kota'}
              imgSeller={'https://www.mobilku.net/frnt/fl/icon/mobcom.png'}
              imgCar={'https://www.mobilku.net/hot/str/SellCars/$2y$10$1o927WY6gjRw2cJmMldUOuWwgHelbU1YYeIwIQPMgIcS3WNip0IVO.jpeg'}
              title={'Mitsubishi Pajero Sport EXCEED'} 
              price={'Rp. 368.000.000'}
              year={'2018'}
              km={'69.431'}
              transmission={'AT'}
              bbm={'Solar'}          
            />
          )
        })}
      </div>

    </div>
  );
}

export default IklanPopuler;
