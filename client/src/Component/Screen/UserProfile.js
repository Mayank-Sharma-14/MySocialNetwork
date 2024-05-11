import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../App'
import {useParams} from 'react-router-dom'

const UserProfile = ()=>{
    const {state,dispatch} = useContext(userContext)
    const [userProfile,setUserProfile] = useState("")
    const [userProfileEmail,setUserProfileEmail] = useState("")
    const [profile,setProfile] = useState()
    const [post,setPost] = useState([])
    const [prof,setProf] = useState({})
    const {id}= useParams()
    const [showfollow,setshowfollow] = useState(state?!state.following.includes(id):true)
    const [userPic,setUserPic] = useState("")

    useEffect(()=>{
        fetch(`/user/${id}`,{
            headers:{
                "authorization":localStorage.getItem("jwt")
            }
        }).then(res=>
            res.json()
        ).then(result=>{
            setUserProfile(result.user.name)
            setUserProfileEmail(result.user.email)
            setProfile(result.postdata.length)
            setPost(result.postdata)
            setProf(result)
            setUserPic(result.user.pic)
        })
    },[userProfile])

    const followUser = () =>{
        fetch("/follow",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "authorization":localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:id
            })
            }).then(res=>res.json()).then(data=>{
                dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
                localStorage.setItem("user",JSON.stringify(data))
                setProf((prevState)=>{
                    return{user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
                }
            });
            setshowfollow(false)
        }).catch(error=>{
            console.log("Error",error);
        })
    }

    const unfollowUser = () =>{
        fetch("/unfollow",{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "authorization":localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:id
            })
            }).then(res=>res.json()).then(data=>{
                dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
                localStorage.setItem("user",JSON.stringify(data))
                setProf((prevState)=>{
                    const newfollower = prevState.user.followers.filter(item=>item!=data._id)

                    return{user:{
                        ...prevState,
                        users:{
                            ...prevState.user,
                            followers:newfollower
                        }
                    }
                }
            });
            setshowfollow(true)
            window.location.reload()

        }).catch(error=>{
            console.log("Error",error);
        })
    }

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
                    }} src={userPic}/>
                </div>
                <div>
                    <h4>{userProfile}</h4>
                    <h5>{userProfileEmail}</h5>
                    <div style={{display:"flex",justifyContent:"space-around"}}>
                        <h6>{profile}Posts</h6>
                        <h6 style={{paddingLeft:"10px",paddingRight:"10px"}}>{prof.user===undefined?"":prof.user.followers===undefined?"":prof.user.followers.length} followers</h6>
                        <h6>{prof.user===undefined?"":prof.user.following===undefined?"":prof.user.following.length} following</h6>
                    </div>

                    {
                        !JSON.parse(localStorage.getItem("user")).following.includes(id) && showfollow?<button onClick={()=>{
                            followUser()
                        }}
                        className="btn waves-effect waves-light purple" type="submit" name="action">Follow
                        </button>:<button onClick={()=>{
                    unfollowUser()
                }}
                className="btn waves-effect waves-light purple" type="submit" name="action">UnFollow
                </button>   
                }
                

                </div>
            </div>
            <div className="gallery">
                {
                    post.map(items=>{
                        return(
                            <img key={items._id} className="item" src={items.photo}/>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default UserProfile;