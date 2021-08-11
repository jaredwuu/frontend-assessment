import React from 'react'

const Frame = ({ children }) => {
    return (
        <div style={{ fontFamily: "Raleway, sans-serif" }}>
            <div className='flex justify-center h-screen items-center bg-gray-500'>
                <div className='mx-auto center w-1/2 border-gray-900 border-2 rounded' style ={{minWidth:"480px"}} >
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Frame
