'use client'

import { useEffect, useState } from 'react'
import { Testimonial } from '@prisma/client'

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  // We duplicate the testimonials to create an infinite loop effect
  // If there are very few testimonials, we might need to duplicate them multiple times to fill the screen
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials]

  return (
    <div className="testimonial-marquee-wrapper">
      <div className="testimonial-marquee-track">
        {duplicatedTestimonials.map((t, idx) => (
          <div key={`${t.id}-${idx}`} className="testimonial-card">
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
        ))}
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

        .testimonial-marquee-track {
          display: flex;
          gap: 30px;
          width: max-content;
          /* Smooth, slow, infinite horizontal scroll */
          animation: scrollMarquee 60s linear infinite;
        }

        .testimonial-marquee-track:hover {
          animation-play-state: paused;
        }

        .testimonial-card {
          width: 320px;
          min-width: 320px;
          background: var(--bg-card);
          padding: 30px;
          border: 1px solid rgba(0, 0, 0, 0.05);
          text-align: center;
          border-radius: 12px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: center;
          /* Smaller, more compact look */
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
          /* Optional: limit lines if reviews are too long */
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .testimonial-author {
          font-family: var(--font-h1);
          font-size: 16px;
          color: var(--text-card);
          margin-top: auto; /* Push to bottom if heights vary */
        }

        @keyframes scrollMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            /* Scroll half the width since we duplicated it enough times */
            transform: translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          .testimonial-card {
            width: 280px;
            min-width: 280px;
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
