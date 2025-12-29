import "./PriceModal.css";

function PriceModal({
	open,
	onClose,
	calcForm,
	makes,
	modelsByMake,
	years,
	isCalculating,
	onChange,
	onSubmit,
}) {
	if (!open) return null;

	return (
		<div className='price-modal' role='dialog' aria-modal='true'>
			<div
				className='price-modal__backdrop'
				onClick={onClose}
				aria-hidden='true'
			/>
			<div className='price-modal__card'>
				<div className='price-modal__header'>
					<div className='price-modal__title'>
						<i className='fa-solid fa-calculator' aria-hidden='true' />
						<span>ფასის გამოთვლა</span>
					</div>
					<button
						type='button'
						className='price-modal__close'
						onClick={onClose}
						aria-label='Close price modal'
					>
						<i className='fa-solid fa-xmark' aria-hidden='true' />
					</button>
				</div>

				<form className='price-form' onSubmit={onSubmit}>
					<label className='price-field'>
						<span className='price-label'>მარკა</span>
						<select
							required
							value={calcForm.make}
							onChange={onChange("make")}
							className='price-select'
						>
							<option value=''>აირჩიე</option>
							{makes.map((make) => (
								<option key={make} value={make}>
									{make}
								</option>
							))}
						</select>
					</label>

					<label className='price-field'>
						<span className='price-label'>მოდელი</span>
						<select
							required
							value={calcForm.model}
							onChange={onChange("model")}
							className='price-select'
							disabled={!calcForm.make}
						>
							<option value=''>აირჩიე</option>
							{(modelsByMake[calcForm.make] || []).map((model) => (
								<option key={model} value={model}>
									{model}
								</option>
							))}
						</select>
					</label>

					<label className='price-field'>
						<span className='price-label'>წელი</span>
						<select
							required
							value={calcForm.year}
							onChange={onChange("year")}
							className='price-select'
						>
							<option value=''>აირჩიე</option>
							{years.map((year) => (
								<option key={year} value={year}>
									{year}
								</option>
							))}
						</select>
					</label>

					<label className='price-field'>
						<div className='price-label-row'>
							<span className='price-label'>აუქციონის ფასი</span>
							<span className='price-range__value'>
								${Number(calcForm.auctionPrice).toLocaleString("en-US")}
							</span>
						</div>
						<input
							type='range'
							min='1000'
							max='80000'
							step='500'
							value={calcForm.auctionPrice}
							onChange={onChange("auctionPrice")}
							className='price-range'
						/>
					</label>

					<button
						type='submit'
						className='price-submit'
						disabled={isCalculating}
					>
						{isCalculating ? (
							<>
								<i
									className='fa-solid fa-arrows-rotate fa-spin'
									aria-hidden='true'
								/>
								<span>ვანგარიშობ...</span>
							</>
						) : (
							<>
								<i className='fa-solid fa-sack-dollar' aria-hidden='true' />
								<span>გამოთვალე</span>
							</>
						)}
					</button>
				</form>
			</div>
		</div>
	);
}

export default PriceModal;
