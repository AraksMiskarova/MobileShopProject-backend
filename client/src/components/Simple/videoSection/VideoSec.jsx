import React from 'react';
import { Container } from '@mui/material';

import InputWhite from '../../UI/InputWhite/InputWhite';

import style from './VideoSec.module.scss';

function VideoSec() {
  return (
    <div className={style.videoSec}>
      <Container maxWidth="lg">
        <h3>Leave your number and we will contact you!</h3>
        <div className={style.input}>
          <InputWhite label="Phone" />
        </div>
        <div className={style.video}>
          <video src="./vid3.webm" autoPlay muted />
        </div>
      </Container>
    </div>
  );
}

export default VideoSec;
