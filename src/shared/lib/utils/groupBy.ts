import { ISegment } from 'shared/types'

export const groupBy = <T>(data: T[], key: keyof T) => {
	const grouped = data.reduce(
		(acc, curr) => {
			const k = curr[key] as string
			acc[k] = [...(acc[k] || []), curr]
			return acc
		},
		{} as Record<string, T[]>
	)
	const keys = Object.keys(grouped)
	const result = new Map() as Map<ISegment, T[]>
	keys.forEach((key, idx) => {
		result.set((idx + 1) as ISegment, grouped[key])
	})
	return result
}
