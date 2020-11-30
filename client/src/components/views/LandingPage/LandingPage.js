import {useEffect} from 'react';
import axios from 'axios';
import './LandingPage.scss';

function LandingPage() { 

  useEffect(() => {
    axios.get('http://localhost:5000/api/hello')
          .then(res => console.log(res.data));
  }, []);

  return (
    <p className="landing">landing page</p>
  );
}

export default LandingPage;