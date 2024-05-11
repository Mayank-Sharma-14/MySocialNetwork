import React,{ useState,useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Mo from 'materialize-css'
import { userContext } from '../../App'


const Login = ()=>{
    const {state,dispatch} = useContext(userContext)
    const navigate = useNavigate()
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const Postdata = () =>{
        fetch('/signin',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(
                {
                    email:email,
                    password:password
                }
            )
        }).then(res=>res.json()).then(data=>{
            if(data.error){
                Mo.toast({html:data.error,classes:"purple"})
                // alert(`${data.error}`)
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))

                dispatch({type:"USER",payload:data.user})
                Mo.toast({html:"signin successfull",classes:"purple"})
                navigate('/')
            }
        })
    }
    return(
        <div className = "mycard">
            <h3 className="cardDiv"><b>LOGIN</b></h3>
            <div className="card auth-card purple lighten-5">
                <h3>My Social Network</h3>
                <input type="text" className="input-field" placeholder='Email'
                value={email}
                onChange={(e)=>{
                    setemail(e.target.value)
                }}
                />
                <input type="password" placeholder='Password'
                value={password}
                onChange={(e)=>{
                    setpassword(e.target.value)
                }}
                />
                <button onClick={()=>{
                    Postdata()
                }}
                className="btn waves-effect waves-light purple" type="submit" name="action">Login
                    <i className="material-icons right">send</i>
                </button>
                <h6><Link to ='/signup' className="purple-text text-darken-2">Don't have an account?Click here</Link></h6>
            </div>
        </div>
    )
}
export default Login;