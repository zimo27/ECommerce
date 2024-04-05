import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.css'; // Import the CSS module
import WebHeader from './WebHeader';
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate();


  function handleClick() {
    navigate('/');
  }

  return (
    <div className={styles.pageWrapper}>
      <WebHeader />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>dummyJson innoECommerce App</h1>
        <p className={styles.subtitle}>created by Zimo Peng</p>
        <button className={styles.getStartedButton} onClick={handleClick}>Get Started</button>
      </main>
      <footer className={styles.footer}>
        Privacy policy
        {/* Add social media icons here */}
      </footer>
    </div>
  );
};

export default Home;