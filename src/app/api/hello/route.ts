import { NextResponse } from 'next/server';
import { sanitizeText } from '@/utils/text-utils';

export async function POST() {
    const encoder = new TextEncoder();
    const response = await fetch('https://jaspervdj.be/lorem-markdownum/markdown-html.html?reference-links=on&no-external-links=on');

    if (!response.ok) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: response.status });
    }

    const reader = response.body?.getReader();
    if (!reader) {
        return NextResponse.json({ error: 'No readable stream available' }, { status: 500 });
    }

    const stream = new ReadableStream({
        async start(controller) {
            const decoder = new TextDecoder();
            let buffer = '';
            const interval = 1000; // Interval in milliseconds

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    // Process any remaining buffer
                    if (buffer.length > 0) {
                        const sanitizedText = sanitizeText(buffer);
                        controller.enqueue(encoder.encode(sanitizedText));
                    }
                    break;
                }

                buffer += decoder.decode(value, { stream: true });

                // Split buffer by single newline characters, skipping double newlines
                const parts = buffer.split(/\n{2,}/);
                buffer = parts.pop() || '';

                for (const part of parts) {
                    const lines = part.split('\n');
                    for (const line of lines) {
                        const sanitizedLine = sanitizeText(line);
                        controller.enqueue(encoder.encode(sanitizedLine + '\n'));
                        await new Promise((resolve) => setTimeout(resolve, interval));
                    }
                }
            }
            controller.close();
        },
        cancel() {
            reader.cancel();
        }
    });

    return new NextResponse(stream, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Transfer-Encoding': 'chunked'
        }
    });
}
