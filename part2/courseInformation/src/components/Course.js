import React from 'react'

const Header = ({name}) => {
  return (
    <h2>{name}</h2>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part) => {
        return (
          <p>
            {part.name} {part.exercises}
          </p>
        )
      })}
    </div>
  )
}

const Footer = ({parts}) => {

  const total = parts.reduce((sum, point) => sum + point.exercises, 0);

  return (
    <b>Number of exercises {total}</b>
  )
}

const Course = ({courses}) => {
  return (
    <>
      {courses.map((course) => {
        return (
          <div>
            <Header key={course.id} name={course.name}/>
            <Content key={course.id} parts={course.parts}/>
            <Footer key={course.id} parts={course.parts}/>
          </div>
        )
      })}
    </>
  )
}

export default Course;
