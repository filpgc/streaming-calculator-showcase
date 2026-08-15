<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import {
		calculatorGroups,
		desktopLeftLinks,
		desktopRightLinks,
		mobileLinks,
		showSponsorPill,
		type CalculatorGroup
	} from '$lib/sections';

	let open = false;
	/** Which mobile calculator group is expanded. Null closes them all. */
	let openGroup: string | null = null;
	let visible = true;
	let lastScrollY = 0;
	// `?sponsor=<key>` preview override. Live sponsor is Boost Collective and
	// renders by default; this flag exists so future preview URLs for other
	// prospects can swap the pill + tooltip + mobile row in place.
	let sponsorParam: string | null = null;

	function toggle() {
		open = !open;
	}

	function close() {
		open = false;
		openGroup = null;
	}

	onMount(() => {
		if (!browser) return;

		// Read sponsor preview flag from URL on client only, because accessing
		// $page.url.searchParams during SSR/prerender throws an error.
		sponsorParam = new URL(window.location.href).searchParams.get('sponsor');

		const onScroll = () => {
			const y = window.scrollY;
			if (open) {
				// Don't hide while menu is open
			} else if (y > lastScrollY && y > 100) {
				visible = false;
			} else {
				visible = true;
			}
			lastScrollY = y;
		};

		const onMouseMove = (e: MouseEvent) => {
			if (open) return;
			if (e.clientY > window.innerHeight - 100) {
				visible = true;
			}
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('mousemove', onMouseMove, { passive: true });
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('mousemove', onMouseMove);
		};
	});

	// The link lists are constants now, imported directly: the nav is the same on
	// every page. Only the sponsor pill still varies, and only because the flight
	// was sold for the music context.
	$: sponsorPill = showSponsorPill($page.url.pathname);

	/**
	 * A group's trigger lights when the current page is one of its calculators,
	 * so the bar says which family you are in before you open anything. The
	 * homepage is the exception: the logo already carries that state, and lighting
	 * both gives one location two indicators.
	 */
	function groupActive(group: CalculatorGroup, pathname: string) {
		if (pathname === '/') return false;
		return group.links.some((l) => isActive(l.href, pathname));
	}

	function isActive(href: string, pathname: string) {
		if (href === '/') return pathname === '/';
		return pathname === href || pathname.startsWith(href + '/');
	}
</script>

<svelte:window on:keydown={(e) => e.key === 'Escape' && close()} />

{#if open}
	<!-- svelte-ignore a11y_consider_explicit_label -->
	<button class="nav-backdrop" on:click={close}></button>
{/if}

<!-- Mobile: bottom floating pills -->
<div class="nav-bottom nav-mobile" class:nav-bottom-hidden={!visible && !open}>
	{#if open}
		<div class="nav-bottom-panel" in:fly={{ y: 12, duration: 250 }} out:fade={{ duration: 150 }}>
			<!-- Calculators as collapsible groups, so the panel opens short and the
			     visitor drills into the one vertical they care about. -->
			{#each calculatorGroups as group}
				<button
					class="nav-calc-mobile-trigger"
					class:nav-calc-mobile-trigger-open={openGroup === group.name}
					on:click={() => (openGroup = openGroup === group.name ? null : group.name)}
				>
					{group.name}
					<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
						<path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
				<!--
					No transition. Opening a second group ran the first one's outgoing
					transition against the new one's incoming, so both sets of links were
					on screen for a beat and the panel grew then snapped back.
				-->
				{#if openGroup === group.name}
					<div class="nav-calc-mobile-group">
						{#each group.links as link}
							<a
								href={link.href}
								class="nav-bottom-panel-link nav-calc-mobile-item"
								class:nav-bottom-panel-link-active={isActive(link.href, $page.url.pathname)}
								on:click={close}
							>
								{link.label}
							</a>
						{/each}
					</div>
				{/if}
			{/each}

			<div class="nav-calc-mobile-rule"></div>

			{#each mobileLinks.filter((l) => !calculatorGroups.some((g) => g.links.some((c) => c.href === l.href))) as link}
				<a href={link.href} class="nav-bottom-panel-link" class:nav-bottom-panel-link-active={isActive(link.href, $page.url.pathname)} on:click={close}>
					{link.label}
				</a>
			{/each}
			{#if sponsorPill}
				<!-- Boost Collective mobile dropdown row (live since 2026-05-19). -->
				<a href="/go/boost" target="_blank" rel="noopener" class="nav-bottom-panel-link nav-bottom-panel-link-boost" on:click={close}>
					<img src="/boost-collective-logo.png" alt="Boost Collective" class="nav-bottom-panel-boost-logo" />
				</a>
			{/if}
		</div>
	{/if}

	<div class="nav-bottom-pills-row">
		<div class="nav-bottom-pill">
			<a
				href="/"
				class="nav-bottom-logo-link"
				class:nav-bottom-logo-link-active={$page.url.pathname === '/'}
				aria-current={$page.url.pathname === '/' ? 'page' : undefined}
				on:click={close}
			>
				<img src="/logo.png" alt="Logo Home" class="nav-bottom-logo" />
			</a>
			<button class="nav-bottom-toggle" on:click={toggle} aria-label="Navigation menu">
				{#if open}
					<svg width="18" height="18" viewBox="0 0 18 18" fill="none">
						<path d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
					</svg>
				{:else}
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
						<path d="M3 5.5H13M3 10.5H13" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
					</svg>
				{/if}
			</button>
		</div>
	</div>
</div>

<!-- Desktop: split top navigation pills -->
<div class="nav-desktop">
	<nav class="nav-top nav-top-left">
		<!-- The logo is the only route home now that the "Calculator" link is gone,
		     so it has to show when you are already there. -->
		<a
			href="/"
			class="nav-top-logo-link"
			class:nav-top-logo-link-active={$page.url.pathname === '/'}
			aria-current={$page.url.pathname === '/' ? 'page' : undefined}
		>
			<img src="/logo.png" alt="Logo Home" class="nav-top-logo" />
		</a>
		{#each desktopLeftLinks as link}
			<a href={link.href} class="nav-top-link" class:nav-top-link-active={isActive(link.href, $page.url.pathname)}>
				{link.label}
			</a>
		{/each}
		<!--
			One trigger per calculator family, rather than a single "Calculators"
			menu holding all fifteen. The categories are the useful distinction: a
			visitor arriving on a creator page can see that there is a music side to
			the site without opening anything, and each menu is a short list instead
			of a three-column panel.
		-->
		{#each calculatorGroups as group}
			<div class="nav-top-dropdown nav-calc-dropdown">
				<span
					class="nav-top-link nav-top-dropdown-trigger"
					class:nav-top-link-active={groupActive(group, $page.url.pathname)}
				>
					{group.navLabel ?? group.name}
					<svg width="10" height="10" viewBox="0 0 10 10" fill="none" style="margin-left: 2px; opacity: 0.5;">
						<path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</span>
				<div class="nav-top-dropdown-menu nav-calc-menu">
					{#each group.links as link}
						<a
							href={link.href}
							class="nav-calc-item"
							class:nav-calc-item-active={isActive(link.href, $page.url.pathname)}
						>
							<span class="nav-calc-item-label">{link.label}</span>
							{#if link.note}<span class="nav-calc-item-note">{link.note}</span>{/if}
						</a>
					{/each}
				</div>
			</div>
		{/each}
	</nav>

	<nav class="nav-top nav-top-right">
		{#each desktopRightLinks as link}
			<a href={link.href} class="nav-top-link" class:nav-top-link-active={isActive(link.href, $page.url.pathname)}>
				{link.label}
			</a>
		{/each}

		{#if sponsorPill}
		<!-- Boost Collective nav pill: live sponsor (2026-05-19+), music
		     pages only: the placement was sold for the music context and the
		     creator calculators keep their own sponsor inventory unsold.
		     The .nav-groover-* class names are kept for now because they hold
		     the base pill / tooltip layout that Boost overrides via the
		     .nav-boost-* modifier classes; renaming is a follow-up cleanup. -->
		<div class="nav-groover-wrapper">
			<a href="/go/boost" target="_blank" rel="noopener" class="nav-groover-pill nav-boost-pill">
				<img src="/boost-collective-logo.png" alt="Boost Collective" class="nav-groover-logo nav-boost-logo" />
			</a>
			<a href="/go/boost" target="_blank" rel="noopener" class="nav-groover-tooltip nav-boost-tooltip">
				<div class="nav-groover-tooltip-tag">Sponsored</div>
				<div class="nav-groover-tooltip-title">Get your music on Spotify playlists</div>
				<div class="nav-groover-tooltip-sub">Trusted by 100,000+ artists.</div>
				<div class="nav-groover-tooltip-cta nav-boost-tooltip-cta">50% OFF →</div>
			</a>
		</div>
		{/if}
	</nav>
</div>
