import React from 'react'
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <>
      <main className='App-header'>
        <h1>Login to BookMyShow!</h1>
        <section className='mw-500 text-center px-3'>
          <Form layout='vertical'>
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
                Login
              </Button>
            </Form.Item>
          </Form>
          <div>
            <p>
              New User? <Link to="/register">Register here</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

export default Login