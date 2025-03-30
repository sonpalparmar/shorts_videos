import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Heart, Maximize, Info, Volume2 } from 'lucide-react';
import './styles.css';

const Short_Videos = () => {
  // Enhanced video collection with titles and categories
  const videos = [
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
      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`category-btn ${filter === category ? 'active' : 'inactive'}`}
          >
            {category}
          </button>
        ))}
      </div>
      
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