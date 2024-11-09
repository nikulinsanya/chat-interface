// app/api/hello/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
    const encoder = new TextEncoder();
    const messages = [
        { "status": "start", "data": null, "message": "Fetching data..1123123123." },

        { "status": "data", "data": "<pre class=\"markdown\"># Sunt iura nutricisque erat", "message": null },

        {
            "status": "data",
            "data": "Lorem markdownum illa **se tanti** quod cum lupo credita forsitan prisco nec,",
            "message": null
        },

        {
            "status": "data",
            "data": "inducit seque. Hunc par **Aeneas**, ut emensas sibi Hellespontus latis",
            "message": null
        },

        {
            "status": "data",
            "data": "simulantis quis. Te properabat nec iacet Aiacis meae vetare non luctus, sua",
            "message": null
        },

        {
            "status": "data",
            "data": "inter cognitius, in. Fiat has edidit campus ungues cum silvas munera multaque,",
            "message": null
        },

        {
            "status": "data",
            "data": "Respicit me freta est fontis *non est*, manus Iove caeli ferum? Instabat",
            "message": null
        },

        { "status": "end", "data": null, "message": "Data fetched successfully" }

    ];

    const stream = new ReadableStream({
        async start(controller) {
            for (const message of messages) {
                // Convert the message object to a JSON string and encode it
                const chunk = JSON.stringify(message) + '\n';
                controller.enqueue(encoder.encode(chunk));
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            controller.close();
        }
    });

    return new NextResponse(stream, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Transfer-Encoding': 'chunked'
        }
    });
}
