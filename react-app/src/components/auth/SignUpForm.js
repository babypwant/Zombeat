import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import '../styles/SignUp.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    console.log(1)
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else if (username.length === 0) {
      setErrors("We need a name to call our new friend !")
    } else if (password !== repeatPassword) {
      setErrors("Passwords don't match")
    }


  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/dashboard' />;
  }
  return (<div className='row-2'>
    <div className='column-3'>
    </div>
    <div class="column-4">
      <form classname='sign-up-form' method="POST">
        <div className='sign-up-holder'>
          <label className='sign-up-title'> Get some rest, you deserve it. </label>
        </div>
        <div className='signup-div'>
          <label htmlFor='email' className='signup-form-label'>Name</label>
          <input
            name='username'
            type='text'
            placeholder='Name'
            value={username}
            onChange={updateUsername}
          />
        </div>
        <div className='signup-div'>
          <label htmlFor='email' class='signup-form-label'>Email</label>
          <input
            name='email'
            type='email'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className='signup-div'>
          <label htmlFor='password' class='signup-form-label'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <div className='signup-div'>
          <label htmlFor='password' class='signup-form-label'>Repeat Password</label>
          <input
            type='password'
            name='repeat_password'
            placeholder='Repeat Password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
      </form>
      <div className='errors'>

        {errors &&
          errors.map((error) => {
            return (
              <div>
                <p><i class="fas fa-exclamation-circle"></i> ${error}</p>
              </div>
            )
          })}
      </div>
      <div className='sign-up-form-btn-container'>
        <button type='submit' className='sign-up-form-btn' onClick={onSignUp}>Sign Up</button>
      </div>
    </div>
  </div >
  );
};

export default SignUpForm;
