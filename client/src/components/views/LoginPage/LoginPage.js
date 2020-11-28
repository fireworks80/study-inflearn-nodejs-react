import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import './LoginPage.scss';
function LoginPage() { 

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onEmailHandler = e => {
    setEmail(e.target.value);
  };

  return (
    <Form>
      <Form.Item 
        label="Email"
        name="email"
        rules={[
          {required: true,
          message: 'Please input your email'}
        ]}
        >
          <Input value={email} onChange={onEmailHandler} />
        </Form.Item>
        <Form.Item 
          label="Password"
          name="pw"
          rules={[
            {required: true,
            message: 'Please input your password'}
          ]}
        >
          <Input value={password} onChange />
        </Form.Item>
      <Button type="primary">Login</Button>
    </Form>
  );
}

export default LoginPage;