import React from 'react'

const Grades = ({student }) => {
    return (
        <div>
            {
                (student.showGrades) ? student.grades.map((grade, index) =>
                    <div key={index}>test {index + 1} <span className='mx-8' >{grade}%</span></div>
                )
                : ""
            }
        </div>
    )
}

export default Grades
