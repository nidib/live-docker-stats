import { Request, Response } from 'express';

export class HealthCheckController {
	execute(_req: Request, res: Response) {
		return res.status(200).json({
			health: 'ok',
			version: process.env.COMMIT_HASH ?? null,
		});
	}
}
