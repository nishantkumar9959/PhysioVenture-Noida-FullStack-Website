"use client";

import { useState, useEffect, useRef } from "react";


const PLAYLIST = [
  "/videos/hero-bg.mp4",
  "/videos/hero-bg-3.mp4",
];

export default function HeroVideo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeElement, setActiveElement] = useState<"A" | "B">("A");
  
  const [srcA, setSrcA] = useState(PLAYLIST[0]);
  const [srcB, setSrcB] = useState(PLAYLIST[1]);

  const videoRefA = useRef<HTMLVideoElement>(null);
  const videoRefB = useRef<HTMLVideoElement>(null);

  // Play the active video element whenever it changes
  useEffect(() => {
    if (activeElement === "A" && videoRefA.current) {
      videoRefA.current.play().catch((err) => {
        if (err.name !== "AbortError" && err.name !== "NotAllowedError") {
          console.warn("Video A play error:", err);
        }
      });
    } else if (activeElement === "B" && videoRefB.current) {
      videoRefB.current.play().catch((err) => {
        if (err.name !== "AbortError" && err.name !== "NotAllowedError") {
          console.warn("Video B play error:", err);
        }
      });
    }
  }, [activeElement]);

  const handleEnded = () => {
    const nextIndex = (currentIndex + 1) % PLAYLIST.length;
    const nextNextIndex = (nextIndex + 1) % PLAYLIST.length;

    if (activeElement === "A") {
      // Switch active to B (B already has nextIndex preloaded)
      setActiveElement("B");
      setCurrentIndex(nextIndex);
      
      // Pause A and schedule loading the nextNextIndex source to A after it fades out
      setTimeout(() => {
        if (videoRefA.current) {
          videoRefA.current.pause();
        }
        setSrcA(PLAYLIST[nextNextIndex]);
      }, 1200); // 1.2s timeout matches the 1000ms transition duration
    } else {
      // Switch active to A (A already has nextIndex preloaded)
      setActiveElement("A");
      setCurrentIndex(nextIndex);
      
      // Pause B and schedule loading the nextNextIndex source to B after it fades out
      setTimeout(() => {
        if (videoRefB.current) {
          videoRefB.current.pause();
        }
        setSrcB(PLAYLIST[nextNextIndex]);
      }, 1200);
    }
  };

  // Whenever source of inactive element is changed, we call load() to ensure it is preloaded
  useEffect(() => {
    if (activeElement === "A" && videoRefB.current) {
      videoRefB.current.load();
    }
  }, [srcB]);

  useEffect(() => {
    if (activeElement === "B" && videoRefA.current) {
      videoRefA.current.load();
    }
  }, [srcA]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <video
        ref={videoRefA}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleEnded}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          activeElement === "A" ? "opacity-80 lg:opacity-90 z-10" : "opacity-0 z-0"
        }`}
      >
        <source src={srcA} type="video/mp4" />
      </video>
      <video
        ref={videoRefB}
        muted
        playsInline
        preload="auto"
        onEnded={handleEnded}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          activeElement === "B" ? "opacity-80 lg:opacity-90 z-10" : "opacity-0 z-0"
        }`}
      >
        <source src={srcB} type="video/mp4" />
      </video>
    </div>
  );
}
