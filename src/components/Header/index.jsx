import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchField from '../Autocomplete';
import AutocompleteList from '../AutocompleteList';
import BackButton from '../BackButton';
import IconGenerator from '../IconPicker/IconGenerator';
import styles from './style.module.scss';
import { debounce } from 'lodash';
import useSearchAPI from '../../hooks/useSearchAPI';
import LinkListResponsive from '../../layouts/MergedLayout/LinkList/index.responsive';
import SearchFieldResponsive from '../Autocomplete/index.responsive';

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
  const location = useLocation();

  const [search, setSearch] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useSearchAPI(debouncedValue);

  const debounced = useCallback(
    debounce((qry) => setDebouncedValue(qry), 300),
    []
  );

  const clear = () => {
    setSearch('');
    setIsOpen(false);
  };

  const handleChange = (e) => setSearch(e?.target?.value);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    clear();
  }, [location.pathname]);

  useEffect(() => {
    setIsOpen(!!search);
    if (!search) return;

    debounced(search);
  }, [search]);

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
          <SearchField value={search} onChange={handleChange} />
          <div className={styles.result}>
            <AutocompleteList
              isLoading={isLoading}
              isOpen={isOpen}
              data={data}
              handleClose={handleClose}
            />
          </div>
        </div>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.links}>{children}</div>
        {extra}
      </div>
      <div className={styles.rightSideResponsive}>
        <SearchFieldResponsive value={search} onChange={handleChange} />
        <LinkListResponsive />
        <div className={styles.result}>
          <AutocompleteList
            isLoading={isLoading}
            isOpen={isOpen}
            data={data}
            handleClose={handleClose}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
