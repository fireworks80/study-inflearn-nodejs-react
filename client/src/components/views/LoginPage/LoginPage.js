import { useState, useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

import './LoginPage.scss';


function LoginPage(props) { 
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  const { email, password } = inputs;

  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();

  const onInputsHandler = useCallback(e => {
    const { value, name } = e.target;

    setInputs({
      ...inputs,
      [name]: value
    });
  }, [inputs]);

  const onSubmitHandler = (e) => {
    // e.preventDefault();
    // console.log(inputs);

    dispatch(loginUser(inputs)).then(res => { 
      if (res.payload.loginSuccess) {
        props.history.push('/');
      } else {
        alert('error');
      }
    });
    

  };

  return (
    <Form onFinish={onSubmitHandler}>
      <Form.Item 
        label="Email"
        name="email"
        rules={[
          {required: true,
          message: 'Please input your email'}
        ]}
        >
          <Input name="email" value={email} onChange={onInputsHandler} />
        </Form.Item>
        <Form.Item 
          label="Password"
          name="password"
          rules={[
            {required: true,
            message: 'Please input your password'}
          ]}
        >
          <Input name="password" value={password} onChange={onInputsHandler} />
        </Form.Item>
      <Button type="primary" htmlType="submit">Login</Button>
    </Form>
  );
}

export default LoginPage;