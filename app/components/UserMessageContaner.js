import React from 'react'

function UserMessageContaner() {
  return (
      <div className="h-12 w-12 rounded-full relative flex justify-center items-center ">
            <div className="h-[115%] w-[115%] absolute bg-gradient-to-tr from-yellow-500 via-pink-500  to-purple-700 animate-spin rounded-full flex justify-center items-center p-2 "></div>
            <div className="h-full w-full absolute bg-black rounded-full flex justify-center items-center">
              <img
              src='/postes-images/1731346052281-15df1ca5-290f-4612-8aa3-a44acf7f7665-field-6574455_640.jpg'
                alt="profileimage"
                className=" searchInput w-full h-full object-cover  rounded-full object-top"
              />
            </div>
    </div>
  )
}

export default UserMessageContaner