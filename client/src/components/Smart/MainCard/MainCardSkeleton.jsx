import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Card } from '@mui/material';

import style from './MainCard.module.scss';

function MainCardSkeleton() {
  return (
    <Card className={style.card}>
      <Skeleton
        variant="rectangular"
        width="900px"
        height="100%"
        style={{ marginTop: 5, marginBottom: 5 }}
      />
      <div className={style.cardContent}>
        <Skeleton variant="text" width="70%" height="70px" />
        <Skeleton
          variant="text"
          width="30%"
          height="70px"
          style={{ marginTop: 5 }}
        />
        <Skeleton
          variant="text"
          width="30%"
          height="70px"
          style={{ marginTop: 5 }}
        />
        <Skeleton
          variant="text"
          width="100%"
          height="250px"
          style={{ marginTop: -15 }}
        />
        <div className={style.cardIcon}>
          <Skeleton
            variant="text"
            width="40%"
            height="100px"
            style={{ marginLeft: 15, marginRight: 'auto' }}
          />
          <Skeleton
            variant="text"
            width="8%"
            height="70px"
            style={{ marginLeft: 'auto', marginRight: 15 }}
          />
        </div>
      </div>
    </Card>
  );
}

export default MainCardSkeleton;
