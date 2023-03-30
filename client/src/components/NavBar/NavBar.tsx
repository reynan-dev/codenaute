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
	const [location, setLocation] = useState<string>(pathname)

	useEffect(() => {
		setLocation(pathname)
	}, [pathname])


	return (
		<div
			className={twMerge(
				'flex flex-col items-center',
				'h-16 w-full p-2',
				'bg-dark',
				'md:h-full md:w-14',
				className
			)}
		>
			<Link to='/' className='mb-16'>
				<NavBarLogoSvg />
			</Link>

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
	);
};
