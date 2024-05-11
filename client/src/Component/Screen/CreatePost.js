import React, { useState,useEffect } from 'react';
import Ma from 'materialize-css'
import {Link, useNavigate} from 'react-router-dom'


export const CreatePost=()=>{
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [urld, setUrld] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        if(urld){
            fetch('/createPost', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem("jwt")
                },
                body: JSON.stringify(
                    {
                        title: title,
                        body: description,
                        photo: urld
                    }
                )
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        Ma.toast({ html: data.error, classes: "purple" });
                    } else {
                        Ma.toast({ html: "created post successfully", classes: "purple" });
                        navigate('/');
                    }
                })
                .catch(err => {
                    console.error('Error:', err);
                });
        }
    },[urld])
    const postDetails=async()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","mySocialNetwork")
        data.append("cloud_name","mycloud615")
        await fetch("https://api.cloudinary.com/v1_1/mycloud615/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json()).then(data=>{
            setUrld(data.url)
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
        <div className="card input-filed"
        style={{
            margin:"10px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}>
            <input
                type="text"
                placeholder = "title"
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
            />
            <input
                type="text"
                placeholder = "description"
                value={description}
                onChange={(e)=>{
                    setDescription(e.target.value)
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
            <button className="btn waves-effect waves-light purple" type="submit" name="action"
            onClick={()=>postDetails()}
            >Upload
            </button>
        </div>
    )
}
