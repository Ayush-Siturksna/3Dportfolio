import React from 'react'
import ME from '../../logo.svg'
import {FaAward} from  'react-icons/fa'
import {SlGraduation}from 'react-icons/sl'
import {AiOutlineFileDone} from  'react-icons/ai'
import './about.css'

const About = () => {
    return (
       <section id='about'>
           <h5>Get To Know</h5>
           <h2>About Me</h2>
           <div className="container about_container">
               <div className="about_me">
                 <div className="about_me-image">
                     <img src={ME} alt="About Image"/>
                 </div>

                 
                 <p>
                     I am from a small village Mahendragaon in Madhya Pradesh ,India.Coming from Agricultural Backgground ,I was always amazed 
                     by technology and excited to learn and discover innovative ideas/tech.
                     
                 </p>

               

               </div>


              
               <div className="about_content">
                 <div className="about_cards">

                 
                    <article className='about_card'>
                        <AiOutlineFileDone className='about_icon'/>
                        <h5>WORK</h5>
                        <h6>CAPGEMINI</h6>
                        <small>Devnetops & Networking Engineer</small>

                     </article>
                     
                     <article className='about_card'>
                         <SlGraduation className='about_icon'/>
                        <h5>BTECH</h5>
                        <h6>MNNIT ALLAHABAD</h6>
                        <small>
                         Mechanical Engineering   "CGPA:8/10"
                        </small>



                     </article>
                     <article className='about_card'>
                         <FaAward className='about_icon'/>
                        <h5>CLASS XII</h5>
                        <h6>JOINT MISSION HIGHER SECONDARY SCHOOL</h6>
                        <small>
                         
                         MP Board "88.4%"
                        </small>



                     </article>

                     <article className='about_card'>
                        <FaAward className='about_icon'/> 
                        <h5>CLASS X</h5>
                        <h6>MACRO VISION ACADEMY</h6>
                        <small>
                          CBSE "CGPA:10/10"
                        </small>



                     </article>

                 </div>
                


               </div>

           </div>
       </section>
    )
}

export default About
