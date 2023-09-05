import { Request, Response } from 'express';
import process from 'child_process';

import { getStreamDataOutput, handleDockerStatsStreamOutput } from '../utils/stream-output';

export class DockerStatsStreamController {
	private limitOfConnections: number;
	private activeConnections: number;

	constructor(props: { limitOfConnections: number }) {
		this.limitOfConnections = props.limitOfConnections;
		this.activeConnections = 0;
	}

	execute(req: Request, res: Response) {
		if (this.activeConnections >= this.limitOfConnections) {
			return res.status(400).json({ message: 'Another client is already connected.' });
		}

		this.activeConnections++;

		const stats = process.spawn('docker', ['stats', '--format', '{{ json . }}']);

		res.writeHead(200, {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive',
		});

		stats.stdout.on('data', (data: Buffer) => {
			const stringifiedData = handleDockerStatsStreamOutput(data);

			if (!stringifiedData) {
				return;
			}

			const streamData = getStreamDataOutput(stringifiedData);

			res.write(streamData);
		});

		req.on('close', () => {
			stats.kill();
			this.activeConnections--;
		});
	}
}
