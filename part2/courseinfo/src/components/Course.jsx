const Header = ({ courseName }) => <h2>{courseName}</h2>

const Total = ({ sum }) => <p className="bold-text">total of {sum} exercises</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </>
  )
}

const Course = ({ course }) =>  
  <>
    <Header courseName={course.name} />
    <Content parts={course.parts} />
    <Total sum={course.parts.reduce((s, part) => s + part.exercises, 0)} />
  </>

export default Course