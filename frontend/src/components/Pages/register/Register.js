import React from 'react'
import RegisterHeader from '../../Header/RegisterHeader'
import {ErrorMessage, Formik, Form, Field} from 'formik'
import './Register.css'
import * as yup from 'yup'
import axios from 'axios'

export default function Register() {
  const handleSubmit = values => {
    axios.post('http://localhost:8080/auth/register', values)
    .then(resp => {
      const { data } = resp
      if (data) {
        localStorage.setItem('app-token', data)
      }
    })
  }
  const validations = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    nome: yup.string().required(),
    sobrenome: yup.string().required()
  })

  return ([
    <div className="register-container">
      <RegisterHeader/>
      <Formik 
      initialValues={{}} 
      onSubmit={handleSubmit} 
      validationSchema={validations}>
        <Form className="Register">
          <div className="Register-Group">
            <p><b>Nome:</b></p>
            <Field name="nome"
            className="Register-Field"
            title="Nome"
            />
            <ErrorMessage
            component="span"
            name="nome"
            className="Register-Error"
            />
            <p><b>Sobrenome:</b></p>
            <Field name="sobrenome"
            className="Register-Field"
            title="Sobrenome"
            />
            <ErrorMessage
            component="span"
            name="sobrenome"
            className="Register-Error"
            />
            <p><b>Email:</b></p>
            <Field name="email"
            className="Register-Field"
            title="Email"
            />
            <ErrorMessage
            component="span"
            name="email"
            className="Register-Error"
            />
            <p><b>Senha:</b></p>
            <Field name="password"
            className="Register-Field"
            title="senha"
            size="8"
            maxLength="8"
            />
            <ErrorMessage
            component="span"
            name="password"
            className="Register-Error"
            />
            <button className="Register-btn" type="submit"><a href='/' id='register-btn-link' >Cadastrar</a></button>
            <a href='/login'>Já possui conta? Clique aqui para fazer login!</a>
          </div>
        </Form>
      </Formik>
    </div>
  ])
}