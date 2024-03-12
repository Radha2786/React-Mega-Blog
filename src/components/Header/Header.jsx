import React from 'react'
import { useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { Container , Logo, LogoutBtn } from '../index'
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux'


function Header() {
   
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
// is trah ki navigation bar jab bhi banti hai to is tareeke se array banate hai and us par iterate krte hain
    const navItems =[
        {
            name:'Home',
            slug:"/",
            active:true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
        // {
        //     name: "Edit Post",
        //     slug: "/edit-post",
        //     active: authStatus,
        // },
        // {
        //     name:"Delete Post",
        //     slug:"/delete-post",
        //     active:authStatus
        // }
    ]
  return (
    <header className='py-3 shadow bg-fuchsia-100'>
        <Container>
            <nav className='flex'>
                <div className='mr-4'>
                    <Link to='/'>
                        <Logo width='70px'/>
                    </Link>
                </div>
                <ul className='flex ml-auto'>
                    {navItems.map((item)=> item.active?(
                        <li key={item.name}>
                            <button onClick={() => navigate(item.slug)} className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>{item.name}</button>
                        </li>
                    ):null)}
                    {authStatus && (
                        <li>
                            <LogoutBtn/>
                        </li>
                    )}
                    </ul>
            </nav>
        </Container>

    </header>
  )
}

export default Header;