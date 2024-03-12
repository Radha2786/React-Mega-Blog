import React, { useEffect, useState } from 'react'
import  Container from '../components/Container/Container'
 import PostForm from '../components/post-form/PostForm'

import { useNavigate, useParams } from 'react-router-dom'
import  appwriteService  from '../appwrite/config';

function EditPost() {
    const navigate = useNavigate();
    const [post, setPosts] = useState(null);
    const {slug}= useParams();
    useEffect(()=>{
        if(slug){
           appwriteService.getPost(slug).then((post)=>{
            if(post){
                setPosts(post)
            }
           })
    }else{
            navigate('/');
        }
    },[useNavigate,slug])
  return post ?(
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ) : null
}

export default EditPost