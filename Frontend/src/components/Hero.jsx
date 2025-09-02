import React from 'react'

const Hero = () => {

    const EmployeeList = [
        { id:1, name:"Karthik", joiningDate: "12,11,2024", salary: 15000},
        { id:2, name:"Saravanan", joiningDate: "07,10,2024", salary: 16000},
        { id:3, name:"Vishnu", joiningDate: "02,06,2024", salary: 15000},
        { id:4, name:"Siva", joiningDate: "27,02,2024", salary: 17000},
        { id:5, name:"Naveen", joiningDate: "30,06,2024", salary: 14000},
    ]

  return (
    <div className='px-8 md:px-16 lg:px-32 pt-10'>
      <h1 className='text-lg md:text-2xl'>Employees List</h1>
      <div className='mt-5'>
        {EmployeeList.map((item) => (
            <div key={item.id} className='flex gap-4'>
                <div className='flex flex-col w-20'>
                    <h1>{item.name}</h1>
                </div>
                <div className='flex flex-col w-20'>
                    <h1>{item.joiningDate}</h1>
                </div>
                <div className='flex flex-col w-20'>
                    <h1>{item.salary}</h1>
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Hero
