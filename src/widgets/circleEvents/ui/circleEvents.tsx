import { FC } from 'react'

import { Dot } from 'entities/dot'
import { YearRange } from 'entities/yearRange'

import { DATA } from 'shared/constants'
import { getRotateAngle, groupBy } from 'shared/lib/utils'
import { useSegmentStore } from 'shared/model'
import { ISlide } from 'shared/types'

import classes from './circleEvents.module.scss'

interface ICircleEvents {
	readonly rangeEnd: number
	readonly rangeStart: number
}

export const CircleEvents: FC<ICircleEvents> = ({ rangeEnd, rangeStart }) => {
	const activeSegment = useSegmentStore((state) => state.activeSegment)
	const groupedData = groupBy<ISlide>(DATA, 'area')
	const segmentCount = groupedData.size
	const circleSize = 530

	return (
		<article className={classes.manage}>
			<YearRange rangeEnd={rangeEnd} rangeStart={rangeStart} />
			<div
				className={classes.circle}
				style={
					{
						'--rotate': getRotateAngle(activeSegment, segmentCount) + 'deg',
						'--circle-size': circleSize + 'px',
					} as React.CSSProperties
				}
			>
				<div className={classes.circleWrapper} />
				{[...groupedData].map(([_, value], idx) => (
					<Dot
						key={idx}
						index={idx}
						area={value[0].area}
						circleSize={circleSize}
						segmentCount={segmentCount}
					/>
				))}
			</div>
		</article>
	)
}
