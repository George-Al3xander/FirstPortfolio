import { useEffect, useState } from 'react'
import DisplayProjects from './DisplayProjects'
import { getDocs } from 'firebase/firestore';
import { projectsCollectionRef, storage, skillsCollectionRef } from './firebase-config';
import { getDownloadURL } from 'firebase/storage';
import {ref, listAll} from "firebase/storage"
import DisplaySkills from './DisplaySkills';
function App() {

  const [projects, setProjects] = useState([]); 
  const [skills, setSkills] = useState([]) 
  const imageListRef = ref(storage, "images/")
  const getProjects = async () => {
    const data = await getDocs(projectsCollectionRef);
    let tempArray = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          for(let doc of tempArray) {
            if(item.name.split(".")[0] == doc.id) {
              let item = {...doc, img: url};
              setProjects((prev) => [...prev, item]);
            }
          }     
        })
      })
    })
  }
  const getSkills = async () => {
    const data = await getDocs(skillsCollectionRef);
    let tempArray = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
    tempArray = tempArray.sort(({order:a}, {order:b}) => b-a).reverse();
    setSkills(tempArray)
  }
  useEffect(() => {
    getProjects(); 
    getSkills();
          
  },[]);
  return (
    <>
      <div className='container'>
        <h1>My skills</h1>
        {projects.length > 0 ? <DisplaySkills skills={skills} /> : null}     
      </div>
      <div className='container'>
        <h1>My work</h1>
        {projects.length > 0 ? <DisplayProjects projects={projects} />  : null}   
               
      </div>
      
    </>
  )
}

export default App
