import React, { useState, useRef } from 'react';

const Short_Videos = () => {
  // Simple video collection with reliable sources
  const videos = [
    {
      id: 1,
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      title: "Big Buck Bunny"
    },
    {
      id: 2, 
      url: "https://www.w3schools.com/html/movie.mp4",
      title: "Bear Video"
    },
    {
      id: 3,
      url: "https://www.w3schools.com/html/horse.mp4",
      title: "Horse Running"
    },
    {
      id: 4,
      url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      title: "Elephants Dream"
    },
    {
      id: 5,
      url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      title: "For Bigger Blazes"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);
  
  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleVideoEnd = () => {
    nextVideo();
  };

  return (
    <div style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{
        textAlign: "center",
        marginBottom: "20px",
        color: "#333"
      }}>
        Short Videos
      </h1>
      
      {/* Video Player */}
      <div style={{
        width: "100%",
        marginBottom: "20px",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <video
          ref={videoRef}
          src={videos[currentIndex].url}
          controls
          autoPlay
          style={{
            width: "100%",
            display: "block"
          }}
          onEnded={handleVideoEnd}
        ></video>
      </div>
      
      {/* Video Title */}
      <h2 style={{
        textAlign: "center",
        marginBottom: "20px",
        color: "#333"
      }}>
        {videos[currentIndex].title}
      </h2>
      
      {/* Navigation Buttons */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "30px"
      }}>
        <button
          onClick={prevVideo}
          style={{
            padding: "10px 20px",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Previous
        </button>
        <button
          onClick={nextVideo}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4169e1",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Next
        </button>
      </div>
      
      {/* Video Thumbnails */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "15px",
        marginTop: "20px"
      }}>
        {videos.map((video, index) => (
          <div 
            key={video.id}
            onClick={() => setCurrentIndex(index)}
            style={{
              cursor: "pointer",
              border: currentIndex === index ? "2px solid #4169e1" : "1px solid #ddd",
              borderRadius: "4px",
              overflow: "hidden"
            }}
          >
            <video 
              src={video.url} 
              style={{ 
                width: "100%", 
                height: "100px", 
                objectFit: "cover" 
              }}
            />
            <div style={{ 
              padding: "8px", 
              backgroundColor: "#f5f5f5", 
              fontSize: "14px",
              textAlign: "center",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}>
              {video.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Short_Videos;