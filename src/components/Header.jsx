import "./Header.css";

function Header({
	headerVisible,
	language,
	onChangeLanguage,
	primaryLinks,
	secondaryLinks,
	onToggleMenu,
	isMenuOpen,
	onLinkClick,
}) {
	return (
		<header
			className={`site-header ${headerVisible ? "is-visible" : ""}`.trim()}
			lang={language}
		>
			<nav className='header-nav header-nav--left' aria-label='Primary'>
				{primaryLinks.map((link) => (
					<a
						key={link.href}
						className='header-link'
						href={link.href}
						onClick={onLinkClick}
					>
						{link.label}
					</a>
				))}
			</nav>

			<div className='header-center-slot' aria-hidden='true' />

			<div className='header-right'>
				<nav className='header-nav header-nav--right' aria-label='Secondary'>
					{secondaryLinks.map((link) => (
						<a
							key={link.href}
							className='header-link'
							href={link.href}
							onClick={onLinkClick}
						>
							{link.label}
						</a>
					))}
				</nav>

				<div className='lang-buttons' role='group' aria-label='Language'>
					{[
						{ code: "ka", label: "KA" },
						{ code: "en", label: "EN" },
						{ code: "ru", label: "RU" },
					].map((lang) => (
						<button
							key={lang.code}
							type='button'
							className={`lang-button ${
								language === lang.code ? "is-active" : ""
							}`.trim()}
							onClick={() => onChangeLanguage(lang.code)}
						>
							{lang.label}
						</button>
					))}
				</div>

				<button
					type='button'
					className={`menu-toggle ${isMenuOpen ? "is-open" : ""}`.trim()}
					aria-expanded={isMenuOpen}
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					onClick={onToggleMenu}
				>
					<span />
					<span />
					<span />
				</button>
			</div>
		</header>
	);
}

export default Header;
