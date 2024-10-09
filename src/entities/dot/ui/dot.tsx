import { clsx } from 'clsx'
import { FC } from 'react'

import {
	getDotPositionX,
	getDotPositionY,
	getRotateAngle,
} from 'shared/lib/utils'
import { useSegmentStore } from 'shared/model'
import { ISegment } from 'shared/types'

import classes from './dot.module.scss'

interface IDot {
	readonly index: number
	readonly circleSize: number
	readonly segmentCount: number
	readonly area: string
}

export const Dot: FC<IDot> = ({ index, circleSize, segmentCount, area }) => {
	const angle = (2 * Math.PI) / segmentCount
	const dotSize = circleSize / 10 + 3
	const activeSegment = useSegmentStore((state) => state.activeSegment)
	const setActiveSegment = useSegmentStore((state) => state.setActiveSegment)
	return (
		<div
			className={clsx(
				classes.dot,
				activeSegment === index + 1 && classes.active
			)}
			onClick={() => setActiveSegment((index + 1) as ISegment)}
			style={
				{
					'--y':
						getDotPositionY(angle * index, circleSize / 2) - dotSize / 2 + 'px',
					'--x':
						getDotPositionX(angle * index, circleSize / 2) - dotSize / 2 + 'px',
				} as React.CSSProperties
			}
		>
			<span
				className={classes.segment}
				style={
					{
						'--rotate': 0 - getRotateAngle(activeSegment, segmentCount) + 'deg',
					} as React.CSSProperties
				}
			>
				{index + 1}
				<div className={classes.group}>{area}</div>
			</span>
		</div>
	)
}
