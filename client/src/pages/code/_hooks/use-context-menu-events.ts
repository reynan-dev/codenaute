import { useEffect } from 'react';

export type Position = { x: number; y: number };

export const useContextMenuEvents = (
	filesElementRef: React.MutableRefObject<HTMLDivElement | null>,
	setContextMenuPosition: React.Dispatch<React.SetStateAction<Position | null>>
) => {
	useEffect(() => {
		const closeContextMenu = () => {
			setContextMenuPosition(null);
		};

		const preventContextMenu = (event: MouseEvent) => {
			event.preventDefault();
		};

		document.addEventListener('contextmenu', function (event) {
			if (
				filesElementRef.current !== null &&
				filesElementRef.current.contains(event.target as Node)
			) {
				preventContextMenu(event);
			}
		});

		document.addEventListener('click', function (event) {
			if (
				filesElementRef.current !== null &&
				filesElementRef.current.contains(event.target as Node)
			) {
				closeContextMenu();
			}
		});

		return () => {
			document.removeEventListener('click', closeContextMenu);
			document.removeEventListener('contextmenu', preventContextMenu);
		};
	}, [filesElementRef, setContextMenuPosition]);
};
