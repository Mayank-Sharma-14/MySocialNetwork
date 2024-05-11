import React, { useState, useEffect, useContext } from 'react'
import { userContext } from '../../App'
import { Link } from 'react-router-dom'

const SubscribedUser = () => {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(userContext)
    useEffect(() => {
        fetch("/getsubpost", {
            headers: {
                "authorization": localStorage.getItem("jwt")
            }
        }).then(res => res.json()).then(result => {
            setData(result)
        })
    }, [data])

    const likePost = (id) => {
        fetch('/like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json()).then(result => {
            // console.log(result)
            const newData = data.map(item => {
                if (item._id == result._id) {
                    return result
                }
                else {
                    return item
                }
            })
            setData(newData)
        }).catch(err => {
            console.log(err)
        })
    }

    const unLikePost = (id) => {
        fetch('/unlike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json()).then(result => {
            // console.log(result)
            const newData = data.map(item => {
                if (item._id == result._id) {
                    return result
                }
                else {
                    return item
                }
            })
            setData(newData)
        }).catch(err => {
            console.log(err)
        })
    }

    const makeComment = (text,postId)=>{
        fetch('/comment',{
            method:"put",
            headers:{
                'Content-Type':'application/json',
                'authorization':localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text,
                name:JSON.parse(localStorage.getItem("user")).name
            })
        }).then(res=>res.json()).then(result=>{
            console.log(result)
            const newData = data.map(item => {
                if (item._id == result._id) {
                    return result
                }
                else {
                    return item
                }
            })
            setData(newData)
        }).catch(err => {
            console.log(err)
        })
    }

    const deletePost=(postId)=>{
        fetch(`/deletepost/${postId}`,{
            method:"delete",
            headers:{
                'authorization':localStorage.getItem("jwt")
            }
        }).then(res=>res.json()).then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id!=result.id
            })
            setData(newData)
        })
    }

    return (
        <div className="home">
            {data.map(item => {
                return (
                    <div className="card home-card" key={item._id}>
                        <div style={{
                            "display":"flex",
                            "justifyContent":"space-between",
                            "alignItems":"center"
                        }}>
                            <Link to={"/profile/"+item.postedby._id}><h5>{item.postedby.name}</h5></Link>
                            <i className='material-icons' style={{ color: "black", cursor:"pointer" }} onClick={()=>{
                                deletePost(item._id)
                            }}>delete</i>
                        </div>
                        <div className="card-image">
                            <img src={item.photo} />
                        </div>
                        <div className="card-content" key={item._id}>
                            {item.likes.includes(state._id) ? <i className='material-icons' style={{ color: "blue", cursor:"pointer"}}
                                onClick={() => {
                                    unLikePost(item._id)
                                }}>thumb_down</i> : <i className='material-icons' style={{ color: "blue",cursor:"pointer" }}
                                    onClick={() => {
                                        likePost(item._id)
                                    }}>thumb_up</i>}
                            <h6>{item.likes.length} likes</h6>
                            <h6>{item.title}</h6>
                            <p>{item.body}</p>
                            {
                                item.comments.map(record=>{
                                    return(
                                        <h6><span style={{
                                            fontWeight:"600"
                                        }}>{record.name} : </span>{record.text}</h6>
                                    )
                                })
                            }
                            <form  onSubmit={(e)=>{
                                e.preventDefault()
                                makeComment(e.target[0].value,item._id)
                                e.target[0].value=''
                            }}>
                                <input type="text" placeholder="Add a comment" />
                            </form>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default SubscribedUser;