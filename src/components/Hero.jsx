import "./Hero.css";

function Hero({ headerVisible, baseUrl, onOpenPrice, priceResult }) {
	return (
		<section
			id='home'
			aria-label='Hero'
			className={`relative h-screen w-full overflow-hidden transition-opacity duration-450 ${
				headerVisible ? "opacity-100" : "opacity-0"
			}`.trim()}
		>
			<div className='hero-glow' aria-hidden='true' />
			<video
				className='absolute inset-0 h-full w-full object-cover'
				src={`${baseUrl}landing.mp4`}
				autoPlay
				loop
				muted
				playsInline
				preload='auto'
			/>
			<div className='relative z-10 flex h-full w-full items-center justify-center px-6 text-center hero-content'>
				<div className='hero-title-shell'>
					<h1 className='hero-title'>თქვენი სანდო პარტნიორი</h1>
				</div>

				<div className='hero-actions'>
					<button
						type='button'
						className='cta-pill cta-pill--light'
						onClick={onOpenPrice}
					>
						<i className='fa-solid fa-calculator' aria-hidden='true' />
						<span>გამოთვალე ფასი</span>
					</button>
					<a className='cta-pill cta-pill--dark' href='#contact'>
						<i className='fa-solid fa-car-side' aria-hidden='true' />
						<span>მოითხოვე ავტომობილი</span>
					</a>
				</div>

				{priceResult ? (
					<div className='price-chip'>
						<i className='fa-solid fa-sack-dollar' aria-hidden='true' />
						<span>გამოთვლილი ფასი: ${priceResult.toLocaleString("en-US")}</span>
					</div>
				) : null}
			</div>

			<a
				href='#services'
				aria-label='Scroll to next section'
				className='absolute bottom-8 left-1/2 z-10 -translate-x-1/2 bg-black/35 px-4 py-3 text-white'
			>
				<div className='flex flex-col items-center gap-1'>
					<svg
						className='motion-safe:animate-bounce motion-reduce:animate-none'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						aria-hidden='true'
					>
						<path
							d='M6 9l6 6 6-6'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</div>
			</a>
		</section>
	);
}

export default Hero;
