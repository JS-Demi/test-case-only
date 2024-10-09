import { create } from 'zustand'

import { ISegment } from 'shared/types'

type State = {
	activeSegment: ISegment
}
type Action = {
	setActiveSegment: (value: ISegment) => void
	incrementActiveSegment: () => void
	decrementActiveSegment: () => void
}

export const useSegmentStore = create<State & Action>()((set, get) => ({
	activeSegment: 1,
	setActiveSegment: (value) => set({ activeSegment: value }),
	incrementActiveSegment: () =>
		set({ activeSegment: (get().activeSegment + 1) as ISegment }),
	decrementActiveSegment: () =>
		set({ activeSegment: (get().activeSegment - 1) as ISegment }),
}))
