import React, { useState, useContext} from 'react'
import Context from '../../Authentication/Context'
import LoginHeader from '../../Header/LoginHeader'
import {ErrorMessage, Formik, Form, Field} from 'formik'
import './Login.css'
import * as yup from 'yup'
import axios from 'axios'


export default function Login(props) {
  const [user, setUser] = useState('');
  const [password , setPassoword] = useState('');
  const {setToken} = useContext(Context)

  const handleSubmit = values => {
    axios.post('http://localhost:8080/auth/authenticate', values)
    .then(resp => {
      const { data } = resp
      if (data) {
        localStorage.setItem('app-token', data)
      }
    })

    const {token,error} = this.login(user,password)
    if(token){
      setToken(token)
      props.history.push('/')
    }else {
      alert(error)
    }
  }
  const validations = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
  })

  return ([
    <div className="login-container">
      <LoginHeader/>
      <Formik 
      initialValues={{}} 
      onSubmit={handleSubmit} 
      validationSchema={validations}>
        <Form className="Login">
          <div className="Login-Group">
            <p><b>Email:</b></p>
            <Field name="email"
            className="Login-Field"
            title="Email"
            />
            <ErrorMessage
            component="span"
            name="email"
            className="Login-Error"
            />
            <p><b>Senha:</b></p>
            <Field name="password"
            className="Login-Field"
            title="senha"
            size="8"
            maxLength="8"
            />
            <ErrorMessage
            component="span"
            name="password"
            className="Login-Error"
            />
            <button className="Login-btn" type="submit">Login</button>
            <a href='/register'>Ainda não é cadastrado? Clique aqui para se cadastrar!</a>
          </div>
        </Form>
      </Formik>
    </div>
  ])

}