import InfiniteScroll from "react-infinite-scroll-component"
import useProjects from "../hooks/useProjects"
import Project from "./Project"
import SkeletonProjects from "./SkeletonProjects"



const DisplayProjects = () => {
    
  const  {projects, isLoading,hasNextPage, fetchNextPage} = useProjects()
      if(isLoading) {
        return <>
        <h1>My work</h1>
        <SkeletonProjects />
        </> 
      }
      
         
//<div style={{width: "100%", height: "10rem", display: "flex", justifyContent: "center", alignItems: "center"}}><BeatLoader color='var(--clr-primary)'></BeatLoader></div>
   
    
    return(
      <>
      <h1>My work</h1>
      <InfiniteScroll  style={{overflow: "initial"}} dataLength={projects.length} next={fetchNextPage} hasMore={hasNextPage} loader={<SkeletonProjects/>}>
        <ul className="projects">      
        {projects!.map((project) => {
            return <Project project={project}/>
        })}
        </ul>
      </InfiniteScroll>
      </>

    )
}

export default DisplayProjects