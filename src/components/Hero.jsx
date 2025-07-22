
import React, { useEffect, useState } from 'react';
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);



const Hero = () => {

  // State
  // currentIndex: current video index
  // hasClicked: whether the mini video has been clicked
  // isLoading: whether videos are loading
  // loadedVideos: number of loaded videos
  const [currentIndex, setCurrentIndex] = useState(1);
  //const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const totalVideos = 4; // total number of videos
  //const nextVideoRef = React.useRef(null); // ref for controlling the next video


  // Helpers
  // getVideoSrc: builds the video path based on the index
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;
  // upcomingVideoIndex: calculates the next video index
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;


  // Handlers
  // handleVideoLoad: increments the counter each time a video is loaded
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  // handleMiniVideoClick: activates the next video when the mini video is clicked
  const handleMiniVideoClick = () => {
    //setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };


  // Effects
  // When all videos are loaded, set isLoading to false
  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  // With GSAP, play the grow animation on video when clicked
  useGSAP(() => {
    //if (hasClicked) {
      gsap.set('#next-video', { visibility: 'visible' });
      gsap.to('#next-video', {
        transformOrigin: 'center center',
        scale: 1,
        width: '100%',
        height: '100%',
        duration: 1.5,
        ease: 'power.inOut',
        // onStart: () => {
        //   nextVideoRef.current.play();
        // },
      });
      gsap.from('#current-video', {
        transformOrigin: 'center center',
        scale: 0,
        duration: 1.5,
          ease: 'power1.inOut',

      });
    }
  //}
      , { dependencies: [currentIndex], revertOnUpdate: true });

  // Animate clip-path and border radius on scroll with GSAP
  useGSAP(() => {
    gsap.set('#video-frame', {
      clipPath: 'polygon(14% 0, 72% 0, 88% 90%, 0 95%)',
      borderRadius: '0 0 40% 40%',
    });
    gsap.from('#video-frame', {
      clipPath: 'polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)',
      borderRadius: '0 0 0 0',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#video-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      },
    });
  }, []);

  // Render
  // If isLoading is true, show a loader
  // Three videos are displayed in different states (current, next, background)
  // Titles, descriptions, and a "Watch Trailer" button with icon
  // All elements are styled with Tailwind CSS classes
  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
        <div>
            <div className="mask-clip-path absolute-center z-50 size-64 cursor-pointer rounded-lg overflow-hidden">
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in-out hover:scale-100 hover:opacity-100"
            >
              <video
                //ref={nextVideoRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>
          <video
            src={getVideoSrc(currentIndex)}
            loop
            muted
            autoPlay
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
            //ref={nextVideoRef}
          />
          <video
            src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
            className="absolute left-0 top-0 size-full object-cover object-center"
            autoPlay
            loop
            muted
            onLoadedData={handleVideoLoad}
          />
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              Redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter The Metagame Layer <br />Unleash The Play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
    </div>
  );
};

export default Hero;