import { useState } from 'react'
import DisplayProjects from './DisplayProjects'


function App() {

  const [projects, setProjects] = useState([1,2,3,4,5,6,7]);

  return (
    <>
      <DisplayProjects projects={projects}/>
        
    </>
  )
}

export default App
