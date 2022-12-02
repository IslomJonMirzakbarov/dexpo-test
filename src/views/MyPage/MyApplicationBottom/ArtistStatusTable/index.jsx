import moment from 'moment';
import React from 'react';
import classNames from 'classnames';

import styles from './style.module.scss';

const ArtistStatusTable = ({ artist }) => {
  const fdate = moment(artist?.data?.created_at).format('YYYY.MM.DD HH:MM:ss');
  const artistStatus = artist?.data?.status;
  const ArtistStatus =
    artistStatus === 'IDLE' || artistStatus === 'PENDING'
      ? 'Under Review'
      : artistStatus === 'REJECT'
      ? 'Rejected'
      : 'Approved';
  return (
    <table className={styles.Table}>
      <thead className={styles.TableHead}>
        <tr className={styles.TableHeadRow}>
          <th>Email address</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>

      {artist?.data?.artist_email && (
        <tbody className={styles.TableBody}>
          <tr className={styles.TableBodyRow}>
            <td>{artist?.data?.artist_email}</td>
            <td
              className={classNames(
                styles.UnderReview,
                { [styles.Approved]: artistStatus === 'COMPLETE' },
                { [styles.Rejected]: artistStatus === 'REJECT' }
              )}
            >
              {ArtistStatus}
            </td>
            <td>{fdate}</td>
          </tr>
        </tbody>
      )}
    </table>
  );
};

export default ArtistStatusTable;
