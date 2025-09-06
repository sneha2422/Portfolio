import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import "./HorizontalScrollText.css";

gsap.registerPlugin(Observer);

interface HorizontalScrollTextProps {
  texts: string[];
  speed?: number;
  paddingRight?: number;
  reverse?: boolean;
}

const HorizontalScrollText: React.FC<HorizontalScrollTextProps> = ({
  texts,
  speed = 1,
  paddingRight = 30,
  reverse = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = gsap.utils.toArray<HTMLElement>(".rail h4", containerRef.current);

    /*
    This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

    Features:
     - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
     - When each item animates to the left or right enough, it will loop back to the other side
     - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
     - The returned timeline will have the following methods added to it:
       - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
       - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.p
       - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
       - current() - returns the current index (if an animation is in-progress, it- reflects the final index)
       - times - an Array of the times on the timeline where each element hits the the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
     */
    function horizontalLoop(items: HTMLElement[], config: {
      repeat?: number;
      paused?: boolean;
      speed?: number;
      snap?: boolean | number;
      paddingRight?: number;
      reversed?: boolean;
    }) {
      items = gsap.utils.toArray(items);
      config = config || {};
      let tl = gsap.timeline({
          repeat: config.repeat,
          paused: config.paused,
          defaults: { ease: "none" },
          onReverseComplete: () => { tl.totalTime(tl.rawTime() + tl.duration() * 100); },
        }),
        length = items.length,
        startX = items[0].offsetLeft,
        times: number[] = [],
        widths: number[] = [],
        xPercents: number[] = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap: (value: number) => number;

      if (config.snap === false) {
        snap = (v: number) => v;
      } else if (typeof config.snap === 'number') {
        snap = gsap.utils.snap(config.snap);
      } else {
        snap = gsap.utils.snap(1); // Default for true or undefined
      }

      let totalWidth: number,
        curX: number,
        distanceToStart: number,
        distanceToLoop: number,
        item: HTMLElement,
        i: number;
      gsap.set(items, { 
        xPercent: (i, el) => {
          let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string));
          xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px") as string) / w * 100 + parseFloat(gsap.getProperty(el, "xPercent") as string));
          return xPercents[i];
        },
      });
      gsap.set(items, { x: 0 });
      totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * parseFloat(gsap.getProperty(items[length - 1], "scaleX") as string) + (config.paddingRight || 0);
      for (i = 0; i < length; i++) {
        item = items[i];
        curX = xPercents[i] / 100 * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop = distanceToStart + widths[i] * parseFloat(gsap.getProperty(item, "scaleX") as string);
        tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
          .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
          .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
      }
      function toIndex(index: number, vars?: gsap.TweenVars) {
        vars = vars || {};
        (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); 
        let newIndex = gsap.utils.wrap(0, length, index),
          time = times[newIndex];
        if (time > tl.time() !== index > curIndex) { 
          vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
          time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
      }
      tl.next = (vars?: gsap.TweenVars) => toIndex(curIndex + 1, vars);
      tl.previous = (vars?: gsap.TweenVars) => toIndex(curIndex - 1, vars);
      (tl as any).current = () => curIndex;
      (tl as any).toIndex = (index: number, vars?: gsap.TweenVars) => toIndex(index, vars);
      (tl as any).times = times;
      tl.progress(1, true).progress(0, true); 
      if (config.reversed) {
        (tl.vars as any).onReverseComplete();
        tl.reverse();
      }
      return tl;
    }

    const tl = horizontalLoop(items, {
      repeat: -1,
      paddingRight: paddingRight,
      speed: speed,
      reversed: reverse,
    });
    tlRef.current = tl;

    // Ensure reversed scroll starts from the beginning
    if (reverse) {
      tl.progress(0, true);
    }

    Observer.create({
      target: containerRef.current,
      type: "wheel,touch",
      onChangeY(self) {
        let factor = 2.5;
        if (self.deltaY < 0) {
          factor *= -1;
        }
        gsap.timeline({
          defaults: {
            ease: "none",
          },
        })
          .to(tl, { timeScale: factor * 2.5, duration: 0.2, overwrite: true })
          .to(tl, { timeScale: speed / 2.5, duration: 1 }, "+=0.3");
      },
    });

    return () => {
      tl.kill();
      Observer.getAll().forEach((obs) => obs.kill());
    };
  }, [texts, speed, paddingRight, reverse]);

  // Always render texts as-is, no repetition
  return (
    <div className="scrolling-text" ref={containerRef}>
      <div className="rail">
        {texts.map((text, index) => (
          <h4 key={index}>{text}</h4>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScrollText; 