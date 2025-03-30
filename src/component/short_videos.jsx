import { useState } from "react";

const Short_Videos = () => {
  const videos = [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/movie.mp4",
    "https://www.w3schools.com/html/horse.mp4",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <video
        key={currentIndex}
        src={videos[currentIndex]}
        controls
        autoPlay
        className="w-full max-w-md rounded-lg shadow-lg"
        onEnded={nextVideo}
      ></video>
      <div className="flex gap-4">
        <button
          onClick={prevVideo}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg"
        >
          Previous
        </button>
        <button
          onClick={nextVideo}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Short_Videos;
