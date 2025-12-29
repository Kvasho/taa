import { useState } from "react";
import "./CarCarousel.css";

const cars = [
	{
		name: "2022 BMW 530i xDrive",
		price: 29500,
		image:
			"https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=80",
		specs: ["56k mi", "AWD", "2.0L Turbo", "Automatic"],
		highlight: "Executive Pack",
	},
	{
		name: "2021 Mercedes-Benz GLE 350",
		price: 38900,
		image:
			"https://images.unsplash.com/photo-1542365887-65b60a1c9f87?auto=format&fit=crop&w=1600&q=80",
		specs: ["42k mi", "RWD", "2.0L Turbo", "Premium Audio"],
		highlight: "One Owner",
	},
	{
		name: "2020 Audi Q7 S-Line",
		price: 36500,
		image:
			"https://images.unsplash.com/photo-1549921296-3c533f2f9f6b?auto=format&fit=crop&w=1600&q=80",
		specs: ["61k mi", "Quattro", "3.0L V6", "Panorama Roof"],
		highlight: "Dealer Serviced",
	},
	{
		name: "2023 Toyota RAV4 Hybrid XSE",
		price: 31200,
		image:
			"https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=80",
		specs: ["18k mi", "AWD", "Hybrid", "Safety Sense"],
		highlight: "Factory Warranty",
	},
];

function CarCarousel() {
	const [activeIdx, setActiveIdx] = useState(0);
	const activeCar = cars[activeIdx];

	const go = (delta) => {
		const next = (activeIdx + delta + cars.length) % cars.length;
		setActiveIdx(next);
	};

	return (
		<div className='car-carousel'>
			<div className='car-carousel__head'>
				<div className='car-carousel__eyebrow'>Featured inventory</div>
				<div className='car-carousel__title-row'>
					<h3 className='car-carousel__title'>Ready-to-ship picks</h3>
					<div className='car-carousel__controls'>
						<button
							type='button'
							onClick={() => go(-1)}
							aria-label='Previous car'
						>
							<span className='chevron'>‹</span>
						</button>
						<button type='button' onClick={() => go(1)} aria-label='Next car'>
							<span className='chevron'>›</span>
						</button>
					</div>
				</div>
			</div>

			<div className='car-card' key={activeCar.name}>
				<div className='car-card__image-wrap'>
					<img src={activeCar.image} alt={activeCar.name} loading='lazy' />
					<div className='car-card__tag'>{activeCar.highlight}</div>
					<div className='car-card__price'>
						${activeCar.price.toLocaleString()}
					</div>
				</div>

				<div className='car-card__body'>
					<h4 className='car-card__name'>{activeCar.name}</h4>
					<div className='car-card__specs'>
						{activeCar.specs.map((spec) => (
							<span key={spec}>{spec}</span>
						))}
					</div>
					<div className='car-card__actions'>
						<button type='button'>View auction sheet</button>
						<button type='button' className='secondary'>
							Get shipping estimate
						</button>
					</div>
				</div>
			</div>

			<div className='car-carousel__rail' role='tablist' aria-label='Inventory'>
				{cars.map((car, idx) => (
					<button
						key={car.name}
						type='button'
						className={`car-carousel__pill ${
							idx === activeIdx ? "is-active" : ""
						}`.trim()}
						onClick={() => setActiveIdx(idx)}
						role='tab'
						aria-selected={idx === activeIdx}
					>
						<span className='car-carousel__pill-name'>{car.name}</span>
						<span className='car-carousel__pill-price'>
							${car.price.toLocaleString()}
						</span>
					</button>
				))}
			</div>
		</div>
	);
}

export default CarCarousel;
