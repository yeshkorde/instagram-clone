"use client"
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faX ,faSpinner} from '@fortawesome/free-solid-svg-icons';
import { useState,useRef,useEffect,useContext } from 'react';
import { UserContext } from '@/app/context/userContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
function Create() {
  const [images, setimages] = useState([])
  const inputRef = useRef();
  const path = usePathname();
  const [files, setfiles] = useState([]);
  const context = useContext(UserContext)
  const [text, settext] = useState({
    caption:'',
    discraption:'',
    links:''
  })
  const [isLodinng, setisLodinng] = useState(false)
  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm();



  const handleFiles = (e)=>{
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setimages((prev)=>[...prev,url])
    setfiles((prev)=>[...prev,file])
    e.target.value=''    
  }

  const deleteImage = (idx)=>{
   setimages(images.filter((img,ind)=>ind !== idx))
   setfiles(files.filter((file,ind)=>ind !== idx))
  }

  useEffect(()=>{  
  },[images])


const HandleSubmit=async(e)=>{
  setisLodinng(true)
  e.preventDefault();
const formData = new FormData();
const textinString = JSON.stringify(text);
formData.append('text',textinString);
files.forEach((file)=>{
  formData.append('file',file)
})

const res = await axios.post('api/posts/create-post',formData)
if(res.data.sucess){
  toast.success("Post Created SucessFully",{
    style:{
      backgroundColor:"#0d0503",
      color:"white",
    },
    duration:3000,
  })
}
setfiles([]);
setimages([])
settext({caption:"",discraption:"",links:""})
setisLodinng(false)
}

  return (
  <div className='h-full w-full px-4 py-4 pt-10 text-white'>
    <div className='w-full flex justify-start mt-4 mb-20  gap-10 items-center px-10'>
      <Link href="/create">
        <button className={`text-sm font-semibold py-2 px-4 rounded-xl ${path === "/create"?"bg-white text-black hover:bg-white/85 transition-all duration-500":"bg-[#0c0c0c] text-white"}`}>Create Post</button>
      </Link>
      <Link href="/create/createReel">
        <button className={`text-sm font-semibold py-2 px-4 rounded-xl ${path === "/create/createReel"?"bg-white text-black":"bg-[#0c0c0c] text-white"}`}>Create Reel</button>
      </Link>
    </div>
  <div className='flex justify-center items-center flex-col'>
    <div className="px-4 py-4  w-full flex gap-4">
    <div className='h-20 w-20 rounded-full relative flex justify-center items-center'>
 <div className='h-[88px] w-[88px] absolute bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-700 animate-spin rounded-full flex justify-center items-center p-2 '>

</div>
<div className='h-full w-full absolute bg-black rounded-full flex justify-center items-center'>
  <img src={context.userdata?.profileImage || "/images/44884218_345707102882519_2446069589734326272_n.jpg"} className='h-full w-full rounded-full object-cover'/>
 </div>
    </div>
      <div className="">
        <p className='text-lg font-semibold mt-2'>{context.userdata.username}</p>
        <p className='text-[12px] text-[#bebebe]'>followers {context.lengths.followersLength}</p>
      </div>
    </div>
  <form className='h-full w-full  flex flex-col items-center justify-center mt-10' onSubmit={HandleSubmit}>
<div className="flex justify-start items-center px-4 py-4 gap-4 flex-wrap scroll">
  {
    images.map((image,ind)=>(
      <div className="flex flex-col justify-center items-center" key={ind}>
      <img src={image}   className='max-h-60  object-cover rounded-xl'/>
      <div class="h-8 w-8  mt-4 rounded-full bg-[#212121] flex justify-center  items-center cursor-pointer" onClick={()=>deleteImage(ind)}>
        <FontAwesomeIcon icon={faX} className='text-[12px] font-extrabold'/>
      </div>
    </div>
    ))
  }
<div className={`w-14 h-14 bg-[#0c0c0c] flex justify-center flex-col items-center rounded-full cursor-pointer ${isLodinng?"hidden":"block"}`} onClick={()=>inputRef.current.click()}>
<input type="file" className='hidden' ref={inputRef} onChange={handleFiles}/>
<FontAwesomeIcon icon={faUpload} className='text-xl '/>
</div>
</div> 
<div className="w-full flex flex-col justify-center items-start mt-10 text-start">
  <label htmlFor="" className='mb-2 ml-2 text-[#888] font-semibold'>caption</label>
  <input 
  type="text"
   className='h-10 w-1/2 bg-[#0c0c0c] outline-none shadow-2xl rounded-xl px-2 text-[#888] text-sm'
   onChange={(e)=>settext((prev)=>({...prev,caption:e.target.value}))}
   />
</div>
<div className="w-full flex flex-col justify-center items-start mt-10 text-start">
  <label htmlFor="" className='mb-2 ml-2 text-[#888] font-semibold'> discripation</label>
<textarea  onChange={(e)=>settext((prev)=>({...prev,discraption:e.target.value}))} className='resize-none h-80 w-1/2 bg-[#0c0c0c] outline-none shadow-2xl rounded-xl px-2 py-2 text-[#888] text-sm'></textarea>
</div>
<div className="w-full flex flex-col justify-center items-start mt-10 text-start">
  <label htmlFor="" className='mb-2 ml-2 text-[#888] font-semibold'>Links</label>
  <input type="text"  onChange={(e)=>settext((prev)=>({...prev,links:e.target.value}))} className='h-10 w-1/2 bg-[#0c0c0c] outline-none shadow-2xl rounded-xl px-2 text-[#888] text-sm' disabled={true}/>
</div>
<div className="w-full">
{
  isLodinng ? <div className="flex justify-center items-center w-1/2 mt-4 mb-4"><FontAwesomeIcon icon={faSpinner} className='text-2xl text-center text-white  animate-spin'/> </div>:<button className='h-12  text-black w-1/2 bg-white  font-semibold rounded-2xl shadow-2xl mt-10 mb-10'>
  Uplode Post
</button>
}
</div>
  </form>
  </div>
  </div>
  )
}

export default Create;  