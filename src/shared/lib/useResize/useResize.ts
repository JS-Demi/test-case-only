import { useEffect, useState } from 'react'

export const useResize = () => {
	const [width, setWidth] = useState(window.innerWidth)
	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth)
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])
	const isLargeScreen = width >= 768
	const isMobileScreen = width <= 768
	return {
		width,
		isMobileScreen,
		isLargeScreen,
	}
}
