import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Heart, Maximize, Info, Volume2 } from 'lucide-react';
import './styles.css';

const Short_Videos = () => {
  // Enhanced video collection with titles and categories
  const videos = [
    // Original videos
    {
      id: 1,
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      title: "Big Buck Bunny",
      category: "Animation"
    },
    {
      id: 2, 
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      title: "Sintel Trailer",
      category: "Animation"
    },
    {
      id: 3,
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      title: "Sample Video",
      category: "Demo"
    },
    {
      id: 4,
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      title: "Flower Bloom",
      category: "Nature"
    },
    {
      id: 5,
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      title: "Tears of Steel",
      category: "Sci-Fi"
    },
    {
      id: 6,
      url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      title: "Sample Clip",
      category: "Nature"
    },
    
    // Additional videos
    {
      id: 7,
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      title: "Elephants Dream",
      category: "Animation"
    },
    {
      id: 8,
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      title: "For Bigger Blazes",
      category: "Demo"
    },
    {
      id: 9,
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      title: "For Bigger Escapes",
      category: "Action"
    },
    {
      id: 10,
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      title: "For Bigger Fun",
      category: "Entertainment"
    },
    {
      id: 11,
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      title: "For Bigger Joyrides",
      category: "Automotive"
    },
    {
      id: 12,
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      title: "For Bigger Meltdowns",
      category: "Comedy"
    },
    {
      id: 13,
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
      title: "Subaru Outback On Street And Dirt",
      category: "Automotive"
    },
    {
      id: 14,
      url: "https://media.w3.org/2010/05/sintel/trailer.mp4",
      title: "Sintel Trailer (W3C)",
      category: "Animation"
    },
    {
      id: 15,
      url: "https://media.w3.org/2010/05/bunny/trailer.mp4",
      title: "Bunny Trailer",
      category: "Animation"
    },
    {
      id: 16,
      url: "https://vjs.zencdn.net/v/oceans.mp4",
      title: "Oceans",
      category: "Nature"
    },
    {
      id: 17,
      url: "https://cdn.videvo.net/videvo_files/video/free/2014-08/small_watermarked/Earth_Zoom_In_preview.mp4",
      title: "Earth Zoom In",
      category: "Science"
    },
    {
      id: 18,
      url: "https://cdn.videvo.net/videvo_files/video/free/2013-08/small_watermarked/hd0992_preview.mp4",
      title: "Sunset Timelapse",
      category: "Nature"
    },
    {
      id: 19,
      url: "https://cdn.videvo.net/videvo_files/video/free/2015-09/small_watermarked/fireworks_display_preview.mp4",
      title: "Fireworks Display",
      category: "Entertainment"
    },
    {
      id: 20,
      url: "https://cdn.videvo.net/videvo_files/video/free/2019-11/small_watermarked/190301_1_25_11_preview.mp4",
      title: "City Traffic",
      category: "Urban"
    },
    {
      id: 21,
      url: "https://cdn.videvo.net/videvo_files/video/free/2019-01/small_watermarked/181015_12_003_preview.mp4",
      title: "Abstract Liquid",
      category: "Abstract"
    },
    {
      id: 22,
      url: "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4",
      title: "Ocean Waves",
      category: "Nature"
    },
    {
      id: 23,
      url: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4",
      title: "Forest Stream",
      category: "Nature"
    },
    {
      id: 24,
      url: "https://assets.mixkit.co/videos/preview/mixkit-spinning-around-the-earth-29351-large.mp4",
      title: "Earth from Space",
      category: "Science"
    },
    {
      id: 25,
      url: "https://assets.mixkit.co/videos/preview/mixkit-clouds-and-blue-sky-2408-large.mp4",
      title: "Blue Sky",
      category: "Nature"
    },
    {
      id: 26,
      url: "https://assets.mixkit.co/videos/preview/mixkit-road-seen-from-the-window-of-a-moving-vehicle-13051-large.mp4",
      title: "Road Trip",
      category: "Travel"
    },
    {
      id: 27,
      url: "https://assets.mixkit.co/videos/preview/mixkit-a-girl-blowing-a-bubble-gum-balloon-2604-large.mp4",
      title: "Bubble Gum",
      category: "People"
    },
    {
      id: 28,
      url: "https://assets.mixkit.co/videos/preview/mixkit-rain-falling-on-a-street-4256-large.mp4",
      title: "Rainy Street",
      category: "Weather"
    },
    {
      id: 29,
      url: "https://assets.mixkit.co/videos/preview/mixkit-going-down-a-curved-highway-through-a-mountain-range-41576-large.mp4",
      title: "Mountain Highway",
      category: "Travel"
    },
    {
      id: 30,
      url: "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
      title: "We Are Going On Bullrun",
      category: "Automotive"
    },
    {
      id: 31,
      url: "https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
      title: "What Car Can You Get For A Grand",
      category: "Automotive"
    },
    {
      id: 32,
      url: "https://download.samplelib.com/mp4/sample-5s.mp4",
      title: "Color Bars",
      category: "Technical"
    },
    {
      id: 33,
      url: "https://download.samplelib.com/mp4/sample-10s.mp4",
      title: "Test Pattern",
      category: "Technical"
    },
    {
      id: 34,
      url: "https://download.samplelib.com/mp4/sample-15s.mp4",
      title: "Countdown Timer",
      category: "Technical"
    },
    {
      id: 35,
      url: "https://ia600208.us.archive.org/2/items/ToS-Blender/ToS-OpenMovie-Blender.mp4",
      title: "Tears of Steel (Archive)",
      category: "Sci-Fi"
    },
    {
      id: 36,
      url: "https://ia800501.us.archive.org/34/items/sintel-movie/sintel-movie.mp4",
      title: "Sintel Full Movie",
      category: "Animation"
    },
    {
      id: 37,
      url: "https://ia801302.us.archive.org/1/items/ElephantsDream/ed_hd.mp4",
      title: "Elephants Dream Full",
      category: "Animation"
    },
    {
      id: 38,
      url: "https://ia800707.us.archive.org/24/items/BigBuckBunny_310/big_buck_bunny_640_360.mp4",
      title: "Big Buck Bunny 360p",
      category: "Animation"
    },
    {
      id: 39,
      url: "https://archive.org/download/Popeye_forPresident/Popeye_forPresident_512kb.mp4",
      title: "Popeye for President",
      category: "Classic"
    },
    {
      id: 40,
      url: "https://archive.org/download/CartoonClassics/Krazy_Kat_-_Keeping_Up_With_Krazy.mp4",
      title: "Krazy Kat - Keeping Up With Krazy",
      category: "Classic"
    },
    {
      id: 41,
      url: "https://archive.org/download/sita_sings_the_blues/sitasingstheblues_mid.mp4",
      title: "Sita Sings the Blues",
      category: "Animation"
    },
    {
      id: 42,
      url: "https://ia801609.us.archive.org/12/items/Rick_Astley_Never_Gonna_Give_You_Up/Rick_Astley_Never_Gonna_Give_You_Up.mp4",
      title: "Rick Astley - Never Gonna Give You Up",
      category: "Music"
    },
    {
      id: 43,
      url: "https://archive.org/download/Charlie_Chaplin_film_footage/TheRink.mp4",
      title: "Charlie Chaplin - The Rink",
      category: "Classic"
    },
    {
      id: 44,
      url: "https://ia800300.us.archive.org/17/items/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
      title: "Big Buck Bunny 720p Surround",
      category: "Animation"
    },
    {
      id: 45,
      url: "https://filesamples.com/samples/video/mp4/sample_1280x720.mp4",
      title: "Sample Video 720p",
      category: "Demo"
    },
    {
      id: 46,
      url: "https://filesamples.com/samples/video/mp4/sample_960x540.mp4",
      title: "Sample Video 540p",
      category: "Demo"
    },
    {
      id: 47,
      url: "https://filesamples.com/samples/video/mp4/sample_960x400.mp4",
      title: "Sample Video Widescreen",
      category: "Demo"
    },
    {
      id: 48,
      url: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      title: "Learning Container Sample",
      category: "Education"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [likedVideos, setLikedVideos] = useState([]);
  const [showInfo, setShowInfo] = useState(true);
  const [filter, setFilter] = useState("All");
  const [isMobile, setIsMobile] = useState(false);
  
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredVideos = filter === "All" 
    ? videos 
    : videos.filter(video => video.category === filter);

  const currentVideo = filteredVideos[currentIndex];
  
  // Handle video end
  const handleVideoEnd = () => {
    nextVideo();
  };

  // Navigation functions
  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredVideos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredVideos.length) % filteredVideos.length);
  };

  // Video control functions
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleLike = () => {
    if (likedVideos.includes(currentVideo.id)) {
      setLikedVideos(prev => prev.filter(id => id !== currentVideo.id));
    } else {
      setLikedVideos(prev => [...prev, currentVideo.id]);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextVideo();
      if (e.key === 'ArrowLeft') prevVideo();
      if (e.key === ' ') togglePlay();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isPlaying, filteredVideos.length]);

  // Reset current index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  // Update video reference when changing videos
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      if (isPlaying) {
        videoRef.current.play().catch(error => {
          console.error("Video playback error:", error);
          setIsPlaying(false);
        });
      }
    }
  }, [currentIndex, currentVideo]);

  // Available categories for filtering
  const categories = ["All", ...new Set(videos.map(video => video.category))];

  // Check if current video is liked
  const isLiked = likedVideos.includes(currentVideo?.id);

  return (
    <div className="container">
      <h1 className="title">Trending Shorts</h1>
      
      {/* Category filter */}
      {/* <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`category-btn ${filter === category ? 'active' : 'inactive'}`}
          >
            {category}
          </button>
        ))}
      </div> */}
      
      {/* Video container */}
      <div ref={containerRef} className="video-container">
        {currentVideo && (
          <>
            <video
              ref={videoRef}
              src={currentVideo.url}
              className="video-element"
              playsInline
              onClick={togglePlay}
              onEnded={handleVideoEnd}
            />
            
            {/* Play/Pause overlay */}
            {!isPlaying && (
              <div className="pause-overlay">
                <button onClick={togglePlay} className="play-btn">
                  <Play size={24} />
                </button>
              </div>
            )}
            
            {/* Video info overlay */}
            {showInfo && (
              <div className="info-overlay">
                <h2 className="video-title">{currentVideo.title}</h2>
                <p className="video-category">#{currentVideo.category}</p>
              </div>
            )}
            
            {/* Video controls */}
            <div className="controls-sidebar">
              <button onClick={toggleLike} className="control-btn">
                <Heart size={20} fill={isLiked ? "red" : "none"} color={isLiked ? "red" : "white"} />
              </button>
              
              <button onClick={toggleFullscreen} className="control-btn">
                <Maximize size={20} />
              </button>
              
              <button onClick={() => setShowInfo(!showInfo)} className="control-btn">
                <Info size={20} />
              </button>
            </div>
          </>
        )}
      </div>
      
      {/* Navigation and volume controls */}
      <div className="navigation-controls">
        <div className="nav-buttons">
          <button onClick={prevVideo} className="prev-btn">
            <ChevronLeft size={20} />
            {!isMobile && "Previous"}
          </button>
          
          <div className="volume-control">
            <Volume2 size={20} color="#4B5563" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </div>
          
          <button onClick={nextVideo} className="next-btn">
            {!isMobile && "Next"}
            <ChevronRight size={20} />
          </button>
        </div>
        
        {/* Video progress indicator */}
        <div className="progress-indicator">
          {filteredVideos.map((_, idx) => (
            <div 
              key={idx} 
              className={`progress-dot ${idx === currentIndex ? 'progress-active' : 'progress-inactive'}`}
            />
          ))}
        </div>
      </div>
      
      {/* Video thumbnails */}
      <div className="gallery-section">
        <h2 className="section-title">
          <span className="title-indicator"></span>
          More Videos
        </h2>
        <div className="video-grid">
          {videos.map((video) => (
            <div 
              key={video.id}
              onClick={() => {
                setFilter("All");
                setCurrentIndex(videos.findIndex(v => v.id === video.id));
              }}
              className={`video-card ${currentVideo?.id === video.id ? 'active' : ''}`}
            >
              <div className="thumbnail-container">
                <video 
                  src={video.url} 
                  className="thumbnail-video"
                  muted
                />
                <div className="thumbnail-overlay">
                  <div className="thumbnail-play-btn">
                    <Play size={24} color="white" />
                  </div>
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title">{video.title}</h3>
                <p className="card-category">
                  <span className={`category-dot dot-${video.category.toLowerCase()}`}></span>
                  {video.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Short_Videos;