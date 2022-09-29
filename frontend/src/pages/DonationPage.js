import React, { useEffect, useState } from 'react';
import DonationList from '../components/donation/DonationList';
import DontaionTop from '../components/donation/DonationTop';
import styles from './DonationPage.module.css';
import UseAxios from '../utils/UseAxios';
import Header from '../components/common/Header';

function DonationPage() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    UseAxios.get('/challenges', {}).then((res) => {
      setDonations(res.data);
    });
  }, []);

  return (
    <div>
      <Header title={'나의 기부'}></Header>
      <DonationList styles={styles}></DonationList>
    </div>
  );
}

export default DonationPage;
