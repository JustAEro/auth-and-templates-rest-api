import { Request, Response } from "express";
import { Readable, Writable } from "stream";
import * as dotenv from "dotenv";
dotenv.config();

const { LATEX_API_URL = "http://localhost:4000/" } = process.env;

export class TemplatesController {
    static async getPdf(req: Request<{}, {}, {template: string}>, response: Response) {
        try {
            const {template} = req.body;

            const texBuffer = Buffer.from(template);
            const blob = new Blob([texBuffer]);
            const formData = new FormData();
            formData.set('main.tex', blob, 'main.tex');

            const fileResponse = await fetch(LATEX_API_URL, {
                method: "POST",
                body: formData,
            });

            if (!fileResponse.ok) {
                throw new Error(`Failed to fetch the PDF file: ${fileResponse.statusText}`);
            }

             // Get the Web ReadableStream from the response
            const readableStream = fileResponse.body;

            if (!readableStream) {
                throw new Error('No readable stream in response');
            }

            // Set the response headers
            response.setHeader('Content-Disposition', 'attachment; filename="main.pdf"');
            response.setHeader('Content-Type', 'application/pdf');

            const writableStream = new Writable({
                write(chunk, encoding, callback) {
                    response.write(chunk, encoding, callback);
                },
                final(callback) {
                    response.end(callback);
                }
            });

            // Convert the Web ReadableStream to a Node.js ReadableStream and pipe it to the writable stream
            Readable.from(readableStream).pipe(writableStream);
        } catch (err) {
            return response.status(500).json({ message: `Internal Server Error: can't convert to PDF, ${err}` });
        }
    }
}