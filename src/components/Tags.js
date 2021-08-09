import React from 'react'

const Tags = ({ tags, student }) => {
    return (
        <div className='flex'>
            {tags.map((tag, i) => {
                return (

                    <div key={i} className="bg-gray-700 mx-2 px-3 rounded">{tag}</div>

                )
            })}
        </div>
    )
}

export default Tags
