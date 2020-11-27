import {useEffect} from 'react';
import axios from 'axios';

function LandingPage() { 

  useEffect(() => {
    axios.get('http://localhost:5000/api/hello')
          .then(res => console.log(res.data));
  }, []);

  return (
    <p>landing page</p>
  );
}

export default LandingPage;