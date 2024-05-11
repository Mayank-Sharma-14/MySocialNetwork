import React, { useState,useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import M from 'materialize-css'
const Signup = ()=>{
    const navigate = useNavigate()
    const [name,setname] = useState("")
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const [url,setUrld] = useState(undefined)
    const [image,setImage] = useState("")

    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])

    const uploadpic = async() =>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","mySocialNetwork")
        data.append("cloud_name","mycloud615")
        await fetch("https://api.cloudinary.com/v1_1/mycloud615/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json()).then(data=>{
            setUrld(data.url)
            console.log(url)
        }).catch(err=>{
            console.log(err)
        })
    }

    const uploadFields = ()=>{
        fetch('/signup',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(
                {
                    name:name,
                    email:email,
                    password:password,
                    pic:url
                }
            )
        }).then(res=>res.json()).then(data=>{
            if(data.error){
                M.toast({html:data.error,classes:"purple"})
            }
            else{
                M.toast({html:data.message,classes:"purple"})
                navigate('/login')
            }
        })
    }
    const Postdata = () =>{
        if(image){
            uploadpic()
        }
        else{
            uploadFields()
        }
    
}
    return(
        <div className = "mycard">
            <h3 className="cardDiv"><b>SIGN-UP</b></h3>
            <div className="card auth-card purple lighten-5">
                <h3>My Social Network</h3>
                <input 
                    type="text"
                    className="input-field"
                    placeholder='Name'
                    value={name}
                    onChange={(e)=>{
                        setname(e.target.value)
                    }}
                />
                <input 
                    type="text"
                    className="input-field"
                    placeholder='Email'
                    value={email}
                    onChange={(e)=>{
                        setemail(e.target.value)
                    }}
                />
                <input
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e)=>{
                        setpassword(e.target.value)
                    }}
                />

            <div className = "file-field input-filed">
                <div className='btn purple'>
                    <span>Upload Photo</span>
                    <input type="file"
                    onChange={(e)=>{
                        setImage(e.target.files[0])
                    }}
                    />
                </div>
                <div className= "file-path-wrapper">
                    <input
                        className="file-path validate"
                        type="text"
                    />
                </div>
            </div>

                <button
                onClick={()=>{
                    Postdata()
                }}
                 className="btn waves-effect waves-light purple" type="submit" name="action">Sign-up
                    <i className="material-icons right">send</i>
                </button>
                <h6><Link to ='/login' className="purple-text text-darken-2">Already have an account?</Link></h6>
            </div>
        </div>
    )
    }
export default Signup;