import {useEffect} from 'react';
import axios from 'axios';
import { Button } from 'antd';
import './LandingPage.scss';

function LandingPage(props) { 
  useEffect(() => {
    axios.get('http://localhost:5000/api/hello')
          .then(res => console.log(res));
  }, []);

  const onLogoutHandle = () => { 
    axios.get('http://localhost:5000/api/users/logout')
      .then(res => {
        console.log(res.data);
        // if (res.data) {
        //   props.history.push('/login');
        // } else {
        //   alert('로그아웃 하는데 문제 생김');
        //   console.log(res);
        // }
      });
  };

  return (
    <div className="landing">
      <p>landing page</p>
      <Button type="primary" onClick={onLogoutHandle}>Logout</Button>
    </div>
  );
}

export default LandingPage;