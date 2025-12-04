import React, { useRef } from 'react'
import { Tooltip } from 'react-tooltip';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { dockApps } from '#constants';

const Dock = () => {
  const docRef = useRef(null);

  useGSAP(() => {
    if (!docRef.current) return;

    const icons = docRef.current.querySelectorAll('.dock-icon');
    const animateIcons = (mouseX) => {
      const { left } = docRef.current.getBoundingClientRect();

      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);

        const intensity = Math.exp(-(distance ** 2.5) / 20000);

        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power1.out"
        })

      })
    };

    const handleMouseMove = (e) => {
      const { left } = docRef.current.getBoundingClientRect();
      const mouseX = e.clientX - left;
      animateIcons(mouseX);
    };

    const resetIcons = () => icons.forEach((icon) => {
      gsap.to(icon, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power1.out"
      })
    });

    docRef.current.addEventListener('mousemove', handleMouseMove);
    docRef.current.addEventListener('mouseleave', resetIcons);

    return () => {
      docRef.current.removeEventListener('mousemove', handleMouseMove);
      docRef.current.removeEventListener('mouseleave', resetIcons);
    };
  }, []);


  const toggleApp = (app) => {

  }

  return (
    <section id="dock">
      <div ref={docRef} className="dock-container">
        {dockApps.map(({ id, icon, name, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={() => toggleApp({ id, canOpen })}
            >

              <img
                src={`/images/${icon}`}
                alt={name}
                className={canOpen ? '' : 'opacity-60'}
                loading="lazy"
              />
            </button>
          </div>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  )
}

export default Dock