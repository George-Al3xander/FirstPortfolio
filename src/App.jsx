import { useEffect, useState } from 'react'
import DisplayProjects from './DisplayProjects'
import { getDocs } from 'firebase/firestore';
import { projectsCollectionRef, storage } from './firebase-config';
import { getDownloadURL } from 'firebase/storage';
import {ref, listAll} from "firebase/storage"

function App() {

  const [projects, setProjects] = useState([]);  
  const imageListRef = ref(storage, "images/")
  useEffect(() => {
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
    getProjects(); 
          
  },[]);
  return (
    <>
      <DisplayProjects projects={projects} />        
    </>
  )
}

export default App
