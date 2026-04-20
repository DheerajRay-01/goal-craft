import CreateExperienceForm from '@/components/Experience/CreateExperienceForm'
import React from 'react'

const ExperienceEditPage = () => {

  const dummyExperience = {

    slug:"wdew-software-engineer-intern-1773657566291",
    companyName: "Google",

    role: "Software Engineer Intern",

    location: "Remote",

    employmentType: "Internship",

    experienceLevel: "Student",

    interviewDate: "12/12/12",

    rounds: [
      {
        title: "Online Assessment",
        description: "2 DSA questions on arrays and graphs",
      },
      {
        title: "Technical Interview",
        description: "React + DSA discussion",
      },
    ],

    skills: [{value:"DSA"}, {value:"React"}, {value:"Problem Solving"}],

     resources: [],
    overallExperience:
      "Interview was friendly. Focus was mainly on problem solving and frontend concepts.",

    questions: [{value:"Reverse a linked list"}, {value:"Explain React hooks"}],
  };


  return (
    <div>
        <CreateExperienceForm data={dummyExperience} edit/>
    </div>
  )
}

export default ExperienceEditPage