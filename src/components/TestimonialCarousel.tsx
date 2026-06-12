'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Testimonial } from '@prisma/client'
import useEmblaCarousel from 'embla-carousel-react'

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  // Use Embla Carousel without auto-scroll
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: false, align: 'start' })
  
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="testimonial-carousel-container">
      {/* Left Navigation Button */}
      <button 
        className="carousel-btn prev-btn" 
        onClick={scrollPrev} 
        disabled={!prevBtnEnabled}
        aria-label="Previous slide"
      >
        <i className="fas fa-chevron-left"></i>
      </button>

      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {testimonials.map((t) => (
            <div key={t.id} className="embla__slide">
              <div className="testimonial-card">
                <div className="testimonial-stars">
                  {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
                </div>
                <p className="testimonial-text">
                  <span className="en-text">&quot;{t.content_en}&quot;</span>
                  <span className="ar-text">&quot;{t.content_ar}&quot;</span>
                </p>
                <h4 className="testimonial-author">
                  <span className="en-text">- {t.client_name_en}</span>
                  <span className="ar-text">- {t.client_name_ar}</span>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Navigation Button */}
      <button 
        className="carousel-btn next-btn" 
        onClick={scrollNext} 
        disabled={!nextBtnEnabled}
        aria-label="Next slide"
      >
        <i className="fas fa-chevron-right"></i>
      </button>

      <style jsx>{`
        .testimonial-carousel-container {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 50px; /* Space for buttons */
        }

        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid rgba(219, 192, 126, 0.4);
          color: var(--primary-gold);
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        .carousel-btn:hover:not(:disabled) {
          background: var(--primary-gold);
          color: #fff;
        }

        .carousel-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .prev-btn {
          left: 0;
        }

        .next-btn {
          right: 0;
        }

        .embla {
          overflow: hidden;
          width: 100%;
          touch-action: pan-y pinch-zoom;
        }

        .embla__container {
          display: flex;
          margin-left: -30px;
        }

        .embla__slide {
          flex: 0 0 auto;
          min-width: 0;
          padding-left: 30px;
        }

        .testimonial-card {
          width: 320px;
          height: 100%;
          background: var(--bg-card);
          padding: 30px;
          border: 1px solid rgba(0, 0, 0, 0.05);
          text-align: center;
          border-radius: 12px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: center;
          user-select: none;
        }

        .testimonial-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
          border-color: rgba(219, 192, 126, 0.3);
        }

        .testimonial-stars {
          color: var(--primary-gold);
          font-size: 20px;
          margin-bottom: 15px;
          letter-spacing: 2px;
        }

        .testimonial-text {
          font-size: 15px;
          color: var(--text-card);
          opacity: 0.85;
          font-style: italic;
          margin-bottom: 20px;
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .testimonial-author {
          font-family: var(--font-h1);
          font-size: 16px;
          color: var(--text-card);
          margin-top: auto;
        }

        @media (max-width: 768px) {
          .testimonial-carousel-container {
            padding: 20px 40px; /* Less padding on mobile */
          }
          
          .carousel-btn {
            width: 35px;
            height: 35px;
            font-size: 14px;
          }

          .prev-btn { left: 0px; }
          .next-btn { right: 0px; }

          .testimonial-card {
            width: 280px;
            padding: 20px;
          }
          .testimonial-text {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  )
}
