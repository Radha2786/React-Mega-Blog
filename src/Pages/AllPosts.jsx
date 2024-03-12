import React, { useEffect, useState } from 'react'
import Container from '../components/Container/Container'
import PostCard from '../components/PostCard'
import appWriteService from '../appwrite/config'

function AllPosts() {
    const [posts, setPosts] = useState([]);

    const fetchData = async () => {
        const response = await appWriteService.getPosts()
        // if (posts) {
        //     setPosts(posts.documents)
        // }
        console.log(response);
        setPosts(response.documents);


    }
    console.log(posts);
    useEffect(() => { fetchData() }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => {
                        return (<div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                            </div>
                        )
                    })}
                </div>
            </Container>

        </div>

    )
}

export default AllPosts