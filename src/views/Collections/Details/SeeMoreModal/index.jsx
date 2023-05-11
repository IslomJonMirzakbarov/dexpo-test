import { Box, Modal } from '@mui/material'
import styles from './style.module.scss'
import { useEffect } from 'react'

const style = {
  width: '1031px',
  borderRadius: '7px',
  background: '#fff',
  outline: 'none',
  marginLeft: 'auto',
  marginRight: 'auto',
  position: 'relative',
  top: '300px',
  overflowY: 'auto',
  zIndex: 1006
}

const items1 = {
  title: '작품정보',
  data: [
    {
      label: '작품 규격',
      value: '70x90.5 (가로x세로cm)'
    },
    {
      label: '제작년도'
    }
  ]
}

const SeeMoreModal = ({ handleClose, open }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = 'unset')
  }, [])

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1005,
        backgroundColor: 'rgba(0,0,0,.8)',
        overflowY: 'auto'
      }}
      onClick={handleClose}
    >
      <Box
        sx={style}
        className={styles.container}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>작품상세</h2>
        <div className={styles.box}>
          <h3>작품정보</h3>
          <div className={styles.items}>
            <div className={styles.item}>
              <span className={styles.label}>작품 규격</span>
              <span className={styles.value}>70x90.5 (가로x세로cm)</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>제작년도</span>
              <span className={styles.value}>2021</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>재료</span>
              <span className={styles.value}>Acrylic on Canvas</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>제작년도</span>
              <span className={styles.value}>2021</span>
            </div>
          </div>
          <h3>작가정보</h3>
          <div
            className={styles.items}
            style={{
              marginBottom: 0
            }}
          >
            <div className={styles.item}>
              <span className={styles.label}>이름</span>
              <span className={styles.value}>홍길동</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>작품소장</span>
              <span className={styles.value}>소장확인</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>재료</span>
              <span className={styles.value}>Acrylic on Canvas</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>학력</span>
              <span className={styles.value}>
                홍익대학교 일반대학원 미술학과 회화 졸업 (박사) <br />
                홍익대학교 일반대학원 회화과 졸업 (석사)
                <br />
                목원대학교 미술대학 회화과 졸업 (학사)
              </span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>개인전</span>
              <div className={styles.value}>
                <div className={styles.year}>
                  <span>2022</span>
                  <span>미국,이태리</span>
                </div>
                <div className={styles.year}>
                  <span>2019</span>
                  <span>일본,이태리</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  )
}

export default SeeMoreModal
