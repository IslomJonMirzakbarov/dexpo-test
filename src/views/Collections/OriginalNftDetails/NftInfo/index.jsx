import classNames from "classnames";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import numFormat from "../../../../utils/numFormat";
import cls from "./style.module.scss";

export default function NftInfo({ orginalNftDetail, setOpentImage }) {
  const { t } = useTranslation();
  return (
    <div className={cls.box}>
      <div className={cls.title}>{t("Artwork Details")}</div>
      <div className={cls.info}>
        <p className={cls.label}>{t("Serial Number")}</p>
        <p className={cls.value}>{orginalNftDetail?.serial_number}</p>
      </div>
      <div className={cls.info}>
        <p className={cls.label}>{t("Entry Agency")}</p>
        <p className={cls.value}>{orginalNftDetail?.artist_name}</p>
      </div>
      <div className={cls.info}>
        <p className={cls.label}>{t("Entry Form")}</p>
        <p className={cls.value}>{orginalNftDetail?.standard}</p>
      </div>
      <div className={cls.info}>
        <p className={cls.label}>{t("Exhibitor (Artist)")}</p>
        <p className={cls.value}>{orginalNftDetail?.title}</p>
      </div>
      <div className={cls.info}>
        <p className={cls.label}>{t("Classification and Dimensions")}</p>
        <p className={cls.value}>{orginalNftDetail?.material}</p>
      </div>
      <div className={cls.info}>
        <p className={cls.label}>{t("Year")}</p>
        <p className={cls.value}>{orginalNftDetail?.manufacture_year}</p>
      </div>
      <div className={cls.info}>
        <p className={cls.label}>{t("Price")}</p>
        <p className={cls.value}>
          <NumberFormat
            value={numFormat(orginalNftDetail?.price)}
            displayType={"text"}
            thousandSeparator={true}
          />
        </p>
      </div>
      <div className={cls.info}>
        <p className={cls.label}>{t("Certification")}</p>
        <p className={cls.value}>
          {t("Korean Literature and Arts Copyright Association")}{" "}
          <a
            onClick={(e) => {
              e.preventDefault();
              setOpentImage(orginalNftDetail?.certificate);
            }}
            href={orginalNftDetail?.certificate}
          >
            [{t("view")}]
          </a>
        </p>
      </div>
      <div className={classNames(cls.info, cls.wLabel)}>
        <p className={cls.label}>{t("Work review")}</p>
        <p className={cls.value}>{orginalNftDetail?.work_review}</p>
      </div>
      <div className={cls.info}>
        <p className={cls.label}>{t("Certification Agency")}</p>
        <p
          className={cls.value}
          dangerouslySetInnerHTML={{ __html: orginalNftDetail?.bio }}
        />
      </div>
    </div>
  );
}
