
'use client'
import { useContext,useRef } from "react"
import { UserContext } from "../context/userContext"
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
function ProfileImage() {
  const context = useContext(UserContext);
  const inputRef = useRef();
  
  const sendFileToBackend = async(e)=>{
    context.setlodingProfileImages(true)
const formData = new FormData();

formData.append('file',e.target.files[0]);
formData.append("image",context.userdata.profileImage)
const response = await axios.post('api/user/change-profile-image',formData);

context.setlodingProfileImages(false)
  }

  return (
    <div className="h-44 w-44 rounded-full  relative flex justify-center items-center cursor-pointer ml-20" onClick={()=>inputRef.current.click()}>
        <div class="h-full w-full rounded-full absolute flex justify-center items-center mr-10">
            <img src={context.userdata?.profileImage || "/images/44884218_345707102882519_2446069589734326272_n.jpg"} alt="profileimage"  className=' w-full h-full object-cover  rounded-full object-right-top'/>
        </div>
        <div class="h-full w-full rounded-full absolute  flex justify-center items-center mr-10 bg-[#3939393a]">
        {
         context.lodingProfileImages?<FontAwesomeIcon icon={faSpinner} className="animate-spin text-white text-3xl"/>: <svg viewBox="0 0 24 24" width="44" height="44" fill="currentColor" className="x14ctfv xtzzx4i x10l6tqk xwa60dl x11lhmoz"><path d="M12 9.652a3.54 3.54 0 1 0 3.54 3.539A3.543 3.543 0 0 0 12 9.65zm6.59-5.187h-.52a1.107 1.107 0 0 1-1.032-.762 3.103 3.103 0 0 0-3.127-1.961H10.09a3.103 3.103 0 0 0-3.127 1.96 1.107 1.107 0 0 1-1.032.763h-.52A4.414 4.414 0 0 0 1 8.874v9.092a4.413 4.413 0 0 0 4.408 4.408h13.184A4.413 4.413 0 0 0 23 17.966V8.874a4.414 4.414 0 0 0-4.41-4.41zM12 18.73a5.54 5.54 0 1 1 5.54-5.54A5.545 5.545 0 0 1 12 18.73z"></path></svg>
        }
        </div>
  <input type="file" className="hidden" onChange={sendFileToBackend} ref={inputRef}/>
    </div>
  )
}

export default ProfileImage