import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import PriceModal from "./components/PriceModal";
import Hero from "./components/Hero";
import ParallaxStickySection from "./components/ParallaxStickySection";
import ServicesSection from "./components/ServicesSection";
import LogoReveal from "./components/LogoReveal";
import CarCarousel from "./components/CarCarousel";

function App() {
	const [loadingProgress, setLoadingProgress] = useState(0);
	const [logoDocked, setLogoDocked] = useState(false);
	const [headerVisible, setHeaderVisible] = useState(false);
	const [language, setLanguage] = useState("ka");
	const [scrollTick, setScrollTick] = useState(0);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
	const [isCalculatingPrice, setIsCalculatingPrice] = useState(false);
	const [priceResult, setPriceResult] = useState(null);
	const [calcForm, setCalcForm] = useState({
		make: "",
		model: "",
		year: "",
		auctionPrice: 15000,
	});
	const [openServiceIdx, setOpenServiceIdx] = useState(null);
	const baseUrl = import.meta.env.BASE_URL || "/";

	const I18N = {
		ka: {
			home: "მთავარი",
			cars: "ავტომობილები",
			services: "სერვისები",
			auctions: "აუქციონები",
			contact: "კონტაქტი",
		},
		en: {
			home: "Home",
			cars: "Cars",
			services: "Services",
			auctions: "Auctions",
			contact: "Contact",
		},
		ru: {
			home: "Главная",
			cars: "Автомобили",
			services: "Сервисы",
			auctions: "Аукционы",
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
			const tProgress = Math.min(elapsedMs / durationMs, 1);
			setLoadingProgress(tProgress * 100);
			if (tProgress < 1) rafId = requestAnimationFrame(tick);
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
		if (loadingProgress < 100) return;
		const prevOverflow = document.body.style.overflow;
		if (isMenuOpen || isPriceModalOpen) {
			document.body.style.overflow = "hidden";
		}
		return () => {
			document.body.style.overflow = prevOverflow;
		};
	}, [isMenuOpen, isPriceModalOpen, loadingProgress]);

	useEffect(() => {
		let rafId = 0;
		const onScrollOrResize = () => {
			if (rafId) return;
			rafId = requestAnimationFrame(() => {
				rafId = 0;
				setScrollTick((tVal) => tVal + 1);
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

	const primaryLinks = [
		{ href: "#home", label: t.home },
		{ href: "#cars", label: t.cars },
		{ href: "#services", label: t.services },
	];

	const secondaryLinks = [
		{ href: "#auctions", label: t.auctions },
		{ href: "#contact", label: t.contact },
	];

	const closeMenu = () => setIsMenuOpen(false);

	const makes = ["Toyota", "BMW", "Mercedes-Benz", "Ford", "Hyundai", "Honda"];

	const modelsByMake = {
		Toyota: ["Camry", "Corolla", "RAV4", "Highlander"],
		BMW: ["320i", "X5", "X3", "M4"],
		"Mercedes-Benz": ["C300", "E350", "GLC", "GLE"],
		Ford: ["Mustang", "F-150", "Explorer", "Escape"],
		Hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe"],
		Honda: ["Civic", "Accord", "CR-V", "Pilot"],
	};

	const years = Array.from({ length: 21 }, (_, idx) => `${2025 - idx}`);

	const serviceSteps = [
		{
			title: "ავტომობილის შერჩევა",
			detail:
				"ვყალიბებთ ბიუჯეტს და მოთხოვნებს, გიგზავნით შეთავაზებებს აუქციონებიდან და წინა გაყიდვების სტატისტიკას, რომ არჩევანი იყოს რაციონალური.",
		},
		{
			title: "აუქციონზე შეძენა",
			detail:
				"ვამზადებთ ბიდ-სტრატეგიას, ვამოწმებთ ვეჰიქლის ისტორიის რეპორტს და ვასრულებთ შეძენას თქვენს სახელზე უსაფრთხო გადახდით.",
		},
		{
			title: "ტრანსპორტირება (ფოთი/ბათუმი/ევროპის ქალაქები)",
			detail:
				"ვიძიებთ ოპტიმალურ მარშრუტს და გადაზიდვის ფასს, ვთანამშრომლობთ ტერმინალებთან და გიგზავნით ლოკაციებს რეალურ დროში.",
		},
		{
			title: "განბაჟება (RSG / MyAuto)",
			detail:
				"ვმართავთ დოკუმენტაციას, კოორდინაციას ვუწევთ განბაჟების პროცესს და გაწვდით ზუსტ გადასახადებს RSG ან MyAuto სერვისებით.",
		},
	];

	const openPriceModal = () => {
		setIsMenuOpen(false);
		setIsPriceModalOpen(true);
		setIsCalculatingPrice(false);
	};

	const closePriceModal = () => {
		setIsPriceModalOpen(false);
		setIsCalculatingPrice(false);
	};

	const handleCalcChange = (field) => (event) => {
		const value = event.target.value;
		setCalcForm((prev) => ({
			...prev,
			[field]: value,
			...(field === "make" ? { model: "" } : null),
		}));
	};

	const handleCalcSubmit = (event) => {
		event.preventDefault();
		if (!calcForm.make || !calcForm.model || !calcForm.year) return;
		setIsCalculatingPrice(true);
		setTimeout(() => {
			const auction = Number(calcForm.auctionPrice) || 0;
			const yearDelta = Math.max(0, 2025 - Number(calcForm.year));
			const feeFactor = 0.12 + yearDelta * 0.0025;
			const handling = 380;
			const result = Math.round(auction * (1 + feeFactor) + handling);
			setPriceResult(result);
			setIsPriceModalOpen(false);
			setIsCalculatingPrice(false);
		}, 1100);
	};

	useEffect(() => {
		if (!priceResult) return undefined;
		const timeoutId = setTimeout(() => {
			setPriceResult(null);
			setCalcForm({ make: "", model: "", year: "", auctionPrice: 15000 });
		}, 3000);
		return () => clearTimeout(timeoutId);
	}, [priceResult]);

	const toggleService = (idx) => {
		setOpenServiceIdx((prev) => (prev === idx ? null : idx));
	};

	const slides = [
		{
			id: "services",
			title: t.services,
			src: "",
			alt: "Services",
			variant: "right",
			noImage: true,
			bgClassName: "services-solid-bg",
			children: (
				<ServicesSection
					serviceSteps={serviceSteps}
					openServiceIdx={openServiceIdx}
					onToggle={toggleService}
				/>
			),
		},
		{
			id: "cars",
			title: t.cars,
			variant: "grow",
			noImage: true,
			bgClassName: "cars-cream-bg",
			contentClassName: "cars-content",
			children: <CarCarousel />,
		},
		{
			id: "auctions",
			title: t.auctions,
			src: "copart.png",
			alt: "Auctions",
			variant: "left",
		},
		{
			title: "ACV Capital",
			src: "acv-capital.png",
			alt: "ACV Capital",
			variant: "right",
		},
		{
			id: "contact",
			title: t.contact,
			src: "contacts.png",
			alt: "Contacts",
			variant: "grow",
		},
	];

	return (
		<div className='page'>
			<LogoReveal revealWidth={revealWidth} logoDocked={logoDocked} />

			{introDone ? (
				<>
					<Header
						headerVisible={headerVisible}
						language={language}
						onChangeLanguage={setLanguage}
						primaryLinks={primaryLinks}
						secondaryLinks={secondaryLinks}
						onToggleMenu={() => setIsMenuOpen((open) => !open)}
						isMenuOpen={isMenuOpen}
						onLinkClick={closeMenu}
					/>

					<MobileMenu
						isMenuOpen={isMenuOpen}
						language={language}
						onChangeLanguage={setLanguage}
						links={[...primaryLinks, ...secondaryLinks]}
						onClose={closeMenu}
					/>

					<PriceModal
						open={isPriceModalOpen}
						onClose={closePriceModal}
						calcForm={calcForm}
						makes={makes}
						modelsByMake={modelsByMake}
						years={years}
						isCalculating={isCalculatingPrice}
						onChange={handleCalcChange}
						onSubmit={handleCalcSubmit}
					/>

					<Hero
						headerVisible={headerVisible}
						baseUrl={baseUrl}
						onOpenPrice={openPriceModal}
						priceResult={priceResult}
					/>

					<div className='relative'>
						{slides.map((slide) => (
							<ParallaxStickySection
								key={slide.id || slide.src || slide.title}
								{...slide}
								baseUrl={baseUrl}
								scrollTick={scrollTick}
							/>
						))}
					</div>
				</>
			) : null}
		</div>
	);
}

export default App;
