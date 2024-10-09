export const getDotPositionX = (angle: number, radius: number) =>
	Math.cos(angle) * radius + radius
export const getDotPositionY = (angle: number, radius: number) =>
	Math.sin(angle) * radius + radius
