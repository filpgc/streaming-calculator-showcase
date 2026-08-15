<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { totalStreams } from '$lib/stores';

	let visible = false;
	let dismissed = false;
	let isDesktop = false;
	let isMac = false;

	$: hasInteracted = $totalStreams > 0;
	$: shortcut = isMac ? '⌘D' : 'Ctrl+D';

	onMount(() => {
		if (browser) {
			// Detect Mac for correct shortcut
			isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
			// Only show on desktop
			isDesktop = window.innerWidth >= 768;

			const saved = localStorage.getItem('save-toast-dismissed');
			if (!saved && isDesktop) {
				// Check every second if user has interacted
				const interval = setInterval(() => {
					if (hasInteracted) {
						clearInterval(interval);
						// Show after 2 more seconds of engagement
						setTimeout(() => {
							visible = true;
						}, 2000);
					}
				}, 1000);

				// Clean up after 60 seconds if no interaction
				setTimeout(() => clearInterval(interval), 60000);
			}
		}
	});

	function dismiss() {
		dismissed = true;
		setTimeout(() => {
			visible = false;
			if (browser) {
				localStorage.setItem('save-toast-dismissed', 'true');
			}
		}, 200);
	}
</script>

{#if visible}
	<div class="toast {dismissed ? 'dismissed' : ''}">
		<span class="toast-text">Press <kbd>{shortcut}</kbd> to bookmark this website</span>
		<button class="toast-close" on:click={dismiss}>×</button>
	</div>
{/if}

<style>
	.toast {
		position: fixed;
		bottom: 24px;
		right: 24px;
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 16px;
		background: linear-gradient(135deg, rgba(52, 211, 153, 0.12), rgba(52, 211, 153, 0.06));
		border: 1px solid rgba(52, 211, 153, 0.25);
		border-radius: 10px;
		backdrop-filter: blur(12px);
		animation: slideIn 0.3s ease;
		z-index: 100;
	}

	.toast.dismissed {
		animation: slideOut 0.2s ease forwards;
	}

	.toast-text {
		font-size: 13px;
		color: var(--text-secondary);
	}

	.toast-text kbd {
		padding: 2px 6px;
		font-size: 11px;
		font-family: inherit;
		color: var(--accent);
		background: rgba(52, 211, 153, 0.15);
		border: 1px solid rgba(52, 211, 153, 0.2);
		border-radius: 4px;
	}

	.toast-close {
		padding: 0;
		width: 20px;
		height: 20px;
		font-size: 16px;
		line-height: 1;
		color: var(--text-muted);
		background: none;
		border: none;
		cursor: pointer;
		transition: color 0.15s;
	}

	.toast-close:hover {
		color: var(--text);
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateX(20px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes slideOut {
		from {
			opacity: 1;
			transform: translateX(0);
		}
		to {
			opacity: 0;
			transform: translateX(20px);
		}
	}
</style>
