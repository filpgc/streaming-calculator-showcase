import { toPng, toJpeg } from 'html-to-image';

export type AspectRatio = '16:9' | '4:5' | '1:1' | '9:16';

export const ASPECT_RATIOS: Record<AspectRatio, { width: number; height: number; label: string }> = {
	'16:9': { width: 1200, height: 675, label: 'Landscape' },
	'4:5': { width: 1080, height: 1350, label: 'Instagram' },
	'1:1': { width: 1080, height: 1080, label: 'Square' },
	'9:16': { width: 1080, height: 1920, label: 'Portrait' }
};

export interface ShareCardData {
	totalEarnings: { raw: number; formatted: string };
	earningsPerService: Array<{
		name: string;
		streams: number;
		earnings: number;
		formatted: string;
	}>;
	totalStreams: number;
	royaltyPercentage: number;
	artistName: string;
	songName?: string;
}

export async function generateShareImage(
	element: HTMLElement,
	options?: { scale?: number; format?: 'png' | 'jpeg'; aspectRatio?: AspectRatio }
): Promise<Blob> {
	const dimensions = options?.aspectRatio ? ASPECT_RATIOS[options.aspectRatio] : ASPECT_RATIOS['16:9'];
	const scale = options?.scale || 2;

	const convertFn = options?.format === 'jpeg' ? toJpeg : toPng;

	const dataUrl = await convertFn(element, {
		width: dimensions.width,
		height: dimensions.height,
		pixelRatio: scale,
		quality: 0.95,
		cacheBust: true,
		skipAutoScale: true,
		style: {
			transform: 'scale(1)',
			transformOrigin: 'top left'
		}
	});

	// Convert data URL to Blob
	const response = await fetch(dataUrl);
	return response.blob();
}

export async function downloadShareImage(blob: Blob, filename: string): Promise<void> {
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}

export async function shareToSocial(blob: Blob, title: string): Promise<boolean> {
	if (navigator.share && navigator.canShare) {
		const file = new File([blob], 'streaming-earnings.png', { type: 'image/png' });
		const shareData = { files: [file], title };

		if (navigator.canShare(shareData)) {
			try {
				await navigator.share(shareData);
				return true;
			} catch {
				return false;
			}
		}
	}
	return false;
}
