import NumberFormat from 'react-number-format'
import numFormat from '../../../../utils/numFormat'
import cls from './style.module.scss'

export default function NftInfo({ orginalNftDetail, setOpentImage }) {
  return (
    <div className={cls.box}>
      <div className={cls.title}>작품상세</div>
      <div className={cls.info}>
        <p className={cls.label}>작품 일련번호</p>
        <p className={cls.value}>{orginalNftDetail?.serial_number}</p>
      </div>
      <div className={cls.info}>
        <p className={cls.label}>출품자(작가)</p>
        <p className={cls.value}>{orginalNftDetail?.artist_name}</p>
      </div>
      <div className={cls.info}>
        <p className={cls.label}>규격</p>
        <p className={cls.value}>{orginalNftDetail?.standard}</p>
      </div>
      <div className={cls.info}>
        <p className={cls.label}>작품명</p>
        <p className={cls.value}>{orginalNftDetail?.title}</p>
      </div>
      <div className={cls.info}>
        <p className={cls.label}>작품재료 및 형식</p>
        <p className={cls.value}>{orginalNftDetail?.material}</p>
      </div>
      <div className={cls.info}>
        <p className={cls.label}>제작년도</p>
        <p className={cls.value}>{orginalNftDetail?.manufacture_year}</p>
      </div>
      <div className={cls.info}>
        <p className={cls.label}>작품가격</p>
        <p className={cls.value}>
          <NumberFormat
            value={numFormat(orginalNftDetail?.price)}
            displayType={'text'}
            thousandSeparator={true}
          />
        </p>
      </div>
      <div className={cls.info}>
        <p className={cls.label}>인증서</p>
        <p className={cls.value}>
          한국문학예술저작권협회{' '}
          <a
            onClick={(e) => {
              e.preventDefault()
              setOpentImage(orginalNftDetail?.certificate)
            }}
            href={orginalNftDetail?.certificate}
          >
            [보기]
          </a>
        </p>
      </div>
      <div className={cls.info}>
        <p className={cls.label}>작품평론</p>
        <p className={cls.value}>{orginalNftDetail?.work_review}</p>
      </div>
      <div className={cls.info}>
        <p className={cls.label}>작가약력</p>
        <p
          className={cls.value}
          dangerouslySetInnerHTML={{ __html: orginalNftDetail?.bio }}
        />
      </div>
    </div>
  )
}
