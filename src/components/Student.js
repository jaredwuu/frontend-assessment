
import React, { useEffect, useState } from 'react'

import Grades from './Grades'
import Tags from './Tags';

const Student = () => {
    const [showGrades, setShowGrades] = useState(false)
    const [preX, setPreX] = useState(null)
    const [data, setData] = useState([]);
    const n = data.length;
    const [tags, setTags] = useState([])
    const [newTag, setNewTag] = useState('')
    const [keyName, setKeyName] = useState('')
    const [keyTag, setKeyTag] = useState('')
    const [defaultData, setDefaultData] = useState(null);

    useEffect(() => {
        fetch(`https://api.hatchways.io/assessment/students`)
            .then((res) => res.json())
            .then(data => {
                setData(data.students)
                setDefaultData(data.students)
            });
    }, []);

    const handleshowGrades = (x) => {
        if (x.showGrades === undefined) {
            x.showGrades = false;
        }
        if (x !== preX && showGrades !== x.showGrades) {
            setShowGrades(x.showGrades);
        }


        setShowGrades(
            (showGrades) =>
                x.showGrades = !showGrades
        )
        setPreX(x);
        // console.log(showGrades);
        // console.log(x.showGrades);    
    }

    const ave = arr => arr.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0) / arr.length;

    const handleNameSearch = (event) => {
        if (event.key === 'Enter') {
            const filtered = defaultData.filter(student => {
                return (student.firstName.toLowerCase().includes(keyName.toLowerCase()) || student.lastName.toLowerCase().includes(keyName.toLowerCase()))
            })
            // console.log(filtered)
            setData(filtered);
            if (keyName === '') setData(defaultData);
        }
        // console.log(keyName);

    }

    const handleTagSearch = (event) => {
        if (event.key === 'Enter') {
            const filtered = defaultData.filter(student => {
                return (student.myTags.join('-').toLowerCase().includes(keyTag.toLowerCase()))
            })

            setData(filtered);
            if (keyTag === '') setData(defaultData);
        }
    }

    const getkeyName = (e) => {
        setKeyName(e.target.value)

    }
    const getkeyTag = (e) => {
        setKeyTag(e.target.value)
    }

    const Tag = (e) => {
        setNewTag(e.target.value);
        //console.log(newTag)
    }

    const handleKeyDown = (e, student) => {
      
        if (e.key === 'Enter'&&newTag !==null) {
            // let tem = [...tags];
            // tem[parseInt(student.id)-1] = [...tem[parseInt(student.id)-1],newTag]
           
            //setTags((arr)=>[...arr[student.id],newTag]))
             setTags(arr =>[...arr, newTag]);
            //setTags(tem);
            //newTag = null;
            //student.myTags.push(newTag);
            e.target.value = null;
        }
        setNewTag(null)
       
    }

    const handleAddTag = (student) => {
        //console.log(tags)
        student.myTags = [tags[parseInt(student.id)-1]]      
       // console.log(student.id)
        console.log(tags)
    
    }


    if (data) {

        return (
            <div>
                <input className="w-full h-8 border-b focus:outline-none focus:ring focus:border-blue-300 px-2" type="text" placeholder='Search by name'
                    onChange={getkeyName} onKeyDown={handleNameSearch} />
                <input className="w-full h-8 border-b focus:outline-none focus:ring focus:border-blue-300 px-2" type="text" placeholder='Search by tag'
                    onChange={getkeyTag} onKeyDown={handleTagSearch} />
                <ul className="overflow-y-auto" style={{ height: "480px" }}>
                    {data.map((x) => {
                        return (
                            <div key={x.id}>
                                <div className='flex py-4'>
                                    <div className='py-4'>
                                        <img className='mx-4 rounded-full border-2 h-24 w-24 flex justify-center' src={(x.pic)} alt='pic' />
                                    </div>
                                    <div className='flex justify-between w-full px-2'>
                                        <div>
                                            <div className="text-4xl px-4">{(x.firstName).toUpperCase() + " " + (x.lastName).toUpperCase()}</div>
                                            <div className='px-8'>
                                                <div>Eamil: {x.email}</div>
                                                <div>Compant: {(x.company)}</div>
                                                <div>Skills: {(x.skill)}</div>
                                                <div>Average: {ave(x.grades)}%</div>
                                                <Grades student={x} />
                                                <Tags tags={tags} student={x} />
                                                <div className='flex py-2'>
                                                    <input type='text' onChange={Tag} onKeyDown={handleKeyDown} className="bg-gray-500 border-b h-8 focus:outline-none focus:ring focus:border-blue-300 " placeholder='Add a tag' />
                                                    <button className='bg-white mx-2 px-2' onClick={handleAddTag(x)}>add Tag</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='my-2'>
                                            <button className='hover:text-white text-gray-700' onClick={() => handleshowGrades(x)}>
                                                {x.showGrades ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                                    </svg>
                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                                    </svg>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <hr className='opacity-50' />
                            </div>
                        )
                    }
                    )}
                </ul>
            </div>
        )
    }
    return <div>no data</div>
}

export default Student
