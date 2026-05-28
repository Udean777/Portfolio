<script lang="ts">
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme';

	let canvasEl: HTMLCanvasElement = $state()!;
	let score = $state(0);
	let highScore = $state(0);
	let gameState = $state<'ready' | 'playing' | 'gameover'>('ready');

	// Game config
	const gridSize = 20; // 20x20 grid
	const cellSize = 15; // 15px per cell (300x300 total)

	type Point = { x: number; y: number };
	let snake: Point[] = [];
	let direction: Point = { x: 1, y: 0 };
	let nextDirection: Point = { x: 1, y: 0 };
	let food: Point = { x: 0, y: 0 };
	let gameInterval: any;

	function initGame() {
		// Spawn snake in the middle
		snake = [
			{ x: 10, y: 10 },
			{ x: 9, y: 10 },
			{ x: 8, y: 10 }
		];
		direction = { x: 1, y: 0 };
		nextDirection = { x: 1, y: 0 };
		score = 0;
		spawnFood();
		gameState = 'playing';

		if (gameInterval) clearInterval(gameInterval);
		gameInterval = setInterval(gameStep, 100);
	}

	function spawnFood() {
		let newFood: Point;
		while (true) {
			newFood = {
				x: Math.floor(Math.random() * gridSize),
				y: Math.floor(Math.random() * gridSize)
			};
			// Make sure food doesn't spawn on snake
			const onSnake = snake.some((part) => part.x === newFood.x && part.y === newFood.y);
			if (!onSnake) break;
		}
		food = newFood;
	}

	function changeDirection(newDir: Point) {
		if (gameState !== 'playing') return;
		// Prevent 180-degree reverse turns
		if (newDir.x !== 0 && direction.x !== 0) return;
		if (newDir.y !== 0 && direction.y !== 0) return;
		nextDirection = newDir;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (gameState !== 'playing') return;

		let keyHandled = false;
		if (e.key === 'ArrowUp') {
			changeDirection({ x: 0, y: -1 });
			keyHandled = true;
		} else if (e.key === 'ArrowDown') {
			changeDirection({ x: 0, y: 1 });
			keyHandled = true;
		} else if (e.key === 'ArrowLeft') {
			changeDirection({ x: -1, y: 0 });
			keyHandled = true;
		} else if (e.key === 'ArrowRight') {
			changeDirection({ x: 1, y: 0 });
			keyHandled = true;
		}

		if (keyHandled) {
			// Prevent browser window from scrolling
			e.preventDefault();
		}
	}

	function gameStep() {
		direction = nextDirection;
		const head = { ...snake[0] };
		head.x += direction.x;
		head.y += direction.y;

		// Check wall collision
		if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
			gameOver();
			return;
		}

		// Check self collision
		const selfCollide = snake.some((part) => part.x === head.x && part.y === head.y);
		if (selfCollide) {
			gameOver();
			return;
		}

		// Grow snake
		snake.unshift(head);

		// Check food collision
		if (head.x === food.x && head.y === food.y) {
			score += 10;
			if (score > highScore) highScore = score;
			spawnFood();
		} else {
			snake.pop();
		}

		drawGame();
	}

	function gameOver() {
		clearInterval(gameInterval);
		gameState = 'gameover';
		drawGameOver();
	}

	function drawGame() {
		const canvas = canvasEl;
		if (!canvas) return;
		const ctx = canvas.getContext('2d')!;

		// Colors matching Tokyo Night theme
		const colorBg = $themeStore.colors.background || '#1a1b26';
		const colorSnake = $themeStore.colors.accent || '#73daca';
		const colorFood = $themeStore.colors.error || '#f7768e';

		// Clear canvas
		ctx.fillStyle = colorBg;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Draw grid lines (very subtle)
		ctx.strokeStyle = 'rgba(86, 95, 137, 0.1)';
		ctx.lineWidth = 0.5;
		for (let i = 0; i <= gridSize; i++) {
			ctx.beginPath();
			ctx.moveTo(i * cellSize, 0);
			ctx.lineTo(i * cellSize, canvas.height);
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo(0, i * cellSize);
			ctx.lineTo(canvas.width, i * cellSize);
			ctx.stroke();
		}

		// Draw Food
		ctx.fillStyle = colorFood;
		ctx.beginPath();
		ctx.arc(
			food.x * cellSize + cellSize / 2,
			food.y * cellSize + cellSize / 2,
			cellSize / 2.2,
			0,
			Math.PI * 2
		);
		ctx.fill();

		// Draw Snake
		snake.forEach((part, index) => {
			// Head is slightly brighter/different
			ctx.fillStyle = index === 0 ? colorSnake : `rgba(115, 218, 202, 0.75)`;

			// Draw rounded rectangles
			const x = part.x * cellSize + 1;
			const y = part.y * cellSize + 1;
			const size = cellSize - 2;
			ctx.fillRect(x, y, size, size);
		});
	}

	function drawGameOver() {
		const canvas = canvasEl;
		const ctx = canvas.getContext('2d')!;

		const colorBg = $themeStore.colors.background || '#1a1b26';
		const colorError = $themeStore.colors.error || '#f7768e';
		const colorText = $themeStore.colors.foreground || '#c0caf5';

		// Semitransparent gameover overlay
		ctx.fillStyle = 'rgba(26, 27, 38, 0.85)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.textAlign = 'center';
		ctx.fillStyle = colorError;
		ctx.font = 'bold 24px monospace';
		ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);

		ctx.fillStyle = colorText;
		ctx.font = '14px monospace';
		ctx.fillText(`Your Score: ${score}`, canvas.width / 2, canvas.height / 2 + 10);
		ctx.font = '11px monospace';
		ctx.fillStyle = 'rgba(192, 202, 245, 0.6)';
		ctx.fillText('Press RESTART or Click Play Again', canvas.width / 2, canvas.height / 2 + 40);
	}

	function drawReadyScreen() {
		const canvas = canvasEl;
		if (!canvas) return;
		const ctx = canvas.getContext('2d')!;

		const colorBg = $themeStore.colors.background || '#1a1b26';
		const colorAccent = $themeStore.colors.accent || '#73daca';
		const colorText = $themeStore.colors.foreground || '#c0caf5';

		ctx.fillStyle = colorBg;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.textAlign = 'center';
		ctx.fillStyle = colorAccent;
		ctx.font = 'bold 20px monospace';
		ctx.fillText('RETRO SNAKE GAME', canvas.width / 2, canvas.height / 2 - 25);

		ctx.fillStyle = colorText;
		ctx.font = '12px monospace';
		ctx.fillText('Press START or Click Play below', canvas.width / 2, canvas.height / 2 + 10);
		ctx.font = '10px monospace';
		ctx.fillStyle = 'rgba(192, 202, 245, 0.5)';
		ctx.fillText('Use keyboard Arrow keys or D-Pad', canvas.width / 2, canvas.height / 2 + 35);
	}

	onMount(() => {
		// Initial draw
		drawReadyScreen();

		// Event listener for keyboard
		window.addEventListener('keydown', handleKeydown);

		return () => {
			window.removeEventListener('keydown', handleKeydown);
			if (gameInterval) clearInterval(gameInterval);
		};
	});
</script>

<div
	class="border-muted/20 relative mx-auto my-2 flex w-full max-w-sm flex-col items-center rounded border bg-[var(--color-background)] py-4 font-mono select-none"
>
	<!-- Score banner -->
	<div class="mb-3 flex w-full justify-between px-6 text-xs select-none sm:text-sm">
		<div>Score: <span class="text-accent font-bold">{score}</span></div>
		<div>High Score: <span class="text-command font-bold">{highScore}</span></div>
	</div>

	<!-- Main Game Canvas -->
	<canvas
		bind:this={canvasEl}
		width="300"
		height="300"
		class="border-muted/30 bg-background block h-[300px] w-[300px] rounded border shadow-inner"
	></canvas>

	<!-- Game Action Buttons -->
	<div class="mt-4 flex w-full justify-center gap-4 px-6">
		{#if gameState !== 'playing'}
			<button
				onclick={initGame}
				class="text-accent border-accent hover:bg-accent hover:text-background cursor-pointer rounded border px-6 py-1.5 text-sm font-bold uppercase transition-colors"
			>
				{gameState === 'ready' ? 'Start Game' : 'Restart Game'}
			</button>
		{:else}
			<button
				onclick={() => gameOver()}
				class="text-error border-error hover:bg-error hover:text-background cursor-pointer rounded border px-6 py-1.5 text-sm font-bold uppercase transition-colors"
			>
				Give Up
			</button>
		{/if}
	</div>

	<!-- Mobile / On-screen D-Pad Controls -->
	<div class="mt-6 flex flex-col items-center select-none">
		<!-- Up Button -->
		<button
			onclick={() => changeDirection({ x: 0, y: -1 })}
			class="border-muted hover:bg-muted/20 text-accent flex h-12 w-12 cursor-pointer items-center justify-center rounded border font-bold transition-colors active:scale-95"
			aria-label="Move Up"
		>
			▲
		</button>

		<!-- Left / Right row -->
		<div class="my-1 flex gap-14 select-none">
			<button
				onclick={() => changeDirection({ x: -1, y: 0 })}
				class="border-muted hover:bg-muted/20 text-accent flex h-12 w-12 cursor-pointer items-center justify-center rounded border font-bold transition-colors active:scale-95"
				aria-label="Move Left"
			>
				◀
			</button>
			<button
				onclick={() => changeDirection({ x: 1, y: 0 })}
				class="border-muted hover:bg-muted/20 text-accent flex h-12 w-12 cursor-pointer items-center justify-center rounded border font-bold transition-colors active:scale-95"
				aria-label="Move Right"
			>
				▶
			</button>
		</div>

		<!-- Down Button -->
		<button
			onclick={() => changeDirection({ x: 0, y: 1 })}
			class="border-muted hover:bg-muted/20 text-accent flex h-12 w-12 cursor-pointer items-center justify-center rounded border font-bold transition-colors active:scale-95"
			aria-label="Move Down"
		>
			▼
		</button>
	</div>
</div>
