import styles from './Separator.module.css'

const SecondSeparator = ({first}) => {
  return (
    <section className={styles['second-separator-container']}>
      <div>
        <h3>{first}</h3>
        <div>
          <span className={styles['line-separator']}></span>
        </div>
      </div>
    </section>
  );
}

export default SecondSeparator;
