import React, { FC } from 'react';
import { Button, DatePicker } from 'antd';
// import './App.less';

const Login: FC = () => {
  return (
    <>
      <Button type="primary">PRESS ME</Button>
      <DatePicker placeholder="select date" />
    </>
  );
}

export default Login;