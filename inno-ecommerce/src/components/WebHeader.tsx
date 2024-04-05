import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/WebHeader.module.css'; // Ensure you have the correct path

const WebHeader = () => {
    let navigate = useNavigate();

    return (
      <header className={styles.header}>
        <div className={styles.helperText} onClick={() => navigate('/')}>innoECommerce</div>
      </header>
    );
};

export default WebHeader;
