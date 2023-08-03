import React from 'react'
import ListBlogs from './ListBlogs'
import { db } from '../../firebase/config'
import { ref, set } from 'firebase/database'

function Home() {
  const userId = 347548
  const data = [{
    username: 'name',
    email: 'email',
    profile_picture : 'imageUrl'
  }]
  const wd =()=>{
  set(ref(db, 'posts/' ), data).then((re)=>{console.log('suc')}).catch((err)=>{console.log(err)})
}
  return (
    <div>
      <button onClick={wd}>wd</button>
    <div>
        <ListBlogs/>
    </div>
    </div>
  )
}

export default Home