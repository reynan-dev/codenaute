import BurgerButton from 'components/BurgerButton';
import NavBarLogoSvg from 'components/Svgs/NavBarLogoSvg';
import { useEffect, useState } from 'react';
import { FiCode, FiSearch, FiUser } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface NavBarProps {
	className?: string;
}

export const NavBar = ({ className }: NavBarProps) => {
	const { pathname } = useLocation();
	const [location, setLocation] = useState<string>(pathname);

	useEffect(() => {
		setLocation(pathname);
	}, [pathname]);

	const [popMenu, setPopMenu] = useState('hidden');
	const [isHidden, setIsHidden] = useState(false);

	const handleMenuClick = () => {
		setPopMenu(isHidden === false ? 'inline-block' : 'hidden');
		setIsHidden(!isHidden);
	};

	return (
		<>
			<div
				className={twMerge(
					'flex items-center justify-center',
					'h-16 w-full py-2 px-4',
					'bg-dark',
					'md:h-full md:w-14 md:flex-col md:justify-start',
					className
				)}
			>
				<Link to='/' className='md:mb-16'>
					<NavBarLogoSvg />
				</Link>

				<div className='flex w-full items-center justify-end md:hidden'>
					<BurgerButton onClick={handleMenuClick}></BurgerButton>
				</div>

				<div className='hidden flex-col items-center space-y-8 md:flex'>
					<Link to='/account'>
						<FiUser
							size={24}
							className={twMerge(
								'hover:text-primary',
								location === '/account' ? 'text-primary' : 'text-primary-200'
							)}
						/>
					</Link>

					<Link to='/'>
						<FiCode
							size={24}
							className={twMerge(
								'hover:text-primary',
								location === '/' ? 'text-primary' : 'text-primary-200'
							)}
						/>
					</Link>

					<Link to='#'>
						<FiSearch
							size={24}
							className={twMerge(
								'hover:text-primary',
								location === '/explore' ? 'text-primary' : 'text-primary-200'
							)}
						/>
					</Link>
				</div>
			</div>
			<div
				className={`absolute z-40 h-fit w-full bg-dark shadow-lg transition-all duration-200 ${
					isHidden ? 'top-16 opacity-100' : '-top-[240px] opacity-0'
				}`}
			>
				<ul className='flex flex-col'>
					<li className='flex h-20 items-center justify-center text-xl'>Account</li>
					<li className='flex h-20 items-center justify-center text-xl'>New code</li>
					<li className='flex h-20 items-center justify-center text-xl'>Explore</li>
				</ul>
			</div>
		</>
	);
};
