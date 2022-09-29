import React, { useContext, useState } from 'react';
import { Avatar, Button, TextField, Box, Grid, Link, Typography, Container } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginTop from '../components/sign/LoginTop';
import styles from './LoginPage.module.css';
import UseAxios from '../utils/UseAxios';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import Context from '../utils/Context';
import Jello from 'react-reveal/Jello';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFC947',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});

function LoginPage() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserData } = useContext(Context);
  let body = {
    email,
    password,
  };

  const onSubmit = () => {
    UseAxios.post(`/users/login`, body).then((res) => {
      const exDate = new Date();
      exDate.setDate(exDate.getDate() + 60);
      cookies.set('accesstoken', res.headers.accesstoken, {
        path: '/',
        secure: true,
        sameSite: 'none',
        expires: exDate,
      });
      cookies.set('refreshtoken', res.headers.refreshtoken, {
        path: '/',
        secure: true,
        sameSite: 'none',
        expires: exDate,
      });
      UseAxios.get(`/users/profiles`).then((res) => {
        setUserData(res.data);
        navigate('/');
      });
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ textAlign: 'center', marginLeft: 20, marginRight: 20 }}>
        <div style={{ marginTop: 100, marginBottom: 50 }}>
          <Jello duration={1500}>
            <img
              src={require('../assets/img/kirin_logo_nobackground.png')}
              style={{ width: 100 }}
            ></img>
          </Jello>
        </div>
        <Typography component='h1' variant='h5'></Typography>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          margin='normal'
          required
          fullWidth
          id='email'
          label='이메일'
          name='email'
          autoComplete='email'
          autoFocus
          size='small'
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          margin='normal'
          required
          fullWidth
          name='password'
          label='비밀번호'
          type='password'
          id='password'
          autoComplete='current-password'
          size='small'
        />
        <Button
          type='submit'
          onClick={onSubmit}
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 1 }}
        >
          로그인
        </Button>
        <div style={{ textAlign: 'center' }}>
          <Link href='/findpassword' variant='body2'>
            비밀번호 찾기
          </Link>
          <span> / </span>
          <Link href='/signup' variant='body2'>
            회원가입
          </Link>
        </div>
        {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link href='/findpassword' variant='body2'>
            비밀번호 찾기
          </Link>
          <Link href='/signup' variant='body2'>
            회원가입
          </Link>
        </div> */}
      </div>
    </ThemeProvider>
  );
}

export default LoginPage;
