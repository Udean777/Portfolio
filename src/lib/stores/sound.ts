import { writable } from 'svelte/store';

export const soundEnabled = writable(true);

class KeyboardSoundSynthesizer {
	private ctx: AudioContext | null = null;
	private enabled = false;

	constructor() {
		// Sync local state with Svelte store
		soundEnabled.subscribe((value) => {
			this.enabled = value;
		});
	}

	private init() {
		if (this.ctx) return;
		try {
			const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
			this.ctx = new AudioContextClass();
		} catch (e) {
			console.warn('Web Audio API is not supported in this browser.', e);
		}
	}

	public playKeyClick() {
		if (!this.enabled) return;
		this.init();
		if (!this.ctx) return;

		// Resume context if suspended (browser security autoplay policy)
		if (this.ctx.state === 'suspended') {
			this.ctx.resume();
		}

		const now = this.ctx.currentTime;

		// 1. High frequency mechanical transient snap (key bottoming out click)
		const bufferSize = this.ctx.sampleRate * 0.015; // 15ms buffer
		const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
		const noiseData = noiseBuffer.getChannelData(0);
		for (let i = 0; i < noiseData.length; i++) {
			noiseData[i] = Math.random() * 2 - 1;
		}

		const noise = this.ctx.createBufferSource();
		noise.buffer = noiseBuffer;

		const noiseFilter = this.ctx.createBiquadFilter();
		noiseFilter.type = 'bandpass';
		// Slight frequency variation simulates different physical keys
		noiseFilter.frequency.setValueAtTime(1200 + Math.random() * 600, now);
		noiseFilter.Q.setValueAtTime(4, now);

		const noiseGain = this.ctx.createGain();
		noiseGain.gain.setValueAtTime(0.025, now);
		noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.01);

		noise.connect(noiseFilter);
		noiseFilter.connect(noiseGain);
		noiseGain.connect(this.ctx.destination);
		noise.start(now);

		// 2. Low-frequency resonant wooden/plastic thud (key body sound)
		const osc = this.ctx.createOscillator();
		const oscGain = this.ctx.createGain();

		osc.type = 'sine';
		const baseFreq = 240 + Math.random() * 50; // Randomize slightly
		osc.frequency.setValueAtTime(baseFreq, now);
		// Dynamic pitch sweep down
		osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.65, now + 0.02);

		oscGain.gain.setValueAtTime(0.045, now);
		oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

		osc.connect(oscGain);
		oscGain.connect(this.ctx.destination);
		osc.start(now);
		osc.stop(now + 0.035);
	}

	public playEnterClick() {
		if (!this.enabled) return;
		this.init();
		if (!this.ctx) return;

		if (this.ctx.state === 'suspended') {
			this.ctx.resume();
		}

		const now = this.ctx.currentTime;

		// 1. Heavy resonant lower mechanical thud
		const osc = this.ctx.createOscillator();
		const oscGain = this.ctx.createGain();

		osc.type = 'triangle';
		osc.frequency.setValueAtTime(140, now);
		osc.frequency.exponentialRampToValueAtTime(80, now + 0.05);

		oscGain.gain.setValueAtTime(0.09, now);
		oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

		osc.connect(oscGain);
		oscGain.connect(this.ctx.destination);
		osc.start(now);
		osc.stop(now + 0.08);

		// 2. Carriage return vintage bell (typewriter ding!)
		const bell = this.ctx.createOscillator();
		const bellFilter = this.ctx.createBiquadFilter();
		const bellGain = this.ctx.createGain();

		bell.type = 'sine';
		bell.frequency.setValueAtTime(1850, now); // Sweet bell frequency

		bellFilter.type = 'bandpass';
		bellFilter.frequency.setValueAtTime(1850, now);
		bellFilter.Q.setValueAtTime(10, now); // Super tight bell tone

		bellGain.gain.setValueAtTime(0.012, now);
		bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

		bell.connect(bellFilter);
		bellFilter.connect(bellGain);
		bellGain.connect(this.ctx.destination);
		
		bell.start(now);
		bell.stop(now + 0.2);
	}

	public playErrorClick() {
		if (!this.enabled) return;
		this.init();
		if (!this.ctx) return;

		if (this.ctx.state === 'suspended') {
			this.ctx.resume();
		}

		const now = this.ctx.currentTime;

		// Retro 8-bit computerized error alert buzz
		const osc1 = this.ctx.createOscillator();
		const osc2 = this.ctx.createOscillator();
		const oscGain = this.ctx.createGain();

		osc1.type = 'sawtooth';
		osc1.frequency.setValueAtTime(120, now);
		osc1.frequency.setValueAtTime(100, now + 0.06);

		osc2.type = 'triangle';
		osc2.frequency.setValueAtTime(122, now); // Detuned oscillator for thick buzz
		osc2.frequency.setValueAtTime(101, now + 0.06);

		oscGain.gain.setValueAtTime(0.04, now);
		oscGain.gain.setValueAtTime(0.04, now + 0.06);
		oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

		osc1.connect(oscGain);
		osc2.connect(oscGain);
		oscGain.connect(this.ctx.destination);

		osc1.start(now);
		osc2.start(now);
		osc1.stop(now + 0.15);
		osc2.stop(now + 0.15);
	}
}

export const keyboardSound = new KeyboardSoundSynthesizer();
