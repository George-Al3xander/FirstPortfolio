import { getDocs } from 'firebase/firestore';
import parse from "html-react-parser"
import {  skillsCollectionRef } from './firebase-config';
import { useQuery } from '@tanstack/react-query';
import { skill } from './types/types';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";



const DisplaySkills = () => {
  const responsive = {    
    desktop: {
      breakpoint: { max: 3000, min: 464 },
      items: 6
    },    
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    }
  };

    const getSkills = async ()  =>  {
        const data = await getDocs(skillsCollectionRef);
        let tempArray = data.docs.map((doc) => ({...doc.data(), id: doc.id})) as skill[]
        tempArray = tempArray.sort(({order:a}, {order:b}) => b-a).reverse();
        return tempArray 
      }

      const {data, isLoading} = useQuery({queryFn: getSkills, queryKey: ["skills"]})


      if(isLoading) {
        return <div>Loading</div>
      }

      

      return(
      <>
        <h1>My skills</h1>        
          <Carousel arrows={false} partialVisbile  className='skills' focusOnSelect autoPlay={true} autoPlaySpeed={3000} infinite responsive={responsive}>        
          {data!.map((item) => {
              return <li key={item.id}><h2>{parse(item.icon)}{item.name}</h2></li>
          })}
        </Carousel>
    </>
    )
}

export default DisplaySkills