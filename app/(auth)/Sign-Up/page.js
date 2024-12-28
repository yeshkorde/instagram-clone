'use client'
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

function Page() {
  const [isLoding, setisLoding] = useState(false);
  const [error, seterror] = useState('')
  const router = useRouter();
 const {
  register,
  handleSubmit,
  formState:{errors},
  reset,
 } = useForm()

const onsubmit = async(data)=>{
  try {
   setisLoding(true)
    reset();
    const responce = await axios.post('api/auth/sign-up',data)
    console.log(responce.data);
    
    if(responce.data.error){
      seterror(responce.data.error)
    }
    if(responce.data.sucess){
      router.push('/')
    }
    setisLoding(false)
  } catch (error) {
   console.log('some thing want wrong to sign-up user ', error.message);
    
  }finally{
    setisLoding(false)
  }
}
  return (
 <div className="h-full w-full relative">
<div className="h-screen w-screen  absolute px-6 py-10 ">
</div>
<div className="h-screen w-screen px-4  absolute flex justify-center items-center flex-col bg-slate-100 text-black">
  <div className="h-[80%] w-[25%]  pt-4 flex justify-start items-center flex-col gap-4    rounded-2xl">
    <div className=""><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="70" height="70" viewBox="0 0 48 48 ">
<radialGradient id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop  offset="0" stopColor="#fd5"></stop><stop offset=".328" stopColor="#ff543f"></stop><stop offset=".348" stopColor="#fc5245"></stop><stop offset=".504" stopColor="#e64771"></stop><stop offset=".643" stopColor="#d53e91"></stop><stop offset=".761" stopColor="#cc39a4"></stop><stop offset=".841" stopColor="#c837ab"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20 c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20 C42.014,38.383,38.417,41.986,34.017,41.99z"></path><radialGradient id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#4168c9"></stop><stop offset=".999" stopColor="#4168c9" stopOpacity="0"></stop></radialGradient><path fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20  c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20 C42.014,38.383,38.417,41.986,34.017,41.99z"></path><path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5  s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"></path><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle><path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12  C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"></path>
</svg></div>
    <div className="w-full h-full px-4 mt-2">
     <form action="" className="h-full w-full flex flex-col gap-10" onSubmit={handleSubmit(onsubmit)}>
      <div className="w-full">
        <label htmlFor="username" className="text-[12px] ml-4 font-semibold">Username</label>
        <input type="text" 
        {...register('username',{required:{value:true,message:'UserName is Required Please Enter userName '}})}
               className="h-12 mt-2 w-full bg-white shadow-2xl rounded-2xl outline-none px-4 text-sm"/>
        {errors.username&& <p className="text-[10px] text-red-500 font-semibold mt-2 ml-4">{errors.username.message}</p>}
      </div>
      <div className="w-full">
        <label htmlFor="username" className="text-[12px] ml-4 font-semibold">Email</label>
        <input 
        type="text"
         {...register('email',{required:{value:true,message:'Email is Required Please Enter Email '},pattern:{ value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "Invalid email address Pleace Enter Valid Email",}})} 
         className="h-12 mt-2 w-full bg-white shadow-2xl rounded-2xl outline-none px-4 text-sm"/>
        {errors.email && <p className="text-[10px] text-red-500 font-semibold mt-2 ml-4">{errors.email.message}</p>}
      </div>
      <div className="w-full">
        <label htmlFor="username" className="text-[12px] ml-4 font-semibold">Password</label>
        <input
         type="text" 
         {...register('password',{required:{value:true,message:'Password is Required Please Enter Password '}})} 
         className="h-12 mt-2 w-full bg-white shadow-2xl rounded-2xl outline-none px-4 text-sm"/>
        {errors.password && <p className="text-[10px] text-red-500 font-semibold mt-2 ml-4">{errors.password.message}</p>}
       </div>
      {
        isLoding?
        <div className="w-full flex justify-center items-center"> <FontAwesomeIcon icon={faSpinner} className="text-3xl animate-spin "/></div>
        :<div>
          {
            error && <p className="text-[10px] text-red-500 font-bold mb-2 ml-4">{error}</p>
          }
          <button className="py-4 w-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-700 text-white border-4 border-white font-bold rounded-2xl shadow-2xl">Sign-UP</button>
          <Link href={"/Sign-In"}><p className="text-[12px] font-semibold mt-2 ml-4 ">You All Ready have Account Then <span className="text-blue-500">Sign-in</span></p></Link>
          </div>
      }
     </form>
    </div>
  </div>
</div>
 </div>
  )
}

export default Page

