import React from 'react';
import { useSelector } from 'react-redux';
import ArtistForm from '../../ArtistForm';
import NftCreate from './index.container';

const ApplicationForm = () => {
  const full = useSelector((store) => store.artist?.full);
  const isCreateNFT = full?.status?.includes('COMPLETE');

  if (isCreateNFT) return <NftCreate />;

  return <ArtistForm />;
};

export default ApplicationForm;
