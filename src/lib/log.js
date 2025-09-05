export default function log(payload) {
	const res = fetch('/api/log', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			payload: payload,
		}),
	})
}
