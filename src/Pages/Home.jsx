import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components';
import appWriteService from "../appwrite/config"
import appWriteServiceAuth from "../appwrite/auth"

function Home() {
    const [posts, setPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // check if user is logged in
        appWriteServiceAuth.getCurrentUser().then((user)=>{
            if(user){
                setIsLoggedIn(true);
                // fetch posts only if user is logged in
                appWriteService.getPosts().then((posts) => {
                    if (posts) {
                        setPosts(posts.documents);
                        setLoading(false);
                    }
                });
            }else{
                setIsLoggedIn(false);
                setPosts([]); // clear posts if user is not logged in
                setLoading(false);
            }
        });
        
    }, []);
    const handleLogout = async () => {
        await appWriteService.logout();
        setIsLoggedIn(false);
        setPosts([]);
    };

    return (
        <div className='w-full py-8'>
            <Container>
                {isLoggedIn?(
                    // render posts if user is logged in
                    <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />

                        </div>

                ))}
               
                </div>
                ):(
                     // Render login prompt if user is not logged in
                     <div className='flex flex-wrap'>
                     <div className="p-2 w-full">
                         <h1>Login to read posts</h1>
                     </div>
                 </div>
             )}
            </Container>
        </div>
    )
}


export default Home