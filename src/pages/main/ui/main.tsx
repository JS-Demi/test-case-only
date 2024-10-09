import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'

import { CircleEvents } from 'widgets/circleEvents'
import { Navigation } from 'widgets/navigation'
import { Slider } from 'widgets/slider'

import { YearRange } from 'entities/yearRange'

import { DATA } from 'shared/constants'
import { useResize } from 'shared/lib/useResize'
import { groupBy } from 'shared/lib/utils'
import { useSegmentStore } from 'shared/model'
import { ISlide } from 'shared/types'

import classes from './main.module.scss'

interface IMain {}

export const Main: FC<IMain> = () => {
	const activeSegment = useSegmentStore((state) => state.activeSegment)
	const groupedData = groupBy<ISlide>(DATA, 'area')
	const active = groupedData.get(activeSegment)!
	const segmentCount = groupedData.size
	const sortedActive = active.sort((a, b) => a.year - b.year)
	const rangeStart = sortedActive[0].year
	const rangeEnd = sortedActive[sortedActive.length - 1].year
	const [isFade, setIsFade] = useState(false)
	const [slides, setSlides] = useState(sortedActive)
	useEffect(() => {
		setIsFade(true)
		setTimeout(() => setSlides(sortedActive), 500)
		setTimeout(() => setIsFade(false), 1000)
		// eslint-disable-next-line
	}, [activeSegment])
	const { isLargeScreen, isMobileScreen } = useResize()
	return (
		<main className={classes.container}>
			{isLargeScreen && <div className={classes.wrapper} />}
			<section className={classes.content}>
				<h1 className={classes.header}>
					{isLargeScreen && <div className={classes.border} />}
					<p className={classes.title}>
						Исторические <br /> даты
					</p>
				</h1>
				{isLargeScreen ? (
					<CircleEvents rangeEnd={rangeEnd} rangeStart={rangeStart} />
				) : (
					<YearRange rangeEnd={rangeEnd} rangeStart={rangeStart} />
				)}

				<article className={classes.main_content}>
					<Navigation segmentCount={segmentCount} />
					<div className={clsx(classes.slider, isFade && classes.fade)}>
						{isMobileScreen && <p className={classes.area}>{slides[0].area}</p>}
						<Slider active={slides} />
					</div>
				</article>
			</section>
		</main>
	)
}
