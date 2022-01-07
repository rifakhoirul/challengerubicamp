import styles from './Separator.module.css'

const Separator = ({first, second}) => {
  return (
    <section className={styles['separator-container']}>
      <div>
        <h1>{first}<span>{second}</span></h1>
        <div>
          <span className={styles['line-separator']}></span>
        </div>
      </div>
    </section>
  );
}

export default Separator;
