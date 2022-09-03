import { Box, Skeleton } from '@mui/material';
import React from 'react';
import { CTableCell, CTableRow } from '../../../components/CTable';
import conTokenImg from '../../../assets/icons/toke-grey.svg';

const ImageSkeleton = () => (
  <Skeleton
    animation="wave"
    sx={{
      bgcolor: '#eee',
      marginLeft: 3.4
    }}
    variant="circular"
    width={40}
    height={40}
  />
);

const LabelSkeleton = ({ noMargin = false }) => (
  <Skeleton
    animation="wave"
    sx={{
      bgcolor: '#D7DADD',
      marginLeft: !noMargin && '13px'
    }}
    width={81}
    height={15}
  />
);

const ArtistSkeleton = ({ isArtists = false, isResponsive }) => {
  return (
    <CTableRow>
      <CTableCell>
        <Box display="flex" alignItems="center">
          <ImageSkeleton />
          <LabelSkeleton />
        </Box>
      </CTableCell>
      {isResponsive ? (
        <CTableCell>
          <Box display="flex" alignItems="center" mb={1} justifyContent="end">
            <img src={conTokenImg} alt="token" width={25} height={25} />
            <LabelSkeleton />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="end">
            <LabelSkeleton noMargin={true} />
          </Box>
        </CTableCell>
      ) : (
        <>
          <CTableCell>
            <Box display="flex" alignItems="center">
              <img src={conTokenImg} alt="token" width={25} height={25} />
              <LabelSkeleton />
            </Box>
          </CTableCell>
          {!isArtists && (
            <CTableCell>
              <LabelSkeleton noMargin={true} />
            </CTableCell>
          )}
          {!isArtists && (
            <CTableCell>
              <Box display="flex" alignItems="center">
                <img src={conTokenImg} alt="token" width={25} height={25} />
                <LabelSkeleton />
              </Box>
            </CTableCell>
          )}
          <CTableCell>
            <LabelSkeleton noMargin={true} />
          </CTableCell>
          <CTableCell>
            <LabelSkeleton noMargin={true} />
          </CTableCell>
        </>
      )}
    </CTableRow>
  );
};

export default ArtistSkeleton;
