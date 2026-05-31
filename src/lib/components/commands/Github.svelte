<script lang="ts">
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme';

	// Props to receive terminal entry (containing input arguments)
	let { entry }: { entry?: any } = $props();

	// State variables
	let loading = $state(true);
	let error = $state(false);
	let offlineMode = $state(false);
	let activeTab = $state<'overview' | 'languages'>('overview');

	// GitHub user details
	let profile = $state<{
		login: string;
		name: string;
		avatarUrl: string;
		bio: string;
		location: string;
		company: string;
		publicRepos: number;
		followers: number;
		following: number;
	} | null>(null);

	let stats = $state({
		stars: 0,
		forks: 0,
		commits: 248, // Fallback/Default
		streak: 15,
		rank: 'A+'
	});

	let topLanguages = $state<{ name: string; percentage: number; color: string }[]>([]);
	let contributionData = $state<{ date: string; count: number; level: number }[]>([]);
	let totalContributions = $state(0);

	// Tooltip state for contribution graph
	let hoverDay = $state<{ date: string; count: number; level: number } | null>(null);

	// Parse username from terminal command (e.g., "github udean777" -> "Udean777")
	const commandStr = entry?.command || 'github';
	const parts = commandStr.trim().split(/\s+/);
	const targetUsername = parts[1] || 'Udean777';

	// Presets for popular languages
	const languageColors: Record<string, string> = {
		svelte: '#ff3e00',
		typescript: '#3178c6',
		javascript: '#f7df1e',
		dart: '#00b4ab',
		flutter: '#02569b',
		html: '#e34c26',
		css: '#563d7c',
		rust: '#dea584',
		python: '#3572a5',
		go: '#00add8'
	};

	// Deterministic random numbers based on a string seed (for realistic mock data)
	function createSeededRandom(seedStr: string) {
		let h = 0;
		for (let i = 0; i < seedStr.length; i++) {
			h = (Math.imul(31, h) + seedStr.charCodeAt(i)) | 0;
		}
		return function () {
			let t = (h += 0x6d2b79f5);
			t = Math.imul(t ^ (t >>> 15), t | 1);
			t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}

	// Generate highly realistic mock contribution graph
	function generateMockContributions(username: string) {
		const data: { date: string; count: number; level: number }[] = [];
		const today = new Date();
		const oneYearAgo = new Date();
		oneYearAgo.setDate(today.getDate() - 370); // 53 weeks approx

		const rand = createSeededRandom(username);
		let total = 0;
		let currentStreak = 0;
		let maxStreak = 0;

		for (let i = 0; i <= 370; i++) {
			const currentDate = new Date(oneYearAgo);
			currentDate.setDate(oneYearAgo.getDate() + i);

			const dateStr = currentDate.toISOString().split('T')[0];
			const dayOfWeek = currentDate.getDay(); // 0: Sunday, 6: Saturday

			// Lower activity on weekends
			const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
			const activityThreshold = isWeekend ? 0.88 : 0.45;

			let count = 0;
			let level = 0;

			if (rand() > activityThreshold) {
				const r = rand();
				if (r < 0.6) {
					count = Math.floor(rand() * 3) + 1; // 1-3
					level = 1;
				} else if (r < 0.85) {
					count = Math.floor(rand() * 4) + 4; // 4-7
					level = 2;
				} else if (r < 0.96) {
					count = Math.floor(rand() * 6) + 8; // 8-13
					level = 3;
				} else {
					count = Math.floor(rand() * 10) + 14; // 14-23
					level = 4;
				}
				currentStreak++;
				if (currentStreak > maxStreak) maxStreak = currentStreak;
			} else {
				currentStreak = 0;
			}

			total += count;
			data.push({ date: dateStr, count, level });
		}

		return { contributions: data, total, streak: maxStreak };
	}

	// Fetch data from GitHub API
	async function loadGitHubData() {
		try {
			// Step 1: Fetch Profile
			const profileRes = await fetch(`https://api.github.com/users/${targetUsername}`);
			if (!profileRes.ok) throw new Error('Failed to fetch profile');
			const rawProfile = await profileRes.json();

			profile = {
				login: rawProfile.login,
				name: rawProfile.name || rawProfile.login,
				avatarUrl: rawProfile.avatar_url,
				bio: rawProfile.bio || 'Modern Web & Mobile Architect',
				location: rawProfile.location || 'Indonesia',
				company: rawProfile.company || 'Freelancer',
				publicRepos: rawProfile.public_repos,
				followers: rawProfile.followers,
				following: rawProfile.following
			};

			// Step 2: Fetch Repos for Top Languages and Stars
			const reposRes = await fetch(
				`https://api.github.com/users/${targetUsername}/repos?per_page=100`
			);
			let totalStars = 0;
			let totalForks = 0;
			const langCounts: Record<string, number> = {};

			if (reposRes.ok) {
				const repos = await reposRes.json();
				let reposWithLang = 0;

				repos.forEach((repo: any) => {
					totalStars += repo.stargazers_count;
					totalForks += repo.forks_count;
					if (repo.language) {
						const lang = repo.language;
						langCounts[lang] = (langCounts[lang] || 0) + 1;
						reposWithLang++;
					}
				});

				// Sum top languages
				topLanguages = Object.entries(langCounts)
					.map(([name, count]) => {
						const lowerName = name.toLowerCase();
						const color = languageColors[lowerName] || '#8e92a4';
						return {
							name,
							percentage: Math.round((count / reposWithLang) * 100),
							color
						};
					})
					.sort((a, b) => b.percentage - a.percentage)
					.slice(0, 5);

				stats.stars = totalStars;
				stats.forks = totalForks;
			}

			// Step 3: Fetch Contributions from Deno public scraper
			let loadedContributions = false;
			try {
				const contribRes = await fetch(
					`https://github-contributions-api.deno.dev/v1/${targetUsername}`
				);
				if (contribRes.ok) {
					const contribDataRaw = await contribRes.json();
					if (contribDataRaw.contributions && contribDataRaw.contributions.length > 0) {
						contributionData = contribDataRaw.contributions;
						totalContributions = Object.values(contribDataRaw.total || {}).reduce(
							(a: any, b: any) => a + b,
							0
						) as number;

						// Calculate current streak
						let activeStreak = 0;
						const reversed = [...contributionData].reverse();
						for (const day of reversed) {
							if (day.count > 0) activeStreak++;
							else if (activeStreak > 0) break; // End streak if we hit a 0 day after some active days
						}
						stats.streak = activeStreak || 5; // Default if 0
						loadedContributions = true;
					}
				}
			} catch (e) {
				console.log('Contributions scraping failed, falling back to dynamic mockup.');
			}

			if (!loadedContributions) {
				// Generate seed mock values
				const mock = generateMockContributions(targetUsername);
				contributionData = mock.contributions;
				totalContributions = mock.total;
				stats.streak = mock.streak;
			}

			// Estimate total commits based on contributions or repos
			stats.commits = totalContributions > 0 ? totalContributions : profile.publicRepos * 22;

			// Calculate rank
			const rankScore =
				stats.stars * 10 + totalContributions * 1.5 + profile.followers * 5 + profile.publicRepos;
			if (rankScore > 1000) stats.rank = 'S+';
			else if (rankScore > 500) stats.rank = 'S';
			else if (rankScore > 200) stats.rank = 'A++';
			else if (rankScore > 100) stats.rank = 'A+';
			else stats.rank = 'A';
		} catch (e) {
			console.error(e);
			error = true;
			// Trigger robust offline mode with beautifully generated deterministic profile
			triggerOfflineFallback();
		} finally {
			loading = false;
		}
	}

	function triggerOfflineFallback() {
		offlineMode = true;

		// Deterministic profile for Sajudin
		const isDefault = targetUsername.toLowerCase() === 'udean777';

		profile = {
			login: targetUsername,
			name: isDefault ? "Sajudin Ma'ruf" : targetUsername,
			avatarUrl: isDefault
				? 'https://avatars.githubusercontent.com/u/104259831?v=4'
				: 'https://github.com/identicons/udean.png',
			bio: isDefault ? 'Frontend & Mobile Developer | Panca Budi Student' : 'Full Stack Developer',
			location: isDefault ? 'Medan, Indonesia' : 'Earth',
			company: isDefault ? 'Freelance Architect' : 'Open Source Developer',
			publicRepos: isDefault ? 35 : 12,
			followers: isDefault ? 12 : 5,
			following: isDefault ? 15 : 6
		};

		// Top languages fallback
		if (isDefault) {
			topLanguages = [
				{ name: 'Svelte', percentage: 42, color: '#ff3e00' },
				{ name: 'TypeScript', percentage: 28, color: '#3178c6' },
				{ name: 'Flutter', percentage: 15, color: '#02569b' },
				{ name: 'Dart', percentage: 10, color: '#00b4ab' },
				{ name: 'JavaScript', percentage: 5, color: '#f7df1e' }
			];
			stats.stars = 15;
			stats.forks = 4;
		} else {
			topLanguages = [
				{ name: 'TypeScript', percentage: 50, color: '#3178c6' },
				{ name: 'JavaScript', percentage: 30, color: '#f7df1e' },
				{ name: 'CSS', percentage: 20, color: '#563d7c' }
			];
			stats.stars = 3;
			stats.forks = 1;
		}

		// Contribution fallback
		const mock = generateMockContributions(targetUsername);
		contributionData = mock.contributions;
		totalContributions = mock.total;
		stats.streak = mock.streak;
		stats.commits = totalContributions;

		const rankScore =
			stats.stars * 10 + totalContributions * 1.5 + profile.followers * 5 + profile.publicRepos;
		if (rankScore > 500) stats.rank = 'S';
		else if (rankScore > 200) stats.rank = 'A++';
		else if (rankScore > 100) stats.rank = 'A+';
		else stats.rank = 'A';
	}

	onMount(() => {
		loadGitHubData();
	});

	// Get CSS opacity level for contribution squares based on github levels (0-4)
	function getContribStyle(level: number) {
		if (level === 0) {
			return 'background-color: var(--color-muted); opacity: 0.15;';
		}
		const opacities = [0.15, 0.35, 0.6, 0.8, 1.0];
		return `background-color: var(--color-accent); opacity: ${opacities[level]};`;
	}

	// Formatting dates nicely
	function formatDate(dateStr: string) {
		const d = new Date(dateStr);
		return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	}

	// Month labels generator for contribution grid
	let monthLabels = $derived.by(() => {
		if (contributionData.length === 0) return [];

		const labels: { name: string; colIndex: number }[] = [];
		let currentMonth = -1;

		contributionData.forEach((day, idx) => {
			const d = new Date(day.date);
			const colIndex = Math.floor(idx / 7);
			const m = d.getMonth();

			// If Sunday (row index 0) of the week, check if month changed
			if (idx % 7 === 0 && m !== currentMonth) {
				const name = d.toLocaleDateString('en-US', { month: 'short' });
				// Only add label if it's not crowding previous label
				if (labels.length === 0 || colIndex - labels[labels.length - 1].colIndex > 3) {
					labels.push({ name, colIndex });
					currentMonth = m;
				}
			}
		});
		return labels;
	});

	function scrollToRight(node: HTMLDivElement) {
		setTimeout(() => {
			node.scrollLeft = node.scrollWidth;
		}, 50);
	}
</script>

<div class="github-stats-container mt-2 font-mono select-none">
	{#if loading}
		<!-- Sleek animated boot loader -->
		<div class="flex flex-col gap-2 py-6 text-xs text-[var(--color-accent)]">
			<p class="animate-pulse">⏳ Executing fetch to GitHub API for @{targetUsername}...</p>
			<div class="flex items-center gap-2">
				<span
					class="inline-block h-3 w-3 animate-spin rounded-full border border-current border-t-transparent"
				></span>
				<span>[====================] Analyzing profile info & repositories...</span>
			</div>
		</div>
	{:else}
		<!-- Main Glassmorphic Terminal Card -->
		<div
			class="border-accent/20 bg-muted/5 relative overflow-hidden rounded-xl border p-5 shadow-2xl backdrop-blur-md"
		>
			<!-- Grid glowing aura background -->
			<div
				class="from-accent/5 pointer-events-none absolute inset-0 bg-radial to-transparent"
			></div>

			<!-- Offline badge if fallback triggered -->
			{#if offlineMode}
				<div
					class="bg-error/15 border-error/30 text-error absolute top-3 right-3 flex items-center gap-1.5 rounded border px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase"
				>
					<span class="bg-error h-1.5 w-1.5 animate-ping rounded-full"></span>
					OFFLINE MODE
				</div>
			{/if}

			<div class="relative z-10 flex flex-col gap-6 xl:flex-row xl:items-start">
				<!-- LEFT: Profile Card -->
				{#if profile}
					<div
						class="flex flex-col items-center border-b border-[var(--color-muted)]/20 pb-5 text-center xl:w-60 xl:items-start xl:border-r xl:border-b-0 xl:pr-6 xl:pb-0 xl:text-left"
					>
						<!-- Glowing Avatar with Neon Border -->
						<div class="relative mb-4">
							<div
								class="absolute inset-0 animate-pulse rounded-full bg-[var(--color-accent)] opacity-20 blur-md"
							></div>
							<img
								src={profile.avatarUrl}
								alt={profile.name}
								class="border-accent relative z-10 h-20 w-20 rounded-full border-2 object-cover"
								style="box-shadow: 0 0 15px rgba(115, 218, 202, 0.2);"
								onerror={(e) => {
									(e.target as HTMLImageElement).src = 'https://github.com/identicons/udean.png';
								}}
							/>
						</div>

						<h2 class="text-accent text-lg font-bold tracking-tight">{profile.name}</h2>
						<a
							href="https://github.com/{profile.login}"
							target="_blank"
							class="text-command text-xs hover:underline">@{profile.login}</a
						>

						<p class="text-output mt-2.5 max-w-xs text-xs leading-relaxed opacity-85">
							{profile.bio}
						</p>

						<div class="text-muted mt-3 flex flex-col gap-1 text-[11px]">
							<span>📍 {profile.location}</span>
							<span>🏢 {profile.company}</span>
						</div>

						<!-- Core Metrics block -->
						<div
							class="mt-5 grid w-full grid-cols-2 gap-x-6 gap-y-3 border-t border-[var(--color-muted)]/10 pt-4 text-xs"
						>
							<div class="flex flex-col gap-0.5">
								<span class="text-muted text-[10px] font-bold tracking-wider uppercase">Repos</span>
								<span class="text-foreground font-bold">{profile.publicRepos}</span>
							</div>
							<div class="flex flex-col gap-0.5">
								<span class="text-muted text-[10px] font-bold tracking-wider uppercase"
									>Followers</span
								>
								<span class="text-foreground font-bold">{profile.followers}</span>
							</div>
							<div class="flex flex-col gap-0.5">
								<span class="text-muted text-[10px] font-bold tracking-wider uppercase"
									>Total Stars</span
								>
								<span class="text-accent font-bold">⭐ {stats.stars}</span>
							</div>
							<div class="flex flex-col gap-0.5">
								<span class="text-muted text-[10px] font-bold tracking-wider uppercase"
									>Total Forks</span
								>
								<span class="text-foreground font-bold">🍴 {stats.forks}</span>
							</div>
						</div>
					</div>
				{/if}

				<!-- MIDDLE & RIGHT: Content dashboard -->
				<div class="flex flex-1 flex-col gap-6">
					<!-- Sub-navigation tabs -->
					<div class="flex border-b border-[var(--color-muted)]/15 pb-2">
						<button
							onclick={() => (activeTab = 'overview')}
							class="cursor-pointer border-b-2 px-4 py-1 text-xs font-bold tracking-wider uppercase transition-colors"
							class:text-accent={activeTab === 'overview'}
							class:border-accent={activeTab === 'overview'}
							class:text-muted={activeTab !== 'overview'}
							class:border-transparent={activeTab !== 'overview'}
						>
							Contributions
						</button>
						<button
							onclick={() => (activeTab = 'languages')}
							class="cursor-pointer border-b-2 px-4 py-1 text-xs font-bold tracking-wider uppercase transition-colors"
							class:text-accent={activeTab === 'languages'}
							class:border-accent={activeTab === 'languages'}
							class:text-muted={activeTab !== 'languages'}
							class:border-transparent={activeTab !== 'languages'}
						>
							Languages & Skills
						</button>
					</div>

					<!-- TAB 1: OVERVIEW & CONTRIBUTION CALENDAR -->
					{#if activeTab === 'overview'}
						<div class="animate-fadein flex flex-col gap-4">
							<div class="flex items-center justify-between text-xs">
								<p class="text-output">
									<span class="text-accent text-sm font-bold">{totalContributions}</span> contributions
									in the last year
								</p>
								<div class="text-muted flex gap-2 text-[11px]">
									<span>Streak: <strong class="text-accent">{stats.streak}d</strong></span>
									<span>Commits: <strong class="text-command">{stats.commits}</strong></span>
								</div>
							</div>

							<!-- Contribution Grid scroll wrapper (Perfect scroll design on mobile) -->
							<div
								class="relative w-full rounded border border-[var(--color-muted)]/10 bg-black/10 p-3"
							>
								<div class="scrollbar-thin overflow-x-auto select-none" use:scrollToRight>
									<!-- Grid container -->
									<div class="flex min-w-[620px] flex-col gap-1 font-mono text-[9px]">
										<!-- Months Header Row -->
										<div class="text-muted relative h-4 w-full">
											{#each monthLabels as label}
												<span class="absolute font-bold" style="left: {label.colIndex * 11 + 24}px">
													{label.name}
												</span>
											{/each}
										</div>

										<!-- Calendar Body (Left sidebar + Squares grid) -->
										<div class="flex items-start gap-2">
											<!-- Day names column -->
											<div
												class="text-muted flex h-[95px] w-5 shrink-0 flex-col justify-between gap-[3px] pt-1 text-[8px] font-bold select-none"
											>
												<span>Mon</span>
												<span>Wed</span>
												<span>Fri</span>
											</div>

											<!-- 7x53 squares grid using grid-flow-col -->
											<div class="grid h-[95px] grid-flow-col grid-rows-7 gap-[3px] select-none">
												{#each contributionData as day}
													<div
														class="h-2 w-2 cursor-pointer rounded-xs transition-transform duration-150 hover:z-20 hover:scale-130"
														style={getContribStyle(day.level)}
														onmouseenter={() => (hoverDay = day)}
														onmouseleave={() => (hoverDay = null)}
														role="gridcell"
														tabindex="-1"
														aria-label="{day.count} contributions on {day.date}"
													></div>
												{/each}
											</div>
										</div>
									</div>
								</div>
							</div>

							<!-- Grid legend & interactive details -->
							<div
								class="text-muted flex flex-col items-center justify-between gap-3 border-t border-[var(--color-muted)]/10 pt-3 text-xs sm:flex-row"
							>
								<!-- Left: Hover square details -->
								<div class="flex h-5 items-center">
									{#if hoverDay}
										<span class="text-accent animate-fadein font-bold">
											🚀 {hoverDay.count} contributions on {formatDate(hoverDay.date)}
										</span>
									{:else}
										<span class="opacity-60"
											>💡 Hover over squares to view contribution details</span
										>
									{/if}
								</div>

								<!-- Right: Legend keys -->
								<div class="flex items-center gap-1.5 text-[10px]">
									<span>Less</span>
									<span class="h-2 w-2 rounded-xs bg-[var(--color-muted)] opacity-15"></span>
									<span class="h-2 w-2 rounded-xs bg-[var(--color-accent)] opacity-35"></span>
									<span class="h-2 w-2 rounded-xs bg-[var(--color-accent)] opacity-60"></span>
									<span class="h-2 w-2 rounded-xs bg-[var(--color-accent)] opacity-80"></span>
									<span
										class="h-2 w-2 rounded-xs bg-[var(--color-accent)] opacity-100 shadow-[0_0_4px_var(--color-accent)]"
									></span>
									<span>More</span>
								</div>
							</div>

							<!-- GitHub Fun Developer Rank Card -->
							<div class="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
								<div
									class="flex items-center justify-between gap-3 rounded-lg border border-[var(--color-muted)]/15 bg-black/10 p-3.5"
								>
									<div class="space-y-0.5">
										<p class="text-muted text-[10px] font-bold tracking-wider uppercase">
											GitHub Ranking
										</p>
										<p class="text-output text-sm font-bold">Active Collaborator</p>
										<p class="text-muted text-[10px]">Based on commits & repository stars</p>
									</div>
									<div
										class="border-accent/20 bg-accent/5 text-accent font-terminal-retro relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border text-2xl font-bold tracking-wider select-none"
									>
										<span class="bg-accent absolute inset-0 animate-ping rounded-full opacity-15"
										></span>
										{stats.rank}
									</div>
								</div>

								<div
									class="flex items-center justify-between gap-3 rounded-lg border border-[var(--color-muted)]/15 bg-black/10 p-3.5"
								>
									<div class="w-full space-y-0.5">
										<p class="text-muted text-[10px] font-bold tracking-wider uppercase">
											Preferred Ecosystem
										</p>
										<p class="text-accent text-sm font-bold">Modern Web & Mobile</p>
										<p class="text-muted text-[10px]">Svelte, TypeScript & Flutter developer</p>
									</div>
								</div>
							</div>
						</div>
					{/if}

					<!-- TAB 2: LANGUAGES AND TECH STACK PROGRESS BARS -->
					{#if activeTab === 'languages'}
						<div class="animate-fadein flex flex-col gap-4">
							<h3 class="text-accent text-xs font-bold tracking-wider uppercase">
								Top 5 Language Distribution
							</h3>

							<div class="space-y-4 rounded border border-[var(--color-muted)]/10 bg-black/10 p-4">
								{#if topLanguages.length === 0}
									<p class="text-muted text-xs">No language data found.</p>
								{:else}
									{#each topLanguages as lang}
										<div class="space-y-1.5">
											<div class="flex items-center justify-between text-xs">
												<span class="text-output flex items-center gap-1.5 font-bold">
													<span
														class="inline-block h-2 w-2 rounded-full"
														style="background-color: {lang.color};"
													></span>
													{lang.name}
												</span>
												<span class="text-accent text-[11px] font-bold">{lang.percentage}%</span>
											</div>
											<!-- Progress bar outer container -->
											<div
												class="bg-muted/10 h-2 w-full overflow-hidden rounded-full border border-[var(--color-muted)]/5"
											>
												<!-- Glowing progress bar inner filling -->
												<div
													class="h-full rounded-full transition-all duration-1000 ease-out"
													style="width: {lang.percentage}%; background-color: {lang.color}; box-shadow: 0 0 6px {lang.color}80;"
												></div>
											</div>
										</div>
									{/each}
								{/if}
							</div>

							<!-- Skills connection message -->
							<div
								class="text-muted bg-accent/5 border-accent/10 rounded border p-3 text-[11px] leading-relaxed"
							>
								💻 <strong>Architecture Insights</strong>: The codebase composition indicates a
								strong focus on high-fidelity, reactive rendering (Svelte) and strictly-typed
								cross-platform development (TypeScript & Dart/Flutter). Run the command
								<button
									class="text-command inline cursor-pointer border-none bg-transparent p-0 font-mono font-bold hover:underline"
									onclick={() => (entry.oncommand ? entry.oncommand('skills') : null)}
									>'skills'</button
								> to view the full detailed tech stack catalog.
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	/* Micro-animations and custom scrollbar classes */
	.animate-fadein {
		animation: fadeIn 0.4s ease-out forwards;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Scrollbar adjustments for high aesthetic fit */
	.scrollbar-thin::-webkit-scrollbar {
		height: 4px;
	}
	.scrollbar-thin::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.02);
		border-radius: 4px;
	}
	.scrollbar-thin::-webkit-scrollbar-thumb {
		background: var(--color-muted);
		opacity: 0.3;
		border-radius: 4px;
	}
	.scrollbar-thin::-webkit-scrollbar-thumb:hover {
		background: var(--color-accent);
	}
</style>
