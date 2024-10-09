import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { FC, useEffect, useState } from 'react'
import { useRef } from 'react'

import classes from './yearRange.module.scss'

gsap.registerPlugin(useGSAP)

interface IYearRange {
	readonly rangeStart: number
	readonly rangeEnd: number
}

export const YearRange: FC<IYearRange> = ({ rangeEnd, rangeStart }) => {
	const usePrevious = (value: number) => {
		const ref = useRef(value)
		useEffect(() => {
			ref.current = value
		}, [value])
		return ref.current
	}
	const previousStart = usePrevious(rangeStart)
	const previousEnd = usePrevious(rangeEnd)
	const ranges = {
		start: previousStart,
		end: previousEnd,
	}
	const tl = gsap.timeline({ defaults: { duration: 0.5 } })
	const [startRange, setStartRange] = useState(ranges.start)
	const [endRange, setEndRange] = useState(ranges.end)
	const container = useRef(null)
	useGSAP(() => {
		tl.to(ranges, {
			start: rangeStart,
			end: rangeEnd,
			onUpdate: () => {
				setStartRange(Math.round(ranges.start))
				setEndRange(Math.round(ranges.end))
			},
		})
	}, [rangeEnd, rangeStart])
	return (
		<div ref={container} className={classes.range}>
			<span id="startRange" className={classes.startRange}>
				{startRange}
			</span>
			<span id="endRange" className={classes.endRange}>
				{endRange}
			</span>
		</div>
	)
}
