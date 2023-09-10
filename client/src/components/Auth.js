import { useState } from 'react'
import { useCookies } from 'react-cookie'

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [err, setErr] = useState(null)

  const handelSubmit = async(e, endPoint) =>{
    e.preventDefault()
    if(!isLogin && password !== confirmPassword){
      setErr("Passwords are not matching")
      return
    }
    const response = await fetch(`http://localhost:8000/${endPoint}`,{
      method : 'POST',
      headers : { 'Content-Type' : 'application/json' },
      body : JSON.stringify({email,password})
    })
    const data = await response.json()
    if(data.detail){
      setErr(data.detail)
    }
    else{
      setCookie('Email',data.email)
      setCookie('AuthToken', data.token)

      window.location.reload()
    }
  }

  const viewLogin = (status) => {
    setIsLogin(status)
    setErr(null)
  }
    return (
      <div className="auth-container">
        <div className="auth-container-box">
          <form>
            <h2>{isLogin ? 'Please Login' : 'Please Signup'}</h2>
            <input
              type = "email"
              placeholder = "Please enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type ="password"
              placeholder = "Please enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            { !isLogin && <input
              type = "password"
              placeholder = "Please confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />}
            <input type="submit" className="create" onClick={(e) => handelSubmit(e, isLogin ? 'login' : 'signup')} />
            {err && <p>{err}</p>}
          </form>
          <div className="auth-options">
            <button 
              onClick={()=>viewLogin(true)} 
              style={{backgroundColor : isLogin ? 'rgb(255,255,255)' : 'rgb(188,188,188)'}}
            >Log in</button>
            <button 
              onClick={()=>viewLogin(false)} 
              style={{backgroundColor : !isLogin ? 'rgb(255,255,255)' : 'rgb(188,188,188)'}}
            >Sign up</button>
          </div>
        </div>
      </div>
    )
  }
  
  export default Auth