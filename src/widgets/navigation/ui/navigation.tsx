import clsx from 'clsx'
import { FC } from 'react'

import { useSegmentStore } from 'shared/model'

import classes from './navigation.module.scss'

interface INavigation {
	readonly segmentCount: number
}

export const Navigation: FC<INavigation> = ({ segmentCount }) => {
	const incrementActiveSegment = useSegmentStore(
		(state) => state.incrementActiveSegment
	)
	const decrementActiveSegment = useSegmentStore(
		(state) => state.decrementActiveSegment
	)
	const activeSegment = useSegmentStore((state) => state.activeSegment)
	return (
		<div className={classes.navigation}>
			<p>{`${'0' + activeSegment}/${'0' + segmentCount}`}</p>
			<div className={classes.arrows}>
				<button
					onClick={decrementActiveSegment}
					disabled={activeSegment === 1}
					className={clsx(classes.arrow, classes.arrow_prev)}
				/>
				<button
					onClick={incrementActiveSegment}
					disabled={activeSegment === segmentCount}
					className={clsx(classes.arrow, classes.arrow_next)}
				/>
			</div>
		</div>
	)
}
