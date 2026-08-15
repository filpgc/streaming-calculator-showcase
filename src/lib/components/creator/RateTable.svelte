<script lang="ts">
	/**
	 * Generic rate table card. Column 0 is the emphasized key, column 1
	 * renders as a rate chip (green for paying rates, muted for $0), and
	 * further columns are secondary prose. On small screens rows collapse
	 * into stacked labeled cards so three-column tables stay readable.
	 */
	export let columns: string[];
	export let rows: string[][];
	export let footnote = '';

	function isZeroRate(cell: string): boolean {
		return cell.trim() === '$0' || cell.trim() === '$0.00';
	}

	// Two very different tables share this component. One has a short numeric
	// last column (YouTube: "$12,000 to $35,000"), the other has a paragraph
	// (TikTok: "Qualified views only: original videos over..."). They want
	// opposite column behaviour, so measure the content and let the layout
	// follow it rather than pinning one set of widths for both.
	$: tight = rows.every((r) => (r[r.length - 1] ?? '').length <= 26);
</script>

<div class="creator-table-wrap">
	<table class="creator-table" class:tight>
		<thead>
			<tr>
				{#each columns as c}
					<th>{c}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each rows as row, i (i)}
				<tr>
					{#each row as cell, j (j)}
						{#if j === 0}
							<td class="creator-table-key">{cell}</td>
						{:else if j === 1}
							<td class="creator-table-rate" data-label={columns[j]}>
								<span class="creator-rate-chip" class:zero={isZeroRate(cell)}>{cell}</span>
							</td>
						{:else}
							<td
								class="creator-table-val"
								class:creator-table-val-tight={cell.length <= 26}
								data-label={columns[j]}
							>{cell}</td>
						{/if}
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
{#if footnote}
	<p class="creator-table-note">{footnote}</p>
{/if}

<style>
	.creator-table-wrap {
		background: var(--surface);
		border: 0.5px solid var(--border);
		border-radius: 14px;
		overflow: hidden;
	}

	.creator-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 13.5px;
	}

	.creator-table th {
		text-align: left;
		font-size: 10.5px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: var(--text-muted);
		padding: 12px 16px;
		border-bottom: 0.5px solid var(--border);
		background: rgba(255, 255, 255, 0.015);
	}

	.creator-table td {
		padding: 13px 16px;
		border-bottom: 0.5px solid var(--border);
		vertical-align: top;
	}

	.creator-table tbody tr {
		transition: background 0.12s ease;
	}

	.creator-table tbody tr:hover {
		background: var(--hover-fill);
	}

	.creator-table tr:last-child td {
		border-bottom: none;
	}

	.creator-table-key {
		font-weight: 600;
		font-size: 13.5px;
		color: var(--text);
		line-height: 1.45;
	}

	.creator-table-rate {
		width: 1%;
		white-space: nowrap;
	}

	/* Prose tables: the notes column earns the leftover width. */
	.creator-table-key {
		width: 28%;
	}

	/* Numeric tables: every column shrinks to its content except the name,
	   which absorbs the slack. Pinning the name to a percentage was starving
	   it into wrapping ("Finance &amp; / Investing") while the numeric column
	   held width it had no use for. */
	.creator-table.tight .creator-table-key {
		width: auto;
	}

	.creator-table.tight .creator-table-val {
		width: 1%;
		white-space: nowrap;
	}

	/* Single-line rows read as a grid when they share a centre line. Prose
	   rows still hang from the top so the first line meets its label. */
	.creator-table.tight td {
		vertical-align: middle;
	}

	.creator-rate-chip {
		display: inline-block;
		font-size: 12.5px;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
		padding: 3px 10px;
		border-radius: 999px;
		background: rgba(51, 209, 122, 0.09);
		color: #5fd695;
	}

	.creator-rate-chip.zero {
		background: rgba(255, 255, 255, 0.05);
		color: var(--text-muted);
	}

	.creator-table-val {
		font-size: 12.5px;
		line-height: 1.6;
		color: var(--text-muted);
		font-variant-numeric: tabular-nums;
	}

	.creator-table-val-tight {
		white-space: nowrap;
		font-size: 13px;
		color: var(--text-secondary, #a3a3a3);
	}

	.creator-table-note {
		font-size: 11.5px;
		line-height: 1.6;
		color: var(--text-muted);
		margin-top: 10px;
		text-wrap: pretty;
	}

	/* Phones: collapse each row into a stacked card with inline labels */
	@media (max-width: 639px) {
		.creator-table,
		.creator-table tbody,
		.creator-table tr,
		.creator-table td {
			display: block;
			width: 100%;
		}

		.creator-table thead {
			display: none;
		}

		.creator-table tr {
			padding: 13px 16px;
			border-bottom: 0.5px solid var(--border);
		}

		.creator-table tr:last-child {
			border-bottom: none;
		}

		.creator-table td {
			padding: 0;
			border-bottom: none;
		}

		.creator-table-key {
			font-size: 14px;
			margin-bottom: 6px;
		}

		.creator-table-rate {
			margin-bottom: 5px;
		}

		.creator-table-val {
			white-space: normal;
			margin-bottom: 3px;
			max-width: none;
		}

		.creator-table-rate::before,
		.creator-table-val::before {
			content: attr(data-label);
			display: inline-block;
			font-size: 10.5px;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.06em;
			color: var(--text-muted);
			margin-right: 8px;
		}
	}
</style>
