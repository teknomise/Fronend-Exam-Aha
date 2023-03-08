import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
// import { Draggable } from "gsap/Draggable";

interface ElementOffset {
    top: number;
    left: number;
    box: DOMRect;
}

const ProgressSlider = () => {
    const progressRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<SVGSVGElement>(null);
    const sliderGroupRef = useRef<SVGGElement>(null);
    const sliderInnerRef = useRef<SVGRectElement>(null);
    const trackGroupRef = useRef<SVGGElement>(null);
    const trackInnerRef = useRef<SVGRectElement>(null);
    const trackFillRef = useRef<SVGRectElement>(null);
    const handleGroupRef = useRef<SVGGElement>(null);
    const handleInnerRef = useRef<SVGCircleElement>(null);

    const [progress, setProgress] = useState<number>(0);

    const speed = 1500;
    const radius = 10;
    const height = 4;
    const width = 500;
    const inner = width - radius * 2;

    function getOffset(element: HTMLElement | SVGGElement): ElementOffset {
        const box = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const clientTop = document.documentElement.clientTop;
        const clientLeft = document.documentElement.clientLeft;
        const top = box.top + scrollTop - clientTop;
        const left = box.left + scrollLeft - clientLeft;
        return { top, left, box };
      }
      

    useEffect(() => {
        const sliderGroup = sliderGroupRef.current!;
        const handleGroup = handleGroupRef.current!;
        const trackFill = trackFillRef.current!;
        const offset = getOffset(trackGroupRef.current!);
        const bounds = offset.box;

        const dragger = new Draggable(handleGroup, {
            type: "x",
            cursor: "default",
            bounds: { minX: 0, maxX: width - radius * 2 },
            trigger: sliderGroup,
            onPress: onPress,
            onDrag: updateSlider,
            onThrowUpdate: updateSlider,
            throwProps: true,
            overshootTolerance: 0
        });

        function onPress() {
            const x = dragger.pointerX - offset.left;
            const tx = handleInnerRef.current!.transform.baseVal[0].matrix.e;
            const dx = tx - x + dragger.x + radius;
            const dt = Math.abs(dx) / speed;

            gsap.set(handleGroup, { x });
            gsap.to(trackFill, dt, { scaleX: x / bounds.width });
            gsap.fromTo(handleInnerRef.current!, dt, { x: dx }, { x: 0 });

            dragger.update();
            updateSlider(null, true);
        }

        function updateSlider(event: any, animating: boolean) {
            let prog = handleGroup.transform.baseVal[0].matrix.e / bounds.width;

            prog = prog < 0 ? 0 : prog > 1 ? 1 : prog;
            setProgress(Math.round(prog * 100));

            if (!animating) TweenLite.set(trackFill, { scaleX: prog });
        }

        function resize() {
            const newOffset = getOffset(trackGroupRef.current!);
            const newBounds = newOffset.box;
            offset.top = newOffset.top;
            offset.left = newOffset.left;
            bounds.width = newBounds.width;
        }

        window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", resize);
            dragger.kill();
        };
    }, []);

    return (
        <div>
          <div ref={progressRef}>Progress: {progress}%</div>
          <svg ref={stageRef} width={540} height={100}>
            <g ref={sliderGroupRef} transform={`translate(20, 40)`}>
              <rect ref={sliderInnerRef} width={width} height={radius * 2} />
              <g ref={trackGroupRef} transform={`translate(${radius}, ${radius - height / 2})`}>
                <rect ref={trackInnerRef} x={0} y={0} width={inner} height={height} />
                <rect ref={trackFillRef} x={0} y={0} width={inner} height={height} fill="#1f8fff" />
              </g>
              <g ref={handleGroupRef} transform={`translate(${radius}, ${radius})`}>
                <circle ref={handleInnerRef} r={radius} fill="#fff" />
              </g>
            </g>
          </svg>
        </div>
      );      
    };

export default ProgressSlider;
