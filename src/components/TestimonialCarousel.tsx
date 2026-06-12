'use client'

import React from 'react'
import { Testimonial } from '@prisma/client'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  // Embla Carousel hook with loop enabled and the AutoScroll plugin
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true },
    [
      AutoScroll({
        playOnInit: true,
        speed: 1,
        stopOnInteraction: false, // Keeps scrolling even after the user drags it!
        stopOnMouseEnter: true    // Pauses when hovering to read
      })
    ]
  )

  // Duplicate slightly to ensure enough items to fill the track without flickering,
  // though Embla handles looping very well, adding a few duplicates helps if there are only 1 or 2 reviews.
  const displayItems = testimonials.length < 5 
    ? [...testimonials, ...testimonials, ...testimonials, ...testimonials]
    : testimonials

  return (
    <div className="testimonial-marquee-wrapper">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {displayItems.map((t, idx) => (
            <div key={`${t.id}-${idx}`} className="embla__slide">
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

      <style jsx>{`
        .testimonial-marquee-wrapper {
          overflow: hidden;
          width: 100%;
          position: relative;
          padding: 20px 0;
          /* Subtle fade effect on the left and right edges */
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        .embla {
          overflow: hidden;
          cursor: grab;
        }

        .embla:active {
          cursor: grabbing;
        }

        .embla__container {
          display: flex;
          gap: 30px;
          margin-left: 15px; /* Offset for gap */
        }

        .embla__slide {
          flex: 0 0 auto;
          min-width: 0;
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
          user-select: none; /* Prevents text selection while dragging */
        }

        .testimonial-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
          border-color: rgba(219, 192, 126, 0.3); /* Subtle gold border on hover */
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
          -webkit-line-clamp: 4;
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
