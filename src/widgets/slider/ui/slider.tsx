import { FC } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { FreeMode, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Description } from 'entities/description'

import { useResize } from 'shared/lib/useResize'
import { ISlide } from 'shared/types'

import './slider.scss'

interface ISlider {
	readonly active: ISlide[]
}

export const Slider: FC<ISlider> = ({ active }) => {
	const { isMobileScreen } = useResize()
	return (
		<Swiper
			freeMode
			slidesPerView={isMobileScreen ? 'auto' : 3}
			spaceBetween={isMobileScreen ? 25 : 80}
			navigation={!isMobileScreen}
			pagination={{ clickable: isMobileScreen, enabled: isMobileScreen }}
			breakpoints={{}}
			modules={[FreeMode, Navigation, Pagination]}
		>
			{active.map(({ text, year }, idx) => (
				<SwiperSlide key={idx}>
					<Description year={year} text={text} />
				</SwiperSlide>
			))}
		</Swiper>
	)
}
