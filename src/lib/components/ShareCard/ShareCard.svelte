<script lang="ts">
	import { totalEarnings, showShareCard } from '$lib/stores';
	import ShareCardPreview from './ShareCardPreview.svelte';
	import { generateShareImage, downloadShareImage, shareToSocial, type AspectRatio, ASPECT_RATIOS } from './shareUtils';
	import { fade, scale } from 'svelte/transition';

	let aspectRatio = $state<AspectRatio>('4:5');
	let artistName = $state('');
	let songName = $state('');
	let cardElement = $state<HTMLElement | null>(null);
	let isGenerating = $state(false);
	let innerWidth = $state(0);
	let innerHeight = $state(0);

	let hasEarnings = $derived($totalEarnings.raw > 0);
	let dimensions = $derived(ASPECT_RATIOS[aspectRatio]);
	let canGenerate = $derived(hasEarnings && artistName.trim().length > 0);

	// Calculate scale to fit preview in container, responsive
	let isMobile = $derived(innerWidth < 480);
	// On mobile: use available space (viewport - 32px margins - ~200px for header/inputs/actions)
	let availableHeight = $derived(isMobile ? innerHeight - 32 - 200 : 600);
	let availableWidth = $derived(isMobile ? innerWidth - 32 - 20 : 440);
	let scaleByWidth = $derived(availableWidth / dimensions.width);
	let scaleByHeight = $derived(availableHeight / dimensions.height);
	let previewScale = $derived(isMobile ? Math.min(scaleByWidth, scaleByHeight, 0.4) : Math.min(0.42, 440 / dimensions.width));
	let previewHeight = $derived(dimensions.height * previewScale);

	// Prevent body scroll when modal is open
	$effect(() => {
		if (typeof document !== 'undefined') {
			document.body.style.overflow = $showShareCard && hasEarnings ? 'hidden' : '';
		}
	});

	function closeModal() {
		showShareCard.set(false);
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			closeModal();
		}
	}

	async function handleDownload() {
		if (!cardElement || isGenerating || !canGenerate) return;

		isGenerating = true;
		try {
			const blob = await generateShareImage(cardElement, { aspectRatio });
			const filename = songName.trim()
				? `${artistName.trim()}-${songName.trim()}-earnings.png`
				: `${artistName.trim()}-streaming-earnings.png`;
			await downloadShareImage(blob, filename.toLowerCase().replace(/\s+/g, '-'));
		} catch (error) {
			console.error('Failed to generate image:', error);
		} finally {
			isGenerating = false;
		}
	}

	async function handleShare() {
		if (!cardElement || isGenerating || !canGenerate) return;

		isGenerating = true;
		try {
			const blob = await generateShareImage(cardElement, { aspectRatio });
			const title = songName.trim()
				? `${artistName}'s earnings for "${songName}"`
				: `${artistName}'s Streaming Earnings`;
			const shared = await shareToSocial(blob, title);

			if (!shared) {
				const filename = `${artistName.trim()}-streaming-earnings.png`.toLowerCase().replace(/\s+/g, '-');
				await downloadShareImage(blob, filename);
			}
		} catch (error) {
			console.error('Failed to share:', error);
		} finally {
			isGenerating = false;
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} bind:innerWidth bind:innerHeight />

{#if $showShareCard && hasEarnings}
	<div class="modal-backdrop" role="button" tabindex="-1" onclick={handleBackdropClick} onkeydown={handleKeydown} transition:fade={{ duration: 150 }}>
		<div class="modal" transition:scale={{ duration: 200, start: 0.95 }}>
			<div class="modal-header">
				<h2>Share Your Earnings</h2>
				<button class="close-btn" onclick={closeModal} aria-label="Close">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>
			</div>

			<div class="modal-content">
				<!-- Personalization inputs -->
				<div class="input-row">
					<div class="input-group">
						<label for="artist-name">Artist Name <span class="required">*</span></label>
						<input
							id="artist-name"
							type="text"
							bind:value={artistName}
							placeholder="Your artist name"
							maxlength="30"
						/>
					</div>
					<div class="input-group">
						<label for="song-name">Song Name <span class="optional">(optional)</span></label>
						<input
							id="song-name"
							type="text"
							bind:value={songName}
							placeholder="Track or album name"
							maxlength="40"
						/>
					</div>
				</div>

				<!-- Preview -->
				<div class="preview-wrapper">
					<div class="format-selector">
						<button
							class="format-btn"
							class:active={aspectRatio === '16:9'}
							onclick={() => (aspectRatio = '16:9')}
						>
							16:9
						</button>
						<button
							class="format-btn"
							class:active={aspectRatio === '4:5'}
							onclick={() => (aspectRatio = '4:5')}
						>
							4:5
						</button>
						<button
							class="format-btn"
							class:active={aspectRatio === '1:1'}
							onclick={() => (aspectRatio = '1:1')}
						>
							1:1
						</button>
						<button
							class="format-btn"
							class:active={aspectRatio === '9:16'}
							onclick={() => (aspectRatio = '9:16')}
						>
							9:16
						</button>
					</div>
					<div
						class="preview-container"
						bind:this={cardElement}
						style="width: {dimensions.width}px; height: {dimensions.height}px; transform: scale({previewScale}); margin-bottom: -{dimensions.height - previewHeight}px;"
					>
						<ShareCardPreview {aspectRatio} {artistName} {songName} />
					</div>
				</div>

				<!-- Actions -->
				<div class="actions">
					<button class="action-btn download" onclick={handleDownload} disabled={isGenerating || !canGenerate}>
						{#if isGenerating}
							<span class="spinner"></span>
							Generating...
						{:else}
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
								<polyline points="7 10 12 15 17 10" />
								<line x1="12" y1="15" x2="12" y2="3" />
							</svg>
							Download
						{/if}
					</button>
					<button class="action-btn share" onclick={handleShare} disabled={isGenerating || !canGenerate}>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<circle cx="18" cy="5" r="3" />
							<circle cx="6" cy="12" r="3" />
							<circle cx="18" cy="19" r="3" />
							<line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
							<line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
						</svg>
						Share
					</button>
				</div>

				{#if !canGenerate}
					<p class="hint">Enter your artist name to generate the image</p>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 16px;
	}

	@media (max-width: 480px) {
		.modal-backdrop {
			padding: 16px;
		}
	}

	.modal {
		position: relative;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 16px;
		width: 100%;
		max-width: min(500px, calc(100vw - 64px));
		max-height: calc(100vh - 32px);
		max-height: calc(100dvh - 32px);
		overflow: visible;
		display: flex;
		flex-direction: column;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
	}

	@media (max-width: 480px) {
		.modal {
			max-width: calc(100vw - 32px);
			max-height: calc(100dvh - 32px);
			height: calc(100dvh - 32px);
			border-radius: 12px;
		}
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 16px;
		border-bottom: 1px solid var(--color-border);
		flex-shrink: 0;
	}

	.modal-header h2 {
		margin: 0;
		font-size: 16px;
		font-weight: 600;
		color: var(--color-text);
	}

	.close-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		background: transparent;
		border: none;
		border-radius: 6px;
		color: var(--color-text-secondary);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.close-btn:hover {
		background: var(--color-bg);
		color: var(--color-text);
	}

	.modal-content {
		padding: 12px 16px 16px;
		flex: 1;
		overflow-y: auto;
		min-height: 0;
		display: flex;
		flex-direction: column;
	}

	.input-row {
		display: grid;
		grid-template-columns: 40% 1fr;
		gap: 10px;
		margin-bottom: 12px;
	}

	@media (max-width: 480px) {
		.modal-header {
			padding: 10px 12px;
		}

		.modal-header h2 {
			font-size: 14px;
		}

		.modal-content {
			padding: 10px 12px 14px;
		}

		.input-row {
			gap: 6px;
			margin-bottom: 10px;
		}

		.input-group input {
			padding: 6px 10px;
			font-size: 12px;
		}

		.format-selector {
			top: 8px;
			right: 8px;
			padding: 3px;
			gap: 2px;
			border-radius: 8px;
		}

		.format-btn {
			padding: 5px 8px;
			font-size: 10px;
			border-radius: 5px;
		}

		.preview-wrapper {
			padding: 10px;
			margin-bottom: 10px;
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.actions {
			gap: 6px;
		}

		.action-btn {
			padding: 8px 10px;
			font-size: 12px;
		}

		.hint {
			font-size: 11px;
			margin-top: 8px;
		}
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.input-group label {
		font-size: 12px;
		font-weight: 500;
		color: var(--color-text-secondary);
	}

	.required {
		color: var(--color-accent);
	}

	.optional {
		color: var(--color-text-muted);
		font-weight: 400;
	}

	.input-group input {
		padding: 8px 12px;
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: 6px;
		color: var(--color-text);
		font-size: 13px;
		transition: border-color 0.2s;
	}

	.input-group input:focus {
		outline: none;
		border-color: var(--color-accent);
	}

	.input-group input::placeholder {
		color: var(--color-text-muted);
	}

	.preview-wrapper {
		position: relative;
		background: var(--color-bg);
		border-radius: 10px;
		padding: 12px;
		margin-bottom: 12px;
		overflow: hidden;
		display: flex;
		justify-content: center;
	}

	.preview-container {
		transform-origin: top center;
		flex-shrink: 0;
	}

	.format-selector {
		position: absolute;
		top: 10px;
		right: 10px;
		display: flex;
		flex-direction: column;
		gap: 3px;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		padding: 4px;
		z-index: 10;
	}

	.format-btn {
		padding: 6px 10px;
		background: transparent;
		border: none;
		border-radius: 6px;
		color: rgba(255, 255, 255, 0.7);
		font-size: 11px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.format-btn:hover {
		color: #fff;
		background: rgba(255, 255, 255, 0.15);
	}

	.format-btn.active {
		background: var(--color-accent);
		color: #000;
	}

	.actions {
		display: flex;
		gap: 8px;
	}

	.action-btn {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		padding: 10px 14px;
		border: none;
		border-radius: 8px;
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.action-btn.download {
		background: var(--color-accent);
		color: #000;
	}

	.action-btn.download:hover:not(:disabled) {
		filter: brightness(1.1);
	}

	.action-btn.share {
		background: var(--color-bg);
		color: var(--color-text);
		border: 1px solid var(--color-border);
	}

	.action-btn.share:hover:not(:disabled) {
		border-color: var(--hover-edge);
	}

	.action-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.spinner {
		width: 16px;
		height: 16px;
		border: 2px solid transparent;
		border-top-color: currentColor;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.hint {
		text-align: center;
		color: var(--color-text-muted);
		font-size: 12px;
		margin-top: 10px;
		margin-bottom: 0;
	}
</style>
