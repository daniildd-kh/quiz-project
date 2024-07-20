import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
;
import React from 'react';

const DeckSkeleton = () => {
  return (
        <Skeleton variant="rectangular" width={"100%" } height={100} />
  );
};

export default DeckSkeleton;