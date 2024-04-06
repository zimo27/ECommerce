import React from 'react';
import styles from '../styles/Home.module.css';
import WebHeader from './WebHeader';
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate();


  function handleClick() {
    navigate('/shop');
  }

  return (
    <div className={styles.pageWrapper}>
      <WebHeader />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>innoECommerce: shop with dummyJson</h1>
        <p className={styles.subtitle}>created by Zimo Peng</p>
        <button className={styles.getStartedButton} onClick={handleClick}>Get Started</button>
      </main>
      <footer className={styles.footer}>
        Privacy policy
      </footer>
    </div>
  );
};

export default Home;