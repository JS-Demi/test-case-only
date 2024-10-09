export function getRotateAngle(position: number, count: number) {
	return (360 / count) * -position
}
