import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styles from './style.module.scss'

export default function CTabs({ items, active }) {
  const { t } = useTranslation()
  return (
    <div className={styles.tabs}>
      {items?.map((item) => (
        <Link to={item.link}>
          <div className={styles.item}>
            {t(item.title)}
            {item.key === active && <div className={classNames(styles.box)} />}
          </div>
        </Link>
      ))}
    </div>
  )
}
