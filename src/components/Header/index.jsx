import { useNavigate } from 'react-router-dom';
import SearchField from '../Autocomplete';
import AutocompleteList from '../AutocompleteList';
import BackButton from '../BackButton';
import IconGenerator from '../IconPicker/IconGenerator';
import styles from './style.module.scss';

const Header = ({
  title = '',
  subtitle,
  extra,
  children,
  loader,
  backButtonLink,
  icon,
  img,
  sticky,
  ...props
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.header} ${sticky ? styles.sticky : ''}`}
      {...props}
    >
      <div className={styles.leftSide}>
        {backButtonLink && <BackButton link={backButtonLink} />}

        {icon && <IconGenerator className={styles.icon} icon={icon} />}

        {img && (
          <img src={img} alt="logo" width={132} onClick={() => navigate('/')} />
        )}

        <div className={styles.titleBlock}>
          {title && <div className={styles.title}>{title}</div>}
          {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        </div>

        <div className={styles.search}>
          <SearchField />
          <div className={styles.result}>
            <AutocompleteList />
          </div>
        </div>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.links}>{children}</div>
        {extra}
      </div>
    </div>
  );
};

export default Header;
