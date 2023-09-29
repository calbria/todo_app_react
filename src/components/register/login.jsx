/* eslint-disable react/prop-types */
import './register.scss';

export default function LoginForm({signupBtnHandler}) {
return (<>
<h2>Login</h2>
<p>Please sign in to continue</p>
<form action="">
    <label htmlFor="">
        Email
    <input type="email" placeholder='email'/>
    </label>
    <label htmlFor="">
        Password
    <input type="password" placeholder='password'/>
    </label>
    <button type='submit'>LOGIN</button>
    
</form>
<p>Don&apos;t have an account? <span className='sign-btn' onClick={signupBtnHandler}>Sign up</span></p>
</>);
}
