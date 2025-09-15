'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import LogoutButton from '@/auth/presentation/components/ui/LogoutButton.jsx'

export default function DashboardHeader() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const pathname = usePathname()

	// Mock user data - replace with real user context/state
	const user = {
		name: 'John Doe',
		email: 'john@example.com',
		avatar: '/api/placeholder/32/32', // Replace with real avatar URL
	}

	const navigation = [
		{ name: 'Dashboard', href: '/dashboard' },
		{ name: 'Accounts', href: '/accounts' },
		{ name: 'Balances', href: '/balances' },
		{ name: 'Reports', href: '/reports' },
	]

	return (
		<header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Left: Logo + Navigation */}
					<div className="flex items-center space-x-8">
						{/* Logo */}
						<Link href="/dashboard" className="flex items-center">
							<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-sm">
									MA
								</span>
							</div>
							<span className="ml-2 text-xl font-bold text-gray-900">
								MyApp
							</span>
						</Link>

						{/* Navigation */}
						<nav className="hidden md:flex space-x-1">
							{navigation.map(item => (
								<Link
									key={item.name}
									href={item.href}
									className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
										pathname === item.href
											? 'bg-blue-100 text-blue-700'
											: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
									}`}
								>
									{item.name}
								</Link>
							))}
						</nav>
					</div>

					{/* Right: Search + Notifications + User Menu */}
					<div className="flex items-center space-x-4">
						{/* Search */}
						<div className="hidden md:block">
							<input
								type="text"
								placeholder="Search..."
								className="w-64 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>

						{/* Notifications */}
						<button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full">
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
								/>
							</svg>
						</button>

						{/* User Dropdown */}
						<div className="relative">
							<button
								onClick={() =>
									setIsDropdownOpen(!isDropdownOpen)
								}
								className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<img
									src={user.avatar}
									alt={user.name}
									className="w-8 h-8 rounded-full bg-gray-300"
								/>
								<svg
									className="w-4 h-4 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>

							{/* Dropdown Menu */}
							{isDropdownOpen && (
								<div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10">
									<div className="px-4 py-2 border-b border-gray-100">
										<p className="text-sm font-medium text-gray-900">
											{user.name}
										</p>
										<p className="text-sm text-gray-500">
											{user.email}
										</p>
									</div>

									<Link
										href="/profile"
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										onClick={() => setIsDropdownOpen(false)}
									>
										Your Profile
									</Link>

									<Link
										href="/settings"
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										onClick={() => setIsDropdownOpen(false)}
									>
										Settings
									</Link>

									<hr className="my-1" />

									<div className="px-4 py-2">
										<LogoutButton className="w-full text-left bg-transparent text-red-600 hover:bg-red-50 px-0 py-0 text-sm font-normal">
											Sign out
										</LogoutButton>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			<div className="md:hidden border-t border-gray-200 bg-white">
				<nav className="flex space-x-1 px-4 py-2">
					{navigation.map(item => (
						<Link
							key={item.name}
							href={item.href}
							className={`px-3 py-2 rounded-md text-xs font-medium ${
								pathname === item.href
									? 'bg-blue-100 text-blue-700'
									: 'text-gray-600'
							}`}
						>
							{item.name}
						</Link>
					))}
				</nav>
			</div>
		</header>
	)
}
