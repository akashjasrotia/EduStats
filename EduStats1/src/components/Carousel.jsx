import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import c1 from '../assets/Carousel1.png';
import c2 from '../assets/Carousel2.png';
import c3 from '../assets/Carousel3.png';
import c4 from '../assets/Carousel4.png';
import c5 from '../assets/Carousel5.png';
import c6 from '../assets/Carousel6.png';
const slides = [
  {
    url: c6,
    alt: 'Slide 1'
  },
  {
    url: c3,
    alt: 'Slide 2'
  },
  {
    url: c2,
    alt: 'Slide 3'
  },
  {
    url: c4,
    alt: 'Slide 4'
  },
];


export default function App() {
  const [current, setCurrent] = useState(0);
  

  const autoSlideInterval = 3000;

  const prev = () =>
    setCurrent((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

  const next = () =>
    setCurrent((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  const goToSlide = (index) => {
    setCurrent(index);
  };


  useEffect(() => {
    const slideInterval = setInterval(next, autoSlideInterval);

    return () => clearInterval(slideInterval); 
  }, [current]);

  return (

        <div className="overflow-hidden relative rounded-2xl shadow-2xl">

          <div
            className="flex transition-transform ease-out duration-500"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <img
                key={index}
                src={slide.url}
                alt={slide.alt}
                className="w-full object-cover shrink-0 aspect-square" 
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button
              onClick={prev}
              className="p-2 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white transition"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={next}
              className="p-2 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white transition"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Bottom Navigation Dots */}
          <div className="absolute bottom-4 right-0 left-0">
            <div className="flex items-center justify-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`
                    transition-all w-3 h-3 bg-white rounded-full
                    ${current === i ? "p-2" : "bg-opacity-50"}
                  `}
                />
              ))}
            </div>
          </div>
        </div>
  );
}