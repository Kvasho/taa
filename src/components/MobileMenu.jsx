import "./MobileMenu.css";

function MobileMenu({
	isMenuOpen,
	language,
	links,
	onClose,
	onChangeLanguage,
}) {
	return (
		<div
			className={`mobile-menu ${isMenuOpen ? "is-open" : ""}`.trim()}
			lang={language}
		>
			<div className='mobile-menu__inner'>
				<div className='mobile-menu__top'>
					<span className='mobile-menu__label'>Menu</span>
					<button
						type='button'
						className='menu-toggle menu-toggle--close'
						aria-label='Close menu'
						onClick={onClose}
					>
						<span />
						<span />
					</button>
				</div>

				<nav className='mobile-menu__nav' aria-label='Mobile navigation'>
					{links.map((link) => (
						<a
							key={link.href}
							className='mobile-menu__link'
							href={link.href}
							onClick={onClose}
						>
							{link.label}
						</a>
					))}
				</nav>

				<div className='mobile-menu__langs' role='group' aria-label='Language'>
					{[
						{ code: "ka", label: "KA" },
						{ code: "en", label: "EN" },
						{ code: "ru", label: "RU" },
					].map((lang) => (
						<button
							key={lang.code}
							type='button'
							className={`mobile-lang ${
								language === lang.code ? "is-active" : ""
							}`.trim()}
							onClick={() => {
								onChangeLanguage(lang.code);
								onClose();
							}}
						>
							{lang.label}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

export default MobileMenu;
