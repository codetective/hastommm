import { useState } from 'react'
import { Box, Container, useBreakpointValue } from '@chakra-ui/react'

import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import { BrowserRouter } from 'react-router-dom'

const smVariant = { navigation: 'drawer', navigationButton: true }
const mdVariant = { navigation: 'sidebar', navigationButton: false }

export default function Layout ({ children }) {
	const [isSidebarOpen, setSidebarOpen] = useState(false)
	const variants = useBreakpointValue({ base: smVariant, md: mdVariant })

	const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

	return (
		<>
			<BrowserRouter>
				<Sidebar
					variant={variants?.navigation}
					isOpen={isSidebarOpen}
					onClose={toggleSidebar}
				/>
				<Box ml={!variants?.navigationButton && '250px'}>
					<Container maxW='container.xl' px={[1, 12]}  bg="#fefefe">
						<Header
							showSidebarButton={variants?.navigationButton}
							onShowSidebar={toggleSidebar}
						/>
					</Container>

					<Container maxW='container.xl' pt='5'>
						<Box px={[1, 12]}>

							{children}
						</Box>
					</Container>
				</Box>
			</BrowserRouter>
		</>
	)
}
