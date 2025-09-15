import DashboardHeader from '@/shared/components/DashboardHeader.jsx'

export default function DashboardLayout({ children }) {
	return (
		<div className="min-h-screen bg-gray-50">
			<DashboardHeader />

			<main className="pt-16">{children}</main>
		</div>
	)
}
