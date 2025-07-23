import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import { ScrollTrigger } from 'gsap/all'
import AnimatedTitle from './AnimatedTitle'

gsap.registerPlugin(ScrollTrigger)

const About = () => {

    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: '#clip',
                start: 'top 5%',
                end: '+=800 center',
                scrub: 0.5,
                pin: true,
                pinSpacing:true,
            }
        })

        clipAnimation.to('.mask-clip-path', {
            width: '100dvw',
            height: '90dvh',
            borderRadius: '0',
        })
        gsap.to('#root', {
            backgroundColor: 'black',
            scrollTrigger: {
                trigger: '#about',
                start: '8% top',
                end: 'bottom bottom',
                scrub: 0.5,
            }
        })
    },[])
  return (
      <div id="about" className='w-screen min-h-screen'>
          <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
              <h2 className='font-general text-sm uppercase md:text-[10px]'>Welcome To Zentry</h2>

              <AnimatedTitle title={"Disc<b>o</b>ver The World's<br /> L<b>a</b>rgest Shared Adventure"} containerClass="mt-5 !text-black text-center"/>


              
              <div className="about-subtext">
                  <p>The Game Of Games Begins-Your Life, Now An Epic MMORPG</p>
                  <p>Zentry Unites Every Player From Countless Games And Platforms</p>
              </div>
          </div>

          <div className="h-dvh w-screen " id='clip'>
              <div className="mask-clip-path about-image">
                  <img src="/img/about.webp" alt="background" className='absolute left-0 top-0 size-full object-cover' />
              </div>
          </div>
    </div>
  )
}

export default About