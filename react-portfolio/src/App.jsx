import { motion, useMotionValue, useTransform, useScroll, useSpring } from 'framer-motion'
import logo from './Logo.jpg'
import { useEffect, useState } from 'react'

const projects = [
	{
		title: 'C Drive Locker',
		tag: 'Security',
		summary: 'Secure local drive access with encryption and quick unlock.',
		tech: ['Java', 'Security', 'Desktop'],
		image: '/C Drive Locker/OIP.webp', // Corrected path
		details: 'Encrypts and password-protects sensitive folders with recovery and audit logging.',
		images: ['/C Drive Locker/OIP.webp'], // Corrected path
	},
	{
		title: 'Chat Application',
		tag: 'Realtime',
		summary: 'Messaging with typing indicators and media sharing.',
		tech: ['Node', 'WebSockets', 'MongoDB'],
		image: '/Chat App/Chat.jpg', // Corrected path
		details: 'Realtime sockets, presence, read receipts, and file uploads with CDN.',
		images: ['/Chat App/Chat.jpg'], // Corrected path
	},
	{
		title: 'EOD Report Analyzer',
		tag: 'Analytics',
		summary: 'Automates end‑of‑day data parsing, visualization, and insights.',
		tech: ['Python', 'SQL', 'Charts'],
		image: '/mds/Screenshot%202025-08-28%20144610.jpg',
		details: 'Parses CSV/Excel EOD reports, aggregates KPIs, and renders trend charts with exportable insights.',
		images: [
			'/mds/Screenshot%202025-08-28%20144646.jpg',
			'/mds/Screenshot%202025-08-28%20144550.jpg',
			'/mds/Screenshot%202025-08-28%20144610.jpg',
		],
	},
	{
		title: 'MDS Solutions',
		tag: 'Web',
		summary: 'Corporate website and product showcase with premium motion.',
		tech: ['React', 'Tailwind', 'GSAP'],
		image: '/mds/Screenshot%202025-08-28%20144646.jpg',
		details: 'Built a fast, responsive site for MDS Solutions with scroll-driven sections, product highlights, and lead capture.',
		images: [
			'/mds/Screenshot%202025-08-28%20144646.jpg',
			'/mds/Screenshot%202025-08-28%20144610.jpg',
			'/mds/Screenshot%202025-08-28%20144550.jpg',
		],
	},
	{
		title: 'Library Management System',
		tag: 'CRUD',
		summary: 'Lending workflows and reports for collections.',
		tech: ['PostgreSQL', 'Express', 'React'],
		image: '/lms/xfsdafdsafsaf.png',
		details: 'Manages books, borrowers, lending policies, and analytics dashboards.',
		images: ['/lms/xfsdafdsafsaf.png'],
	},
]

const skills = [
	'Python',
	'Java',
	'JavaScript',
	'TypeScript',
	'C++',
	'C#',
	'Go',
	'Rust',
	'SQL',
	'PostgreSQL',
	'MySQL',
	'MongoDB',
	'SQLite',
	'Redis',
	'HTML5',
	'CSS3',
	'Sass',
	'TailwindCSS',
	'React',
	'Next.js',
	'Node.js',
	'Express',
	'Vite',
	'Webpack',
	'Docker',
	'GitHub Actions',
	'AWS',
	'Vercel',
	'Netlify',
	'AI Prompting',
	'OpenAI API',
	'LangChain',
	'TensorFlow',
	'PyTorch',
	'Figma',
	'Photoshop',
	'Illustrator',
	'After Effects',
	'Premiere Pro',
	'DaVinci Resolve',
	'Blender',
	'GSAP',
	'ScrollTrigger',
	'Three.js',
	'WebGL',
	'Framer Motion',
]

function Badge({ children }) {
	return (
		<motion.span
			initial={{ y: 12, opacity: 0 }}
			whileInView={{ y: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 0.35 }}
			className="inline-flex items-center gap-2 rounded-full border border-slate-800/70 bg-slate-900/60 px-3 py-2 text-sm"
		>
			<span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
			{children}
		</motion.span>
	)
}

function TiltCard({ children }) {
	const x = useMotionValue(0)
	const y = useMotionValue(0)
	const rotateX = useTransform(y, [-50, 50], [6, -6])
	const rotateY = useTransform(x, [-50, 50], [-6, 6])
	return (
		<motion.div
			style={{ rotateX, rotateY, transformPerspective: 800 }}
			onMouseMove={(e) => {
				const r = e.currentTarget.getBoundingClientRect()
				x.set(e.clientX - (r.left + r.width / 2))
				y.set(e.clientY - (r.top + r.height / 2))
			}}
			onMouseLeave={() => {
				x.set(0)
				y.set(0)
			}}
			className="glow"
		>
			{children}
		</motion.div>
	)
}

function Icon({ name, className }) {
	const common = {
		fill: 'none',
		stroke: 'currentColor',
		strokeWidth: 1.6,
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
	}
	return name === 'laptop' ? (
		<svg className={className} viewBox="0 0 24 24">
			<rect {...common} x="3" y="4" width="18" height="12" rx="2" />
			<path {...common} d="M2 18h20" />
		</svg>
	) : name === 'spark' ? (
		<svg className={className} viewBox="0 0 24 24">
			<path {...common} d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
		</svg>
	) : name === 'server' ? (
		<svg className={className} viewBox="0 0 24 24">
			<rect {...common} x="3" y="5" width="18" height="6" rx="2" />
			<rect {...common} x="3" y="13" width="18" height="6" rx="2" />
			<path {...common} d="M7 8h0M7 16h0" />
		</svg>
	) : name === 'cube' ? (
		<svg className={className} viewBox="0 0 24 24">
			<path {...common} d="M12 2l8 4v12l-8 4-8-4V6z" />
			<path {...common} d="M12 22V12l8-4" />
			<path {...common} d="M12 12L4 8" />
		</svg>
	) : name === 'cloud' ? (
		<svg className={className} viewBox="0 0 24 24">
			<path {...common} d="M7 18a4 4 0 010-8 5 5 0 019.6-1.4A4 4 0 1117 18H7z" />
		</svg>
	) : (
		<svg className={className} viewBox="0 0 24 24">
			<circle {...common} cx="12" cy="12" r="9" />
		</svg>
	)
}

export default function App() {
	const [loading, setLoading] = useState(true)
	const { scrollYProgress } = useScroll()
	const progressX = useSpring(scrollYProgress, {
		stiffness: 120,
		damping: 30,
		mass: 0.2,
	})
	const [active, setActive] = useState(null)
	const [galleryIndex, setGalleryIndex] = useState(0)

	const getSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
	const openProject = (p) => {
		setActive(p)
		setGalleryIndex(0)
		const slug = getSlug(p.title)
		const url = new URL(window.location.href)
		url.hash = `#project-${slug}`
		window.history.pushState({}, '', url)
	}
	const closeProject = () => {
		setActive(null)
		const url = new URL(window.location.href)
		url.hash = ''
		window.history.pushState({}, '', url)
	}
	useEffect(() => {
		const t = setTimeout(() => setLoading(false), 1200)
		const onMove = (e) => {
			const x = e.clientX / window.innerWidth
			const y = e.clientY / window.innerHeight
			document.documentElement.style.setProperty('--mx', x)
			document.documentElement.style.setProperty('--my', y)
		}
		window.addEventListener('pointermove', onMove)
		const onKey = (e) => {
			if (!active) return
			if (e.key === 'Escape') closeProject()
			if (e.key === 'ArrowRight') setGalleryIndex((i) => (i + 1) % (active.images?.length || 1))
			if (e.key === 'ArrowLeft') setGalleryIndex((i) => (i - 1 + (active.images?.length || 1)) % (active.images?.length || 1))
		}
		window.addEventListener('keydown', onKey)
		const onPop = () => {
			if (!location.hash.startsWith('#project-')) setActive(null)
		}
		window.addEventListener('popstate', onPop)
		// open from hash
		const hash = window.location.hash
		if (hash.startsWith('#project-')) {
			const slug = hash.replace('#project-', '')
			const p = projects.find((pr) => getSlug(pr.title) === slug)
			if (p) setActive(p)
		}
		return () => {
			clearTimeout(t)
			window.removeEventListener('pointermove', onMove)
			window.removeEventListener('keydown', onKey)
			window.removeEventListener('popstate', onPop)
		}
	}, [])
	return (
		<div className="min-h-dvh bg-slate-950 bg-grid text-slate-100">
			{/* Scroll progress bar */}
			<motion.div
				style={{ scaleX: progressX }}
				className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left bg-gradient-to-r from-indigo-500 to-cyan-400"
			/>
			{/* Opening loader */}
			<motion.div
				initial={{ opacity: 1 }}
				animate={{ opacity: loading ? 1 : 0 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
				className={`fixed inset-0 z-50 grid place-items-center bg-slate-950 ${loading ? '' : 'pointer-events-none'}`}
			>
				<div className="w-64">
					<div className="mb-3 text-center text-sm tracking-widest text-slate-300">WORXELITE</div>
					<motion.div className="h-2 w-full overflow-hidden rounded-full border border-slate-800 bg-slate-900">
						<motion.div
							initial={{ width: '0%' }}
							animate={{ width: loading ? '100%' : '100%' }}
							transition={{ duration: 1.0, ease: 'easeInOut' }}
							className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
						/>
					</motion.div>
				</div>
			</motion.div>

			{/* Page fade-in */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: loading ? 0 : 1, y: loading ? 10 : 0 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
			>
				{/* Floating background blobs */}
				<div className="pointer-events-none fixed -left-24 top-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl float-slow" />
				<div className="pointer-events-none fixed -right-24 top-1/3 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl float-fast" />
				{/* Header */}
				<header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/70 backdrop-blur">
					<div className="container flex items-center justify-between py-4">
						<a href="/" className="flex items-center gap-3" aria-label="WORXELITE Home">
							<img
								src={logo}
								alt="WORXELITE logo"
								className="h-8 w-auto shrink-0 object-contain sm:h-9"
							/>
							<span className="font-semibold tracking-tight">WORXELITE</span>
						</a>
						<nav className="hidden gap-6 text-sm md:flex">
							{['projects', 'skills', 'about', 'contact'].map((id) => (
								<a
									key={id}
									href={`#${id}`}
									className="text-slate-400 transition-colors hover:text-white"
								>
									{id.charAt(0).toUpperCase() + id.slice(1)}
								</a>
							))}
						</nav>
					</div>
				</header>

				{/* Hero */}
				<section id="home" className="section-sep relative">
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(99,102,241,0.14),transparent_70%)]" />
					<div className="container grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="space-y-6"
						>
							<p className="text-sm font-medium uppercase tracking-widest text-indigo-400">
								Creative Engineering
							</p>
							<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
								We Craft Your Imagination Into Reality.
							</h1>
							<p className="text-slate-300">
								WORXELITE blends software engineering, AI, and design to ship polished web apps, sites, and tools.
							</p>
							<div className="flex flex-wrap gap-3">
								<a
									href="#projects"
									className="rounded-2xl bg-indigo-600 px-5 py-3 text-white shadow transition-colors hover:bg-indigo-500"
								>
									See work
								</a>
								<a
									href="#contact"
									className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-3 shadow transition-shadow hover:shadow-md"
								>
									Get in touch
								</a>
							</div>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.1, duration: 0.6 }}
							className="relative"
						>
							<div className="mx-auto h-48 w-48 overflow-hidden rounded-3xl border border-slate-800 shadow-2xl sm:h-56 sm:w-56">
								<img
									src={logo}
									alt="Brand"
									className="h-full w-full object-contain"
								/>
							</div>
							<div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-3xl bg-indigo-500/10 blur-2xl" />
						</motion.div>
					</div>
				</section>

				{/* Offerings */}
				<section id="offerings" className="section-sep py-16 md:py-24">
					<div className="container">
						<h2 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">What we do</h2>
						<div className="grid gap-6 md:grid-cols-3">
							{[
								{
									title: 'Web Apps',
									icon: 'laptop',
									desc: 'High‑performance React/Next.js builds with great UX.',
								},
								{
									title: 'AI Integrations',
									icon: 'spark',
									desc: 'Chat, agents, and workflows powered by modern LLMs.',
								},
								{
									title: 'APIs & Backends',
									icon: 'server',
									desc: 'Type‑safe Node/Express services and DB modeling.',
								},
								{
									title: 'Design & Motion',
									icon: 'spark',
									desc: 'Premium UI kits, GSAP/Framer animations, micro‑interactions.',
								},
								{
									title: '3D & Graphics',
									icon: 'cube',
									desc: 'Three.js/WebGL scenes, particles, and shaders.',
								},
								{
									title: 'Deploy & Optimize',
									icon: 'cloud',
									desc: 'CI/CD, caching, observability, and Core Web Vitals.',
								},
							].map((c, i) => (
								<TiltCard key={c.title}>
									<motion.div
										initial={{ opacity: 0, y: 16 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: i * 0.04, duration: 0.45 }}
										className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm transition-transform hover:-translate-y-1"
									>
										<div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-400/20 ring-1 ring-inset ring-slate-800">
											<Icon name={c.icon} className="h-5 w-5 text-indigo-400" />
										</div>
										<h3 className="text-lg font-semibold">{c.title}</h3>
										<p className="mt-1 text-sm text-slate-300">{c.desc}</p>
									</motion.div>
								</TiltCard>
							))}
						</div>
					</div>
				</section>

				{/* Projects */}
				<section id="projects" className="section-sep py-16 md:py-24">
					<div className="container">
						<h2 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">Featured Projects</h2>
						<div className="grid gap-6 md:grid-cols-3">
							{projects.map((p, idx) => (
								<TiltCard key={p.title}>
									<motion.button
										onClick={() => openProject(p)}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: idx * 0.05, duration: 0.5 }}
										className="group w-full text-left overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-sm transition-transform hover:-translate-y-1 focus:outline-none"
									>
										<div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
											<img
												src={p.image}
												alt={p.title}
												className="absolute inset-0 h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
											/>
										</div>
										<div className="space-y-1 p-5">
											<div className="flex items-center justify-between">
												<span className="text-xs uppercase tracking-widest text-indigo-400">
													{p.tag}
												</span>
											</div>
											<h3 className="text-lg font-semibold">{p.title}</h3>
											<p className="text-sm text-slate-300">{p.summary}</p>
											<div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-400">
												{p.tech.map((t) => (
													<span
														key={t}
														className="rounded-xl border border-slate-800 px-2 py-1"
													>
														{t}
													</span>
												))}
											</div>
										</div>
									</motion.button>
								</TiltCard>
							))}
						</div>
					</div>
				</section>

				{/* Project Modal */}
				{active && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/70 p-4 backdrop-blur"
					>
						<div className="max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
							<div className="flex items-center justify-between border-b border-slate-800 p-4">
								<div>
									<div className="text-sm uppercase tracking-widest text-indigo-400">
										{active.tag}
									</div>
									<h3 className="text-xl font-semibold">{active.title}</h3>
								</div>
								<button
									onClick={closeProject}
									className="rounded-xl border border-slate-700 px-3 py-1 text-sm text-slate-300 hover:bg-slate-800"
								>
									Close
								</button>
							</div>
							<div className="grid gap-4 p-4 md:grid-cols-2">
								<div className="flex flex-col">
									<div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-xl">
										<img
											loading="lazy"
											src={active.images[galleryIndex]}
											alt={`Preview ${galleryIndex + 1}`}
											className="absolute inset-0 h-full w-full object-cover"
										/>
										<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent" />
									</div>
									<div className="flex gap-2 overflow-x-auto pb-1">
										{active.images.map((src, i) => (
											<button
												key={src}
												onClick={() => setGalleryIndex(i)}
												className={`h-16 w-24 shrink-0 overflow-hidden rounded-md border ${
													i === galleryIndex
														? 'border-indigo-500'
														: 'border-slate-800'
												}`}
											>
												<img
													src={src}
													alt={`thumb ${i + 1}`}
													className="h-full w-full object-cover"
												/>
											</button>
										))}
									</div>
								</div>
								<div className="flex flex-col">
									<p className="text-slate-300">{active.details}</p>
									<div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
										{active.tech.map((t) => (
											<span
												key={t}
												className="rounded-xl border border-slate-800 px-2 py-1"
											>
												{t}
											</span>
										))}
									</div>
									<a
										href="#contact"
										className="mt-5 inline-block self-start rounded-2xl bg-indigo-600 px-5 py-3 text-white shadow transition-colors hover:bg-indigo-500"
									>
										Request demo
									</a>
								</div>
							</div>
						</div>
					</motion.div>
				)}

				{/* Testimonials */}
				<section id="testimonials" className="section-sep py-16 md:py-24">
					<div className="container">
						<h2 className="mb-8 text-3xl font-bold tracking-tight sm:text-4xl">
							What clients say
						</h2>
						<div className="grid gap-6 md:grid-cols-3">
							{[
								{
									name: 'Ananya Gupta',
									quote: 'Professional, fast and data-driven. We hit profitability in month two.',
								},
								{
									name: 'Rahul Verma',
									quote: 'The new landing doubled trials. Clear copy + clean design.',
								},
								{
									name: 'Priya Shah',
									quote: 'Loved the brand kit. Everything feels consistent and premium.',
								},
							].map((t, i) => (
								<motion.div
									key={t.name}
									initial={{ opacity: 0, y: 16 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.05, duration: 0.45 }}
									className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm"
								>
									<p className="mb-4 text-slate-300">“{t.quote}”</p>
									<div className="text-sm font-medium">{t.name}</div>
									<div className="text-xs text-slate-400">{t.role}</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Skills (sliding only) */}
				<section id="skills" className="section-sep py-16 md:py-24">
					<div className="container">
						<h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Skills</h2>
						<div className="relative overflow-hidden rounded-2xl border border-slate-800">
							<div className="animate-[marquee_18s_linear_infinite] whitespace-nowrap py-4 text-slate-300">
								{[
									'Python',
									'Java',
									'JavaScript',
									'TypeScript',
									'SQL',
									'PostgreSQL',
									'MongoDB',
									'React',
									'Next.js',
									'Node.js',
									'Express',
									'TailwindCSS',
									'GSAP',
									'Framer Motion',
									'Three.js',
									'WebGL',
									'AWS',
									'Docker',
									'GitHub Actions',
									'SEO',
									'UX',
									'UI',
									'Design Systems',
									'Figma',
									'Photoshop',
								]
									.flatMap((s) => [s, s])
									.map((s, i) => (
										<span key={'skills-' + i} className="mx-6">
											{s}
										</span>
									))}
							</div>
						</div>
					</div>
				</section>

				{/* About */}
				<section id="about" className="section-sep py-16 md:py-24">
					<div className="container grid gap-10 md:grid-cols-2">
						<div>
							<h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">About</h2>
							<p className="text-slate-300">
								We design and build interactive interfaces with a focus on motion and performance. We enjoy
								turning complex problems into elegant, tactile experiences.
							</p>
							<div className="mt-6 grid grid-cols-2 gap-4 text-sm">
								{[
									['6+ yrs', 'Experience'],
									['30+', 'Projects'],
									['12', 'Awards'],
									['100ms', 'Perf Target'],
								].map(([a, b]) => (
									<div key={a} className="rounded-2xl border border-slate-800 p-4">
										<div className="text-2xl font-semibold">{a}</div>
										<div className="text-slate-400">{b}</div>
									</div>
								))}
							</div>
						</div>
						<div className="space-y-4">
							<div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
								<h3 className="mb-2 text-lg font-semibold">Core Skills</h3>
								<div className="flex flex-wrap gap-2 text-sm text-slate-300">
									{['React', 'Next.js', 'GSAP', 'Three.js', 'Design Systems', 'SEO'].map((s) => (
										<span
											key={s}
											className="rounded-xl border border-slate-800 px-3 py-1"
										>
											{s}
										</span>
									))}
								</div>
							</div>
							<div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
								<h3 className="mb-2 text-lg font-semibold">Certifications</h3>
								<ul className="list-disc pl-5 text-sm text-slate-300">
									<li>AWS Certified Developer – Associate</li>
									<li>Microsoft Certified: Azure Developer Associate</li>
									<li>Google Cloud Certified – Professional Cloud Architect</li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				{/* Contact */}
				<section id="contact" className="relative py-16 md:py-24">
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_100%,rgba(99,102,241,0.12),transparent_70%)]" />
					<div className="container">
						<div className="mb-8 text-center">
							<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
								Let's build something
							</h2>
							<p className="mx-auto mt-2 max-w-2xl text-slate-300">
								Tell us about your goals. We'll reply within 24 hours with next steps and a rough quote.
							</p>
						</div>
						<div className="grid gap-8 md:grid-cols-3">
							<div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
								<div className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-400">
									Contact
								</div>
								<a
									href="mailto:worxelite@gmail.com"
									className="mb-2 flex items-center gap-2 text-slate-200 hover:underline"
								>
									worxelite@gmail.com
								</a>
								<a
									href="tel:+91 - 7252992003, +91 - 7017320729"
									className="mb-6 flex items-center gap-2 text-slate-200 hover:underline"
								>
									+91- 7252992003, +91- 7017320729
								</a>
							</div>
							<form
								action="https://formspree.io/f/xyzdzqkr" // Replace with your Formspree form ID
								method="POST"
								className="relative md:col-span-2 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl"
							>
								<div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
								<div className="grid gap-4 sm:grid-cols-2">
									<div className="flex flex-col gap-2">
										<label className="text-sm">Name</label>
										<input
											placeholder="Your full name"
											name="name" // Changed name attribute
											required
											className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 outline-none ring-indigo-500 focus:ring-2"
										/>
									</div>
									<div className="flex flex-col gap-2">
										<label className="text-sm">Email</label>
										<input
											placeholder="you@domain.com"
											type="email"
											name="email"
											required
											className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 outline-none ring-indigo-500 focus:ring-2"
										/>
									</div>
									<div className="flex flex-col gap-2">
										<label className="text-sm">Phone</label>
										<input
											placeholder="+91-"
											type="tel"
											name="phone"
											className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 outline-none ring-indigo-500 focus:ring-2"
										/>
									</div>
								</div>
								<div className="mt-4 flex flex-col gap-2">
									<label className="text-sm">Project Details</label>
									<textarea
										placeholder="Tell us about the goals, timeline, and any links"
										name="message"
										rows="6"
										required
										className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 outline-none ring-indigo-500 focus:ring-2"
									/>
								</div>
								<div className="mt-6 flex items-center justify-between">
									<p className="text-xs text-slate-400">
										By sending, you agree to be contacted about this inquiry.
									</p>
									<button
										type="submit"
										className="rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-3 text-white shadow transition-transform hover:translate-y-[-1px]"
									>
										Send inquiry
									</button>
								</div>
							</form>
						</div>
					</div>
				</section>

				{/* Footer */}
				<footer className="border-t border-slate-800 py-10 text-sm">
					<div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
						<div>© {new Date().getFullYear()} WORXELITE. All rights reserved.</div>
						<div className="flex items-center gap-4">
							<a
								href="mailto:worxelite@gmail.com"
								className="hover:underline"
							>
								Email
							</a>
							<a href="#" className="hover:underline">
								LinkedIn
							</a>
						</div>
					</div>
				</footer>

				{/* Bottom CTA */}
				<section className="py-10">
					<div className="container">
						<div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-indigo-600/20 to-cyan-400/10 p-8 text-center">
							<h3 className="text-2xl font-semibold">
								Ready to build something exceptional?
							</h3>
							<p className="mt-2 text-slate-300">
								Let’s craft a product that feels fast, polished, and alive.
							</p>
							<a
								href="#contact"
								className="mt-5 inline-block rounded-2xl bg-indigo-600 px-5 py-3 text-white shadow transition-colors hover:bg-indigo-500"
							>
								Start a project
							</a>
						</div>
					</div>
				</section>
			</motion.div>
		</div>
	)
}

/* Tailwind keyframes for marquee */
// eslint-disable-next-line no-unused-vars
const marquee = `@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`
