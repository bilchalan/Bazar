import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';

export default function LineWaveSkeleton() {
  return (
      <Skeleton variant="text" animation="wave" height="78px" width="98%" sx={{m:'-15px 0 0 1%'}}/>
  );
}