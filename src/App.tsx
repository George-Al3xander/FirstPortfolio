import DisplaySkills from './DisplaySkills'
import Header from './Header'
import DisplayProjects from './project/DisplayProjects'
import Footer from './Footer'
import { getDocs } from "firebase/firestore"
import { linksCollectionRef, storage } from "./firebase-config"
import { useQuery } from '@tanstack/react-query'
import { description, links, linksDb } from './types/types'
import { RotateLoader } from 'react-spinners'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
function App() {
  
  const getProfilePics = async () => {
    const myselfPicsRef = ref(storage, "myself/")
    const myselfPics = await (await listAll(myselfPicsRef)).items.map(async (item) => {
      const url = await getDownloadURL(item);
      return {name: item.name.split(".")[0], url};  
    })
    return await Promise.all(myselfPics)    
  }

  const getLinks = async () => {
    await getProfilePics()
    const raw = await getDocs(linksCollectionRef)
    const links = raw.docs.map((doc) => ({...doc.data(), id: doc.id})) as linksDb     
    return links
  }

  const getAdditionalInfo = async () => {
    const picutres = await getProfilePics();
    const links = await getLinks()

    return {links, picutres}
  }

  const {data, isLoading, isError} = useQuery({queryFn: getAdditionalInfo, queryKey: ["additional"]}) 
  

  if(isLoading) {
    return <div style={{width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <RotateLoader color='var(--clr-primary)'/>
    </div>
  }
  
  if(isError) {
    return <div>Error</div>
  }

  const pic_header = data.picutres.find((pic) => pic.name == "pic_header")
  const pic_footer = data.picutres.find((pic) => pic.name == "pic_footer")
  
  const links = data?.links.find((obj) => Object.keys(obj).length == 4) as links
  const {description} = data?.links.find((obj) => Object.keys(obj).length == 2) as description
  return (
    <>
      <div className='container'>
          <Header pic={pic_header!.url} links={links} description={description}/>
          <DisplaySkills />
          <DisplayProjects />
      </div>
        <Footer pic={pic_footer!.url} links={links}/>
    </>

  )
}

export default App
