'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FilePlus, ArrowDown } from 'lucide-react';

export default function BurritoAnimation() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on how far we've scrolled past the top of the container
      // height - windowHeight is the maximum scrollable distance within the container
      let progress = -top / (height - windowHeight);
      
      // Clamp between 0 and 1
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Map progress to fold angles
  // Fold 1: Left foil folds over (0% to 33%)
  const fold1Progress = Math.min(1, Math.max(0, scrollProgress * 3));
  // Fold 2: Right foil folds over (33% to 66%)
  const fold2Progress = Math.min(1, Math.max(0, (scrollProgress - 0.33) * 3));
  // Fold 3: Bottom foil folds up (66% to 100%)
  const fold3Progress = Math.min(1, Math.max(0, (scrollProgress - 0.66) * 3));

  return (
    <div ref={containerRef} className="burrito-scroll-container">
      <div className="burrito-sticky-container">
        
        <div className="landing-content" style={{ opacity: 1 - scrollProgress * 2, transform: `translateY(${-scrollProgress * 50}px)` }}>
          <div className="landing-icon-wrapper">
            <div className="landing-icon-pulse"></div>
            <FilePlus size={48} className="landing-main-icon" />
          </div>
          <h1 className="landing-title">
            Welcome to <span className="brand-highlight">California Burrito</span>
          </h1>
          <p className="landing-subtitle">
            Scroll down to wrap up your shift and report an incident.
          </p>
          <div className="scroll-indicator">
            <ArrowDown size={24} className="bounce" />
          </div>
        </div>

        <div className="burrito-assembly">
          {/* Base Foil */}
          <div className="foil-base">
            {/* Ingredients */}
            <div className="ingredients-layer">
              <div className="ingredient meat"></div>
              <div className="ingredient rice"></div>
              <div className="ingredient guac"></div>
              <div className="ingredient cheese"></div>
              <div className="ingredient salsa"></div>
            </div>

            {/* Left Fold */}
            <div 
              className="foil-fold fold-left" 
              style={{ transform: `rotateY(${fold1Progress * 180}deg)` }}
            ></div>
            
            {/* Right Fold */}
            <div 
              className="foil-fold fold-right" 
              style={{ transform: `rotateY(${-fold2Progress * 180}deg)` }}
            ></div>
            
            {/* Bottom Fold */}
            <div 
              className="foil-fold fold-bottom" 
              style={{ transform: `rotateX(${fold3Progress * 180}deg)` }}
            ></div>
          </div>
        </div>

        {/* Final Button that appears when wrapped */}
        <div 
          className="final-action-container" 
          style={{ 
            opacity: fold3Progress > 0.8 ? (fold3Progress - 0.8) * 5 : 0,
            transform: `translateY(${fold3Progress > 0.8 ? 0 : 20}px)`,
            pointerEvents: fold3Progress > 0.9 ? 'auto' : 'none'
          }}
        >
          <h2>All Wrapped Up!</h2>
          <Link href="/report" className="landing-btn">
            <FilePlus size={22} />
            <span>Report an Incident</span>
            <div className="btn-glow"></div>
          </Link>
          <div className="landing-footer">
            <p>Store Managers: Please use the Manager Login at the top right.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
