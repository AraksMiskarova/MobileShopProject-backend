import React from 'react';

import style from './CardHelpInfo.module.scss';

function CardHelpInfo() {
  return (
    <div className={style.container}>
      <div className={style.item}>
        <div className={style.iconDel}> </div>
        <div className={style.text}>
          {' '}
          It is possible to use a courier or receive at the post office.{' '}
        </div>
      </div>
      <div className={style.item}>
        <div className={style.iconPay}> </div>
        <div className={style.text}>
          Payment is made in cash upon receipt and inspection of the goods.{' '}
        </div>
      </div>
      <div className={style.item}>
        <div className={style.iconGuar}> </div>
        <div className={style.text}>
          We provide a 12-month warranty and a 14-day return policy.{' '}
        </div>
      </div>
    </div>
  );
}
export default CardHelpInfo;
