import React from 'react'
import Banar from '../banar/Banar'
import SliderMan from '../slider/SliderMan'
import SliderWomen from '../slider/SliderWomen'
import SliderKid from '../slider/SliderKid'
import ExploreOur from '../Explore/ExploreOur'
import Social from '../Social/Social'
import ContactUs from '../Contact-us/ContactUs.JSX'


const Home = () => {
  return (
    <div>
        <Banar/>
        <SliderMan/>
        <SliderWomen/>
        <SliderKid/>
        <ExploreOur/>
        <Social/>
        {/* <ContactUs/> */}
    </div>
  )
}

export default Home