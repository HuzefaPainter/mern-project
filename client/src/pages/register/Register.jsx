import React from 'react'
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser } from 'api/users';

function Register() {

  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("values are: ", values);
    try {
      const response = await RegisterUser(values);
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (e) {
      console.log("Error: ", e);
    }
  };
  return (
    <>
      <main className='App-header'>
        <h1>Register on BookMyShow!</h1>
        <section className='mw-500 text-center px-3'>
          <Form layout='vertical' onFinish={onFinish}>
            <Form.Item
              label='Name' htmlFor='name' name="name" className='d-block' rules={[
                { required: true, message: "name is required" },
              ]}>
              <Input
                type='text' placeholder='Enter Your Name'
              ></Input>
            </Form.Item>
            <Form.Item
              label='Email' htmlFor='email' name="email" className='d-block' rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Enter a valid email" }
              ]}
            >
              <Input
                type='text' placeholder='Enter Your Email'
              ></Input>
            </Form.Item>
            <Form.Item
              label='Password' htmlFor='password' name="password" className='d-block' rules={[
                { required: true, message: "Password is required" },
              ]}
            >
              <Input
                type='password' placeholder='Enter Your Password'
              ></Input>
            </Form.Item>
            <Form.Item className='d-block'>
              <Button type='primary' block htmlType='submit' style={{ fontSize: "1rem", fontWeight: "600" }}>
                Register
              </Button>
            </Form.Item>
          </Form>
          <div>
            <p>
              Already a User? <Link to="/login">Login</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

export default Register