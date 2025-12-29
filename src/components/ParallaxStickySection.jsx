import { useRef } from "react";
import "./ParallaxStickySection.css";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function ParallaxStickySection({
	id,
	title,
	subtitle,
	src,
	alt,
	variant = "right",
	className = "",
	contentClassName = "",
	enterFrom = "up",
	children,
	bgClassName = "",
	noImage = false,
	baseUrl = "/",
	scrollTick = 0,
}) {
	const sectionRef = useRef(null);
	void scrollTick;

	const prefersReducedMotion =
		typeof window !== "undefined" &&
		window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

	const scrollY = typeof window !== "undefined" ? window.scrollY || 0 : 0;
	const vh = typeof window !== "undefined" ? window.innerHeight || 1 : 1;

	const startY = sectionRef.current?.offsetTop ?? 0;
	const progress = clamp((scrollY - (startY - vh)) / vh, 0, 1);

	const isCarsSection = id === "cars";

	const enterX = prefersReducedMotion
		? 0
		: enterFrom === "down-right"
		? (1 - progress) * 140
		: 0;
	const enterY = prefersReducedMotion
		? 0
		: enterFrom === "down-right"
		? (1 - progress) * 160
		: (1 - progress) * 140;
	const contentOpacity =
		prefersReducedMotion || isCarsSection ? 1 : clamp(progress * 1.15, 0, 1);
	const contentTransform =
		prefersReducedMotion || isCarsSection
			? "none"
			: `translate3d(${enterX}px, ${enterY}px, 0)`;

	let bgScale = 1.02;
	if (variant === "grow") bgScale = 1.08;
	const bgParallaxY = prefersReducedMotion
		? 0
		: clamp((0.5 - progress) * 80, -70, 70);
	const bgTransform = prefersReducedMotion
		? "none"
		: `translate3d(0, ${bgParallaxY}px, 0) scale(${bgScale})`;

	const imageSrc = src ? `${baseUrl}${String(src).replace(/^\//, "")}` : "";
	const resolvedClassName =
		`sticky top-0 h-screen w-full overflow-hidden ${className}`.trim();
	const resolvedContentClassName =
		`relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center ${contentClassName}`.trim();

	return (
		<section
			id={id}
			ref={sectionRef}
			className={resolvedClassName}
			style={{ scrollMarginTop: "84px" }}
		>
			{noImage ? (
				<div
					className={`parallax-bg-layer ${bgClassName}`.trim()}
					style={{ transform: bgTransform }}
					aria-hidden='true'
				/>
			) : (
				<img
					src={imageSrc}
					alt={alt}
					className='absolute inset-0 h-full w-full object-cover'
					style={{ transform: bgTransform }}
					loading='lazy'
				/>
			)}
			<div
				className={resolvedContentClassName}
				style={{ transform: contentTransform, opacity: contentOpacity }}
			>
				{title ? <h2 className='text-4xl font-bold'>{title}</h2> : null}
				{subtitle ? <p className='mt-2'>{subtitle}</p> : null}
				{children}
			</div>
		</section>
	);
}

export default ParallaxStickySection;
