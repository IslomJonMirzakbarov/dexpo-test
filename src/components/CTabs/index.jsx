import classNames from 'classnames'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import styles from './style.module.scss'

export default function CTabs({ items, active }) {
  return (
    <div className={styles.tabs}>
      {items?.map((item) => (
        <Link to={item.link}>
          <div className={styles.item}>
            {item.title}
            {item.key === active && <div className={classNames(styles.box)} />}
          </div>
        </Link>
      ))}
    </div>
  )
}
