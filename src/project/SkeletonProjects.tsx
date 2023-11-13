
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const SkeletonProjects = () => {
    const arr = [1,2,3,4,5,6]

    return(
        <ul className='projects'>
        {arr.map(() => {

            return <li className='project'>
                <Skeleton height={"10rem"}></Skeleton>
                <div className="project-content">                    
                    <Skeleton style={{marginBottom: "1rem", marginLeft:"1rem"}} height={"1rem"} width={"40%"}></Skeleton>                    
                    <Skeleton count={4}></Skeleton>
                </div>
            </li>
        })}
        </ul>)
}

export default SkeletonProjects