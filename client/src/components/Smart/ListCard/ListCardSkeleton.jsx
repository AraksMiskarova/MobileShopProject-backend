import React from 'react';
import { Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import style from './ListCard.module.scss';

function ListCardSkeleton() {
  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      {' '}
      <div className={style.cardSkeleton}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={300}
          style={{ marginTop: 5, marginBottom: 5 }}
        />
        <div className={style.cardContentSkeleton}>
          <Skeleton
            variant="rectangular"
            width="48%"
            height={35}
            style={{ marginTop: 5, marginBottom: 5 }}
          />
          <Skeleton
            variant="rectangular"
            width="48%"
            height={35}
            style={{ marginTop: 5, marginBottom: 5 }}
          />
        </div>
        <div className={style.cardButtonSkeleton}>
          <Skeleton
            variant="rectangular"
            width="48%"
            height={35}
            style={{ marginTop: 5, marginBottom: 5 }}
          />{' '}
          <Skeleton
            variant="rectangular"
            width="48%"
            height={35}
            style={{ marginTop: 5, marginBottom: 5 }}
          />
        </div>
      </div>
    </Grid>
  );
}

export default ListCardSkeleton;
