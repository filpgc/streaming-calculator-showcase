<script lang="ts">
	export let links: { href: string; label: string }[];
	export let title: string = 'Related Calculators';
</script>

<div class="internal-links">
	<div class="internal-links-title">{title}</div>
	<div class="internal-links-grid">
		{#each links as link}
			<a href={link.href} class="internal-link-card">{link.label}</a>
		{/each}
	</div>
</div>
