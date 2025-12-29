import "./ServicesSection.css";

function ServicesSection({ serviceSteps, openServiceIdx, onToggle }) {
	return (
		<div className='services-steps'>
			<div className='services-starfield' aria-hidden='true' />
			<div className='services-orbits' aria-hidden='true'>
				<span className='orbit orbit--1' />
				<span className='orbit orbit--2' />
				<span className='orbit orbit--3' />
			</div>
			<div className='services-accordion'>
				{serviceSteps.map((step, idx) => {
					const isOpen = openServiceIdx === idx;
					return (
						<div
							key={step.title}
							className={`service-item ${isOpen ? "is-open" : ""}`.trim()}
						>
							<button
								type='button'
								className='service-head'
								onClick={() => onToggle(idx)}
							>
								<div className='service-pill'>0{idx + 1}</div>
								<div className='service-title'>{step.title}</div>
								<div className='service-chevron' aria-hidden='true'>
									<span />
									<span />
								</div>
							</button>
							<div
								className='service-body'
								style={{ maxHeight: isOpen ? "240px" : "0px" }}
							>
								<p className='service-detail'>{step.detail}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ServicesSection;
