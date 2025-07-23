import React, { useEffect, useRef } from 'react'
import Button from './Button'
import { TiLocationArrow } from 'react-icons/ti'
import { useWindowScroll } from 'react-use'
import gsap from 'gsap'


const navItems = ['Nexus', 'Valut', 'Prologue', 'About', 'Contact']

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = React.useState(false)
  const [isIndicatorActive, setIsIndicatorActive] = React.useState(false)
  const [lastScrollY, setLastScrollY] = React.useState(0)
  const [isNavVisible, setIsNavVisible] = React.useState(true)

  const navContainerRef = useRef(null)
  const audioElementRef = useRef(null)

  const { y: currentScrollY } = useWindowScroll()
  
  useEffect(() => { 
    if (currentScrollY === 0) {
      setIsNavVisible(true)
      navContainerRef.current.classList.remove('floating-nav')
    }
    else if (currentScrollY > lastScrollY) {
        setIsNavVisible(false)
        navContainerRef.current.classList.add('floating-nav')
    }
    else if (currentScrollY < lastScrollY) {
        setIsNavVisible(true)
        navContainerRef.current.classList.add('floating-nav')

    }
    setLastScrollY(currentScrollY)
    
  }, [currentScrollY])

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.25,

    })
   }, [isNavVisible])
  


  const toggleAudioIndicator = () => {
    setIsAudioPlaying(!isAudioPlaying)
    setIsIndicatorActive(!isIndicatorActive)

    
  }

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play()
    }
    else {
      audioElementRef.current.pause()
    }
  },[isAudioPlaying])


  return (
      <div ref={navContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
          
      <header className='absolute top-1/2 w-full -translate-y-1/2'>
        
        <nav className="flex size-full p-4 justify-between items-center">

          <div className="flex items-center gap-7">

            <a href="#">
            <img src="/img/logo.png" alt="logo" className='w-10' />
            </a>

            <Button id="product-button" title="Products" rightIcon={<TiLocationArrow />} containerClass="bg-blue-50 md:flex items-center justify-center gap-1 hidden"/>
            
          </div>

          <div className='flex h-full items-center'>

            <div className='hidden md:block'>
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className='nav-hover-btn'>{item}</a>
              ))}
            </div>

            <button onClick={toggleAudioIndicator} className='ml-10 flex items-center space-x-0.5 mt-1'>
              <audio ref={audioElementRef} className='hidden' src='/audio/loop.mp3' loop/>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((bar) => (
                  <div key={bar} className={`indicator-line  ${isIndicatorActive ? 'active' :''}`} style={{animationDelay: `${bar * 0.1}s`}}/>
                ))}
            </button>
          </div>

        </nav>

      </header>
    </div>
  )
}

export default Navbar