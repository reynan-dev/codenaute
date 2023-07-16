import BurgerButton from 'components/burger-button';
import NavBarLogoSvg from 'components/svgs/nav-bar-logo';
import { ACCOUNT_PATH, CREATE_PROJECT_PATH, HOME_PATH } from 'constants/paths';
import { useWindowSize } from 'hooks/use-window-size';
import { useEffect, useState } from 'react';
import { FiCode, FiSearch, FiUser } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { twJoin, twMerge } from 'tailwind-merge';
interface NavBarProps {
	className?: string;
}

export const NavBar = ({ className }: NavBarProps) => {
	const { pathname } = useLocation();
	const { width } = useWindowSize();

	const [location, setLocation] = useState<string>(pathname);
	const [isBurgerOpen, setIsBurgerOpen] = useState(false);
	const [isHidden, setIsHidden] = useState(false);

	const TAILWIND_MD_BREAKPOINT = 768;

	useEffect(() => {
		setLocation(pathname);
	}, [pathname]);

	const handleMenuClick = () => {
		setIsHidden(!isHidden);
	};

	const handleMenuItemClick = () => {
		setIsHidden(false);
		setIsBurgerOpen(false);
	};

	const handleBurgerOnClick = () => {
		setIsBurgerOpen(!isBurgerOpen);
		handleMenuClick();
	};

	const style = {
		mobileMenuItemLink: twJoin(
			'flex items-center justify-center',
			'h-20',
			'text-xl hover:bg-dark-700'
		),
		mobileMenuIcons: twJoin('mr-5'),
		renderDesktopMenuIconStyle: (locationPathname: string) =>
			twMerge(
				'hover:text-primary hover:scale-125',
				location === locationPathname ? 'text-primary scale-125' : 'text-primary-200'
			)
	};

	const shouldShowMobileMenu = () => width !== undefined && width <= TAILWIND_MD_BREAKPOINT;

	return (
		<>
			<div
				className={twMerge(
					'flex items-center justify-center',
					'h-16 w-full px-4 py-2',
					'border border-b-0 border-l-0 border-t-0 border-r-dark-700 bg-dark',
					'md:h-full md:w-14 md:flex-col md:justify-start',
					className
				)}
			>
				<Link to='/' className='md:mb-16' onClick={handleMenuItemClick}>
					<NavBarLogoSvg />
				</Link>

				<div className='flex w-full items-center justify-end md:hidden'>
					<BurgerButton onClick={handleBurgerOnClick} isOpen={isBurgerOpen}></BurgerButton>
				</div>

				<div className='hidden flex-col items-center space-y-8 md:flex'>
					<Link to={ACCOUNT_PATH}>
						<FiUser size={18} className={style.renderDesktopMenuIconStyle('/account')} />
					</Link>

					<Link to={CREATE_PROJECT_PATH}>
						<FiCode size={18} className={style.renderDesktopMenuIconStyle('/code-editor')} />
					</Link>

					<Link to={HOME_PATH}>
						<FiSearch size={16} className={style.renderDesktopMenuIconStyle('/explore')} />
					</Link>
				</div>
			</div>

			{shouldShowMobileMenu() && (
				<div
					className={`fixed z-40 h-fit w-full bg-dark shadow-lg transition-all duration-200 ${
						isHidden ? 'top-16 opacity-100' : '-top-[240px] opacity-0'
					}`}
				>
					<ul className='flex flex-col'>
						<Link
							to={ACCOUNT_PATH}
							className={style.mobileMenuItemLink}
							onClick={handleMenuItemClick}
						>
							<FiUser size={22} className={style.mobileMenuIcons} />
							<li>Account</li>
						</Link>
						<Link
							to={CREATE_PROJECT_PATH}
							className={style.mobileMenuItemLink}
							onClick={handleMenuItemClick}
						>
							<FiCode size={22} className={style.mobileMenuIcons} />
							<li>New code</li>
						</Link>
						<Link to={HOME_PATH} className={style.mobileMenuItemLink} onClick={handleMenuItemClick}>
							<FiSearch size={20} className={style.mobileMenuIcons} />
							<li>Explore</li>
						</Link>
					</ul>
				</div>
			)}
		</>
	);
};
