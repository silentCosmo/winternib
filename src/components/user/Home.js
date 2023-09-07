import React from 'react'
import ListBlogs from './ListBlogs'

function Home() {
 /*  const userId = 347548
  const data = [{
    username: 'name',
    email: 'email',
    profile_picture : 'imageUrl'
  }]
  const wd =()=>{
  set(ref(db, 'posts/' ), data).then((re)=>{console.log('suc')}).catch((err)=>{console.log(err)})
} */
  return (
    <div className='min-h-screen'>
        <ListBlogs/>
    </div>
  )
}

export default Home