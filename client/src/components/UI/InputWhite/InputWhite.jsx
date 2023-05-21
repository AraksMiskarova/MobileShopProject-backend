import React from 'react';
import PropTypes from 'prop-types';

import styles from './InputWhite.module.scss';

function InputWhite({ label }) {
  return (
    <form className={styles.form} action="">
      <div className={styles.group}>
        <input className={styles.input} id="search" type="text" required />
        <span className={styles.bar}>{}</span>
        <label className={styles.label}>{label}</label>
      </div>
    </form>
  );
}

InputWhite.defaultProps = {
  label: 'Search',
};

InputWhite.propTypes = {
  label: PropTypes.string,
};
export default InputWhite;
