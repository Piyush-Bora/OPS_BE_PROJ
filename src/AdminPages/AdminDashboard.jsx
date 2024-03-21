import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

export const AdminDashboard = () => {
	return (
		<>
			<div className='min-h-full flex relative max-w-screen'>
				{/* Sidebar */}
				<div className='sticky left-0 top-0 bottom-0 flex h-screen w-72 flex-col overflow-hidden rounded-r-2xl bg-gray-700 text-white min-w-max'>
					<h1 className='mt-10 mx-10 text-3xl font-bold'>Hola Admin!</h1>
					<ul className='mt-20 space-y-3'>
						<NavLink
							to={`/admin.dashboard`}
							className={({ isActive }) =>
								isActive && "font-bold text-white italic"
							}
						>
							<li className='relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600'>
								<span>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-6 w-6'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										strokeWidth='2'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
										/>
									</svg>
								</span>
								<span className=''>Show Created Tests</span>
							</li>
						</NavLink>

						<NavLink
							to={`/admin.dashboard/createTest`}
							className={({ isActive }) =>
								isActive && "font-bold text-white italic"
							}
						>
							<li className='relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600'>
								<span>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-6 w-6'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										strokeWidth='2'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
										/>
									</svg>
								</span>
								<span className=''>Create Test</span>
							</li>
						</NavLink>

						<NavLink
							to={`/admin.dashboard/availableTests`}
							className={({ isActive }) =>
								isActive && "font-bold text-white italic"
							}
						>
							<li className='relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600'>
								<span>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-6 w-6'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
										strokeWidth='2'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
										/>
									</svg>
								</span>
								<span className=''>Available Tests</span>
							</li>
						</NavLink>
					</ul>

					<div className='my-6 mt-auto ml-10 flex cursor-pointer'>
						<div>
							<img
								className='h-12 w-12 rounded-full'
								alt='profile'
								src='https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
							/>
						</div>
						<div className='ml-3'>
							<p className='font-medium'>Palmer</p>
							<p className='text-sm text-gray-300'>Kiev, Ukraine</p>
						</div>
					</div>
				</div>
				{/* Sidebar */}

				<main className='flex-grow py-6'>
					<Outlet />
				</main>
			</div>
		</>
	);
};
