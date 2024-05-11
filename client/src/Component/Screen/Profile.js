import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../App'

const Profile = ()=>{
    const {state,dispatch} = useContext(userContext)
    const [mypics,setMypics] = useState([])
    // const followingLength = JSON.parse(localStorage.getItem("user")).following
    // console.log(followingLength)
    useEffect(()=>{
        fetch("/mypost",{
            headers:{
                "authorization":localStorage.getItem("jwt")
            }
        }).then(res=>
            res.json()
        ).then(result=>{
            setMypics(result)
        })
    },[])

    return(
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
            <div style={{display:"flex",
            justifyContent:"space-around",
            margin:"18px 0px",
            borderBottom:"1px solid grey"}}>
                <div>
                    <img style={{
                        width:"160px",
                        height:"160px",
                        borderRadius:"80px",
                    }} src={state?state.pic:"loading"}/>
                </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <div style={{display:"flex",justifyContent:"space-around"}}>
                        {/* <h6>Posts</h6> */}
                        <h6 style={{paddingLeft:"10px",paddingRight:"10px"}}>{JSON.parse(localStorage.getItem("user")).followers.length} followers</h6>
                        <h6>{JSON.parse(localStorage.getItem("user")).following.length} following</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                    mypics.map(items=>{
                        return(
                            <img style={{padding:"10px"}} key={items._id} className="item" src={items.photo}/>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Profile;