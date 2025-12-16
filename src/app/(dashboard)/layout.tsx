import Sidebar from '@/shared/components/Sidebar'

interface DashboardLayoutProps {
	children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	return <Sidebar>{children}</Sidebar>
}
