import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
	const [loadingProgress, setLoadingProgress] = useState(0);
	const [logoDocked, setLogoDocked] = useState(false);
	const [headerVisible, setHeaderVisible] = useState(false);
	const [heroSlideIndex, setHeroSlideIndex] = useState(0);
	const [language, setLanguage] = useState("ka");
	const [scrollTick, setScrollTick] = useState(0);
	const baseUrl = import.meta.env.BASE_URL || "/";

	const I18N = {
		ka: {
			home: "მთავარი",
			help: "დახმარება",
			about: "ჩვენს შესახებ",
			services: "სერვისები",
			contact: "კონტაქტი",
		},
		en: {
			home: "Home",
			help: "Help",
			about: "About",
			services: "Services",
			contact: "Contact",
		},
		ru: {
			home: "Главная",
			help: "Помощь",
			about: "О нас",
			services: "Сервисы",
			contact: "Контакты",
		},
	};

	const t = I18N[language] ?? I18N.ka;

	useEffect(() => {
		let rafId;
		const durationMs = 3000;
		const startMs = performance.now();

		const tick = (nowMs) => {
			const elapsedMs = nowMs - startMs;
			const t = Math.min(elapsedMs / durationMs, 1);
			setLoadingProgress(t * 100);
			if (t < 1) rafId = requestAnimationFrame(tick);
		};

		rafId = requestAnimationFrame(tick);

		return () => {
			if (rafId) cancelAnimationFrame(rafId);
		};
	}, []);

	useEffect(() => {
		if (logoDocked) return;
		if (loadingProgress < 100) return;

		setLogoDocked(true);
		requestAnimationFrame(() => setHeaderVisible(true));
	}, [loadingProgress, logoDocked]);

	useEffect(() => {
		const prevOverflow = document.body.style.overflow;
		if (loadingProgress < 100) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = prevOverflow;
		}
		return () => {
			document.body.style.overflow = prevOverflow;
		};
	}, [loadingProgress]);

	useEffect(() => {
		let rafId = 0;
		const onScrollOrResize = () => {
			if (rafId) return;
			rafId = requestAnimationFrame(() => {
				rafId = 0;
				setScrollTick((t) => t + 1);
			});
		};

		window.addEventListener("scroll", onScrollOrResize, { passive: true });
		window.addEventListener("resize", onScrollOrResize);
		onScrollOrResize();

		return () => {
			window.removeEventListener("scroll", onScrollOrResize);
			window.removeEventListener("resize", onScrollOrResize);
			if (rafId) cancelAnimationFrame(rafId);
		};
	}, []);

	const safeProgress = Number.isFinite(loadingProgress)
		? Math.min(100, Math.max(0, loadingProgress))
		: 0;
	const revealWidth = (1536 * safeProgress) / 100;
	const introDone = safeProgress >= 100;

	const heroSlides = [
		{ src: "pipeline.png", alt: "Pipeline" },
		{ src: "manheim.png", alt: "Manheim" },
		{ src: "copart.png", alt: "Copart" },
	];

	useEffect(() => {
		if (!introDone) return;
		if (heroSlides.length <= 1) return;
		const intervalId = window.setInterval(() => {
			setHeroSlideIndex((i) => (i + 1) % heroSlides.length);
		}, 4500);
		return () => window.clearInterval(intervalId);
	}, [introDone, heroSlides.length]);

	const LogoPaths = () => (
		<>
			<path d='M8434 7709 c-618 -24 -1236 -137 -1794 -328 -407 -139 -736 -290 -1126 -517 -341 -198 -352 -204 -469 -254 -210 -90 -283 -99 -805 -100 -533 0 -660 -16 -1045 -125 -651 -184 -1254 -443 -1730 -743 -257 -161 -423 -289 -571 -438 -107 -108 -162 -187 -196 -282 -27 -74 -28 -219 -4 -312 43 -162 162 -337 275 -404 7 -5 -7 16 -32 47 -114 141 -177 291 -185 447 -4 84 -1 104 22 174 30 89 84 172 130 203 67 43 447 173 580 198 150 28 378 55 461 55 33 0 65 4 70 8 6 4 33 39 60 77 67 95 259 286 375 372 149 110 277 168 485 218 176 42 551 83 790 86 95 1 97 2 45 11 -131 21 -654 -16 -871 -62 -264 -56 -620 -191 -929 -352 -174 -90 -365 -212 -516 -329 -110 -84 -119 -89 -299 -154 -167 -60 -217 -76 -222 -72 -6 7 131 130 224 203 578 452 1682 916 2413 1016 121 16 239 21 715 28 518 8 784 18 2209 85 176 8 322 18 325 21 10 11 -946 -4 -1259 -20 -469 -23 -603 -27 -640 -18 l-35 9 28 12 c16 6 36 11 46 11 10 0 105 27 212 61 107 34 264 83 349 110 142 44 317 103 845 282 362 124 794 243 1065 296 852 164 1547 181 2480 61 386 -50 1080 -191 1383 -282 85 -25 98 -18 20 10 -299 107 -1015 261 -1518 326 -623 81 -1341 81 -1890 1 -600 -88 -933 -175 -1850 -484 -242 -82 -460 -152 -485 -156 l-45 -7 35 24 c19 14 71 44 115 68 44 23 103 55 130 71 122 68 487 226 749 324 279 104 659 203 994 259 395 67 639 86 1143 93 560 7 955 -14 1494 -82 507 -63 1268 -211 1825 -355 107 -27 234 -60 283 -72 48 -12 87 -24 87 -27 0 -3 -84 -4 -187 -3 -274 6 -578 -28 -677 -74 l-31 -14 46 5 c223 26 591 33 804 14 228 -19 439 -62 781 -158 76 -21 163 -44 192 -51 28 -7 54 -16 57 -20 7 -12 -183 -69 -495 -149 -226 -57 -768 -161 -1010 -192 -74 -9 -557 -64 -655 -74 -957 -97 -2025 -224 -2739 -325 -1035 -148 -1989 -351 -2636 -562 -134 -44 -189 -71 -74 -37 118 35 606 155 884 218 602 136 1270 250 2015 346 110 14 229 30 265 35 59 9 170 23 400 51 117 14 126 15 375 44 121 13 240 27 265 30 25 3 281 32 570 65 955 108 1141 131 1461 185 327 55 826 166 1074 240 44 13 145 42 223 66 l144 42 106 -33 c59 -18 188 -59 287 -91 245 -79 468 -140 665 -183 732 -158 710 -153 710 -164 0 -4 -33 -20 -74 -36 -193 -73 -419 -249 -460 -358 l-18 -46 -56 20 c-80 29 -236 36 -322 14 -73 -18 -210 -83 -255 -121 -26 -23 -22 -22 42 9 109 54 202 77 333 83 99 5 125 2 188 -16 66 -20 72 -24 72 -49 1 -42 32 -102 89 -167 61 -70 115 -158 130 -212 31 -109 3 -250 -71 -365 -39 -61 -202 -232 -263 -277 l-30 -22 35 17 c59 29 172 117 232 182 112 122 164 249 155 382 -6 94 -34 158 -116 267 -98 131 -117 192 -89 285 23 78 157 205 306 291 116 67 215 100 280 94 52 -6 52 -5 52 23 0 19 -6 31 -17 34 -37 11 -416 99 -608 141 -530 117 -723 170 -1325 370 -322 107 -652 215 -735 240 -82 26 -231 73 -330 105 -486 157 -1160 331 -1605 414 -888 165 -1581 224 -2306 195z' />
			<path d='M11575 6869 c-514 -24 -1123 -118 -1623 -250 -67 -18 -120 -34 -119 -36 2 -2 48 6 101 17 54 11 218 41 364 66 242 42 374 62 692 108 129 18 362 43 490 51 52 4 106 9 120 11 14 2 183 6 375 8 326 4 635 -8 778 -29 26 -4 47 -3 47 2 0 11 -222 41 -400 53 -155 11 -575 11 -825 -1z' />
			<path d='M12473 6046 c-158 -30 -325 -103 -468 -204 -106 -75 -292 -261 -391 -392 -76 -99 -314 -452 -314 -465 0 -6 22 19 225 252 229 265 404 416 597 518 207 109 364 152 583 161 163 7 275 -8 420 -57 283 -96 492 -284 621 -558 56 -119 57 -121 60 -118 8 7 -48 175 -80 243 -126 266 -420 501 -751 600 -79 23 -111 27 -260 30 -116 2 -193 -1 -242 -10z' />
			<path d='M3659 5989 c-105 -14 -295 -66 -399 -110 -387 -165 -676 -487 -810 -904 -51 -161 -64 -258 -63 -465 1 -129 6 -202 16 -240 l15 -55 1 100 c4 349 98 663 272 910 197 277 519 495 858 580 480 121 925 37 1299 -245 104 -78 197 -178 277 -298 36 -53 65 -93 65 -89 0 21 -94 188 -140 248 -200 267 -605 504 -959 563 -102 17 -319 20 -432 5z' />
			<path d='M6992 3678 c-303 -598 -462 -916 -462 -923 0 -3 132 -5 294 -5 l294 0 57 133 c32 72 62 137 66 142 5 7 95 10 251 9 134 -1 295 -3 359 -3 l117 -1 58 -140 59 -139 283 -3 c156 -2 285 -1 287 2 4 6 -25 69 -405 885 -128 275 -237 512 -242 528 l-10 27 -373 0 -373 0 -260 -512z m738 -53 c62 -143 114 -266 117 -272 4 -10 -46 -13 -231 -13 -130 0 -236 3 -236 8 0 4 45 113 101 242 55 129 107 250 115 269 8 19 16 32 18 30 2 -2 54 -121 116 -264z' />
			<path d='M10767 3933 c-69 -142 -227 -464 -351 -716 -125 -252 -226 -460 -226 -462 0 -3 129 -5 288 -5 l287 0 62 143 62 142 153 -1 c84 -1 244 -2 355 -3 235 -1 200 20 274 -161 l47 -115 296 -3 c163 -1 296 0 296 3 0 8 -141 315 -287 625 -76 162 -193 411 -258 552 l-120 257 -376 1 -375 0 -127 -257z m584 -270 c51 -120 103 -242 116 -270 l23 -53 -244 0 -243 0 99 233 c126 298 136 319 147 313 5 -3 51 -104 102 -223z' />
			<path d='M3350 3983 l0 -183 240 0 240 0 0 -525 0 -525 310 0 310 0 0 525 0 525 270 0 270 0 -2 180 -3 180 -818 3 -817 2 0 -182z' />
		</>
	);

	const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

	const ParallaxSection = ({ id, src, alt, variant }) => {
		const sectionRef = useRef(null);
		// Use scrollTick to re-render on scroll.
		void scrollTick;

		const rect = sectionRef.current?.getBoundingClientRect();
		const vh = typeof window !== "undefined" ? window.innerHeight || 1 : 1;
		const vw = typeof window !== "undefined" ? window.innerWidth || 1 : 1;

		const isVisible = rect ? rect.bottom > 0 && rect.top < vh : false;
		// 0 -> just entering from bottom, 1 -> comfortably in view.
		const enterProgress = rect ? clamp((vh - rect.top) / (vh * 0.6), 0, 1) : 0;
		const progress = isVisible ? enterProgress : rect && rect.top < 0 ? 1 : 0;

		const centerOffset = rect ? rect.top + rect.height / 2 - vh / 2 : 0;
		const parallaxY = clamp(-centerOffset * 0.08, -90, 90);

		// Avoid pushing images fully off-canvas on narrow screens.
		const travelX = clamp(vw * 0.35, 120, 260);
		let translateX = 0;
		let scale = 1;
		if (variant === "right") translateX = (1 - progress) * travelX;
		if (variant === "left") translateX = -(1 - progress) * travelX;
		if (variant === "grow") scale = 0.7 + 0.3 * progress;

		const opacity = isVisible ? clamp(progress * 1.4, 0, 1) : 0;
		const transform = `translate3d(${translateX}px, ${parallaxY}px, 0) scale(${scale})`;

		return (
			<section id={id} ref={sectionRef} className='scroll-section'>
				<div className='scroll-inner'>
					<img
						src={`${baseUrl}${String(src).replace(/^\//, "")}`}
						alt={alt}
						className='scroll-image'
						style={{ transform, opacity }}
						loading='lazy'
					/>
				</div>
			</section>
		);
	};

	return (
		<div className='page'>
			<div className={`logo-container ${logoDocked ? "is-docked" : ""}`}>
				<svg
					version='1.0'
					xmlns='http://www.w3.org/2000/svg'
					width='100%'
					height='100%'
					viewBox='0 0 1536.000000 1024.000000'
					preserveAspectRatio='xMidYMid meet'
					className='logo-image'
				>
					<defs>
						<clipPath id='reveal-clip' clipPathUnits='userSpaceOnUse'>
							<rect x='0' y='0' width={revealWidth} height='1024' />
						</clipPath>
					</defs>

					<g
						transform='translate(0.000000,1024.000000) scale(0.100000,-0.100000)'
						fill='#000000'
						stroke='none'
					>
						<LogoPaths />
					</g>

					<g clipPath='url(#reveal-clip)'>
						<g
							transform='translate(0.000000,1024.000000) scale(0.100000,-0.100000)'
							fill='#dc143c'
							stroke='none'
						>
							<LogoPaths />
						</g>
					</g>
				</svg>
			</div>

			{introDone ? (
				<>
					<header
						className={`site-header ${headerVisible ? "is-visible" : ""}`}
						lang={language}
					>
						<nav className='header-nav header-nav--left' aria-label='Primary'>
							<a className='header-link' href='#home'>
								{t.home}
							</a>
							<a className='header-link' href='#services'>
								{t.services}
							</a>
							<a className='header-link' href='#help'>
								{t.help}
							</a>
						</nav>

						<div className='header-center-slot' aria-hidden='true' />

						<div className='header-right'>
							<nav
								className='header-nav header-nav--right'
								aria-label='Secondary'
							>
								<a className='header-link' href='#about'>
									{t.about}
								</a>
								<a className='header-link' href='#contact'>
									{t.contact}
								</a>
							</nav>

							<div className='lang-buttons' role='group' aria-label='Language'>
								<button
									type='button'
									className={`lang-button ${
										language === "ka" ? "is-active" : ""
									}`}
									onClick={() => setLanguage("ka")}
								>
									KA
								</button>
								<button
									type='button'
									className={`lang-button ${
										language === "en" ? "is-active" : ""
									}`}
									onClick={() => setLanguage("en")}
								>
									EN
								</button>
								<button
									type='button'
									className={`lang-button ${
										language === "ru" ? "is-active" : ""
									}`}
									onClick={() => setLanguage("ru")}
								>
									RU
								</button>
							</div>
						</div>
					</header>

					<section
						id='home'
						className={`hero-slider ${headerVisible ? "is-visible" : ""}`}
						aria-label='Hero'
					>
						{heroSlides.map((slide, idx) => {
							const isActive = idx === heroSlideIndex;
							return (
								<div
									key={slide.src}
									className={`hero-slide ${isActive ? "is-active" : ""}`}
									role='img'
									aria-label={slide.alt}
									style={{
										backgroundImage: `url(${baseUrl}${String(slide.src).replace(
											/^\//,
											"",
										)})`,
									}}
								/>
							);
						})}
					</section>

					<ParallaxSection
						id='services'
						src='pipeline.png'
						alt='Pipeline'
						variant='right'
					/>
					<ParallaxSection
						id='about'
						src='manheim.png'
						alt='Manheim'
						variant='grow'
					/>
					<ParallaxSection src='copart.png' alt='Copart' variant='left' />
					<ParallaxSection
						src='acv-capital.png'
						alt='ACV Capital'
						variant='right'
					/>
					<ParallaxSection
						id='contact'
						src='contacts.png'
						alt='Contacts'
						variant='grow'
					/>
					<ParallaxSection
						id='help'
						src='phone.png'
						alt='Phone'
						variant='left'
					/>
				</>
			) : null}
		</div>
	);
}

export default App;
