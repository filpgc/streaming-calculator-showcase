<script lang="ts">
	import { totalEarnings, earningsPerService, totalStreams, royaltyPercentage, currency, getCurrencyInfo } from '$lib/stores';
	import { streamingServices } from '../../../data';
	import { ASPECT_RATIOS, type AspectRatio } from './shareUtils';

	let { aspectRatio = '9:16', artistName = '', songName = '' }: { aspectRatio?: AspectRatio; artistName?: string; songName?: string } = $props();

	let activeServices = $derived($earningsPerService.filter((s) => s.streams > 0));
	let currencyInfo = $derived(getCurrencyInfo($currency));
	let dimensions = $derived(ASPECT_RATIOS[aspectRatio]);
	let isPortrait = $derived(aspectRatio === '9:16');
	let isInstagram = $derived(aspectRatio === '4:5');
	let isSquare = $derived(aspectRatio === '1:1');

	function getServiceLogo(name: string): string {
		const service = streamingServices.find((s) => s.name === name);
		return service?.logo || '';
	}

	function formatStreams(num: number): string {
		if (num >= 1000000) {
			return (num / 1000000).toFixed(1) + 'M';
		} else if (num >= 1000) {
			return (num / 1000).toFixed(1) + 'K';
		}
		return num.toLocaleString();
	}

	let maxPlatforms = $derived(isPortrait ? 8 : isInstagram ? 6 : isSquare ? 4 : 4);
	let displayServices = $derived(activeServices.slice(0, maxPlatforms));
	let isSinglePlatform = $derived(displayServices.length === 1);
</script>

<div
	class="share-card aspect-{aspectRatio.replace(':', '-')}"
	style="width: {dimensions.width}px; height: {dimensions.height}px;"
>
	<!-- Marathon-inspired Futuristic Style: html2canvas compatible -->
	<div class="cyber-bg">
		<!-- Corner brackets using divs -->
		<div class="corner tl-h"></div>
		<div class="corner tl-v"></div>
		<div class="corner tr-h"></div>
		<div class="corner tr-v"></div>
		<div class="corner bl-h"></div>
		<div class="corner bl-v"></div>
		<div class="corner br-h"></div>
		<div class="corner br-v"></div>
	</div>

	<div class="content">
		<div class="top-bar">
			<span class="tag">STREAMING EARNINGS</span>
			<div class="line-accent"></div>
			<img src="/logo.png" alt="" class="top-logo" />
		</div>

		<div class="main-section">
			{#if songName}
				<div class="song-name">{songName}</div>
			{/if}
			<div class="artist-name">{artistName || 'ARTIST'}</div>

			<div class="earnings-display">
				<span class="currency">{currencyInfo.symbol}</span>
				<span class="amount">{$totalEarnings.formatted.replace(currencyInfo.symbol, '')}</span>
			</div>

			<div class="stats">
				<div class="stat-item">
					<span class="stat-value">{formatStreams($totalStreams)}</span>
					<span class="stat-label">STREAMS</span>
				</div>
				<div class="stat-divider"></div>
				<div class="stat-item">
					<span class="stat-value">{$royaltyPercentage}%</span>
					<span class="stat-label">ROYALTY</span>
				</div>
			</div>
		</div>

		{#if displayServices.length > 0}
			<div class="platforms" class:portrait={isPortrait} class:instagram={isInstagram} class:square={isSquare} class:single={isSinglePlatform}>
				{#each displayServices as service}
					<div class="platform">
						<div class="platform-accent"></div>
						<img src={getServiceLogo(service.name)} alt={service.name} class="platform-icon" />
						<div class="platform-info">
							<span class="platform-name">{service.name}</span>
							<span class="platform-amount">{service.formatted}</span>
							{#if isPortrait || isInstagram}
								<span class="platform-streams">{formatStreams(service.streams)} streams</span>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/if}

		<div class="footer">
			<div class="cta">
				Calculate yours free
				<svg class="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
					<path d="M5 12h14" />
					<path d="M12 5l7 7-7 7" />
				</svg>
			</div>
			<span class="brand-name">streamingcalculator.com</span>
		</div>
	</div>
</div>

<style>
	.share-card {
		position: relative;
		overflow: hidden;
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
		background:
			radial-gradient(ellipse 120% 80% at 0% 100%, rgba(0, 255, 180, 0.2) 0%, transparent 50%),
			radial-gradient(ellipse 100% 60% at 100% 0%, rgba(255, 0, 180, 0.15) 0%, transparent 50%),
			radial-gradient(ellipse 80% 50% at 80% 80%, rgba(0, 150, 255, 0.12) 0%, transparent 50%),
			linear-gradient(160deg, #0a0a12 0%, #050508 50%, #0a0510 100%);
	}

	.content {
		position: relative;
		z-index: 10;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 40px 50px;
	}

	.aspect-9-16 .content {
		padding: 60px 44px;
		justify-content: space-between;
	}

	.cyber-bg {
		position: absolute;
		inset: 0;
	}

	/* Corner brackets */
	.corner {
		position: absolute;
		background: rgba(0, 255, 200, 0.4);
	}

	.tl-h { top: 24px; left: 24px; width: 60px; height: 2px; }
	.tl-v { top: 24px; left: 24px; width: 2px; height: 60px; }
	.tr-h { top: 24px; right: 24px; width: 60px; height: 2px; }
	.tr-v { top: 24px; right: 24px; width: 2px; height: 60px; }
	.bl-h { bottom: 24px; left: 24px; width: 60px; height: 2px; }
	.bl-v { bottom: 24px; left: 24px; width: 2px; height: 60px; }
	.br-h { bottom: 24px; right: 24px; width: 60px; height: 2px; }
	.br-v { bottom: 24px; right: 24px; width: 2px; height: 60px; }

	.top-bar {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 20px;
	}

	.top-logo {
		width: 48px;
		height: 48px;
		object-fit: contain;
	}

	.tag {
		padding: 12px 24px;
		background: rgba(0, 255, 200, 0.12);
		border: 2px solid rgba(0, 255, 200, 0.5);
		color: #00ffc8;
		font-size: 16px;
		font-weight: 700;
		letter-spacing: 3px;
		text-transform: uppercase;
	}

	.line-accent {
		flex: 1;
		height: 2px;
		background: linear-gradient(90deg, rgba(0, 255, 200, 0.6) 0%, rgba(0, 255, 200, 0.1) 50%, transparent 100%);
	}

	.main-section {
		margin-bottom: 24px;
	}

	.song-name {
		font-size: 64px;
		font-weight: 800;
		color: #ffffff;
		text-transform: uppercase;
		letter-spacing: 3px;
		line-height: 1;
		margin-bottom: 10px;
	}

	.artist-name {
		font-size: 64px;
		font-weight: 800;
		color: #ffffff;
		text-transform: uppercase;
		letter-spacing: 3px;
		line-height: 1;
		margin-bottom: 10px;
	}

	.song-name + .artist-name {
		font-size: 34px;
		font-weight: 600;
		font-style: italic;
		text-transform: none;
		letter-spacing: 1px;
		color: rgba(255, 255, 255, 0.85);
		margin-top: 4px;
		margin-bottom: 28px;
	}

	.aspect-9-16 .song-name {
		font-size: 80px;
		letter-spacing: 5px;
	}

	.aspect-9-16 .artist-name {
		font-size: 80px;
		letter-spacing: 5px;
	}

	.aspect-9-16 .song-name + .artist-name {
		font-size: 38px;
		letter-spacing: 1px;
	}

	.earnings-display {
		display: flex;
		align-items: baseline;
		gap: 8px;
		margin-bottom: 20px;
	}

	.currency {
		font-size: 60px;
		font-weight: 800;
		color: #00ffc8;
	}

	.amount {
		font-size: 110px;
		font-weight: 900;
		color: #00ffc8;
		line-height: 1;
	}

	.aspect-9-16 .amount {
		font-size: 120px;
	}

	.aspect-9-16 .currency {
		font-size: 80px;
	}

	.aspect-9-16 .stat-value {
		font-size: 50px;
	}

	.aspect-9-16 .stats {
		gap: 32px;
		margin-top: 8px;
	}

	.aspect-9-16 .top-bar {
		margin-bottom: 32px;
	}

	.aspect-9-16 .artist-name {
		margin-bottom: 10px;
	}

	.aspect-9-16 .song-name {
		margin-bottom: 36px;
	}

	.aspect-9-16 .earnings-display {
		margin-bottom: 8px;
	}

	.aspect-1-1 .song-name {
		font-size: 68px;
		letter-spacing: 4px;
	}

	.aspect-1-1 .artist-name {
		font-size: 68px;
		letter-spacing: 4px;
	}

	.aspect-1-1 .song-name + .artist-name {
		font-size: 32px;
		letter-spacing: 1px;
	}

	.aspect-1-1 .amount {
		font-size: 100px;
	}

	.aspect-1-1 .currency {
		font-size: 64px;
	}

	.aspect-1-1 .stat-value {
		font-size: 42px;
	}

	.aspect-1-1 .top-bar {
		margin-bottom: 28px;
	}

	.aspect-1-1 .earnings-display {
		margin-bottom: 2px;
	}

	.aspect-1-1 .main-section {
		margin-bottom: 6px;
	}

	/* 4:5 Instagram aspect ratio */
	.aspect-4-5 .song-name {
		font-size: 66px;
		letter-spacing: 4px;
	}

	.aspect-4-5 .artist-name {
		font-size: 66px;
		letter-spacing: 4px;
	}

	.aspect-4-5 .song-name + .artist-name {
		font-size: 34px;
		letter-spacing: 1px;
	}

	.aspect-4-5 .amount {
		font-size: 105px;
	}

	.aspect-4-5 .currency {
		font-size: 62px;
	}

	.aspect-4-5 .stat-value {
		font-size: 40px;
	}

	.aspect-4-5 .top-bar {
		margin-bottom: 26px;
	}

	.aspect-4-5 .main-section {
		margin-bottom: 20px;
	}

	.stats {
		display: flex;
		align-items: center;
		gap: 24px;
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.stat-value {
		font-size: 36px;
		font-weight: 700;
		color: #ffffff;
	}

	.stat-label {
		font-size: 22px;
		font-weight: 600;
		color: #00ffc8;
		letter-spacing: 2px;
	}

	.stat-divider {
		width: 2px;
		height: 44px;
		background: linear-gradient(180deg, transparent, rgba(0, 255, 200, 0.5), transparent);
	}

	.platforms {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 12px;
		align-content: center;
	}

	.platforms.portrait {
		grid-template-columns: repeat(2, 1fr);
		gap: 24px;
		margin-top: auto;
	}

	.platforms.square {
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
		align-content: center;
		flex: 1;
	}

	.platforms.instagram {
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
		align-content: center;
		margin-top: auto;
	}

	/* Single platform styling */
	.platforms.single {
		grid-template-columns: 1fr;
		max-width: 600px;
		justify-self: center;
		width: 100%;
	}

	.platforms.single.portrait,
	.platforms.single.instagram {
		max-width: 100%;
	}

	.platforms.single .platform {
		padding: 36px 40px;
		gap: 24px;
		background: rgba(0, 255, 200, 0.08);
		border: 2px solid rgba(0, 255, 200, 0.35);
	}

	.platforms.single .platform-accent {
		width: 6px;
	}

	.platforms.single .platform-icon {
		width: 80px;
		height: 80px;
	}

	.platforms.single .platform-name {
		font-size: 28px;
		letter-spacing: 2px;
	}

	.platforms.single .platform-amount {
		font-size: 56px;
	}

	.platforms.single .platform-streams {
		font-size: 28px;
		margin-top: 8px;
	}

	.platform {
		position: relative;
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 18px 20px;
		background: rgba(0, 255, 200, 0.06);
		border: 1px solid rgba(0, 255, 200, 0.25);
		min-width: 0;
		overflow: hidden;
	}

	.platforms.portrait .platform {
		padding: 24px 26px;
	}

	.platforms.square .platform {
		padding: 20px 24px;
	}

	.platforms.instagram .platform {
		padding: 22px 24px;
	}

	.platform-accent {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 4px;
		background: #00ffc8;
	}

	.platform-icon {
		width: 48px;
		height: 48px;
		object-fit: contain;
	}

	.platforms.portrait .platform-icon {
		width: 64px;
		height: 64px;
	}

	.platforms.square .platform-icon {
		width: 60px;
		height: 60px;
	}

	.platforms.instagram .platform-icon {
		width: 56px;
		height: 56px;
	}

	.platform-info {
		display: flex;
		flex-direction: column;
		gap: 4px;
		flex: 1;
		min-width: 0;
		overflow: hidden;
	}

	.platform-name {
		font-size: 18px;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.7);
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.platforms.portrait .platform-name {
		font-size: 22px;
	}

	.platforms.square .platform-name {
		font-size: 22px;
	}

	.platforms.instagram .platform-name {
		font-size: 20px;
	}

	.platform-amount {
		font-size: 32px;
		font-weight: 800;
		color: #ffffff;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.platforms.portrait .platform-amount {
		font-size: 44px;
	}

	.platforms.square .platform-amount {
		font-size: 44px;
	}

	.platforms.instagram .platform-amount {
		font-size: 38px;
	}

	.platform-streams {
		font-size: 20px;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.5);
		margin-top: 4px;
	}

	.footer {
		margin-top: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 24px;
	}

	.cta {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 24px;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.7);
		letter-spacing: 0.5px;
	}

	.cta-arrow {
		width: 24px;
		height: 24px;
		color: rgba(0, 255, 200, 0.8);
	}

	.aspect-16-9 .cta {
		font-size: 20px;
	}

	.aspect-16-9 .cta-arrow {
		width: 20px;
		height: 20px;
	}

	.aspect-9-16 .cta {
		font-size: 28px;
	}

	.aspect-9-16 .cta-arrow {
		width: 28px;
		height: 28px;
	}

	.aspect-4-5 .cta {
		font-size: 26px;
	}

	.aspect-4-5 .cta-arrow {
		width: 26px;
		height: 26px;
	}

	.brand-name {
		font-size: 24px;
		font-weight: 600;
		color: rgba(0, 255, 200, 0.8);
		letter-spacing: 0.5px;
	}
</style>
