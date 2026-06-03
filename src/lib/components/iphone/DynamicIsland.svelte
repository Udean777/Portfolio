<script lang="ts">
</script>

<div class="dynamic-island" aria-hidden="true">
	<div class="di-pill"></div>
</div>

<style>
	.dynamic-island {
		position: absolute;
		top: 12px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 200;
		pointer-events: none;
	}

	.di-pill {
		width: 120px;
		height: 34px;
		background: #000000;
		border-radius: 20px;
		box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 2px 8px rgba(0,0,0,0.5);
		animation: diPulse 4s ease-in-out infinite;
	}

	@keyframes diPulse {
		0%, 100% { transform: scaleX(1); }
		50%       { transform: scaleX(1.03); }
	}
</style>
