import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};

export default function Register(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  });

  const onChange = e => { 
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const onSubmit = (e) => { 
    
    const { password, confirmPassword } = inputs;
    if (password !== confirmPassword) {
      return alert('비밀번호가 다름');
    }

    dispatch(registerUser(inputs))
      .then(res => {
        if (res.payload.success) {
          props.history.push('/login');
        } else {
          alert('error');
        }
      });
  };



  return (
    <Form {...layout} form={form} onFinish={onSubmit}>
      <Form.Item label="Email" name="email">
        <Input name="email" type="email" onChange={onChange} />
      </Form.Item>
      <Form.Item label="Name" name="name">
        <Input name="name" onChange={onChange} />
      </Form.Item>
      <Form.Item label="Password" name="password">
        <Input name="password" type="password" onChange={onChange} />
      </Form.Item>
      <Form.Item label="Confirm Password" name="ConfirmPassword">
        <Input name="confirmPassword" type="password" onChange={onChange} />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">회원가입</Button>
      </Form.Item>
    </Form>
  )
}
