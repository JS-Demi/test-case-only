import { FC } from 'react'

import classes from './description.module.scss'

interface IDescription {
	readonly year: number
	readonly text: string
}

export const Description: FC<IDescription> = ({ year, text }) => {
	return (
		<div className={classes.description}>
			<p className={classes.year}>{year}</p>
			<p className={classes.text}>{text}</p>
		</div>
	)
}
