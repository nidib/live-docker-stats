import { Router } from 'express';

import { DockerStatsStreamController } from '../controllers/docker-stats-stream-controller';
import { HealthCheckController } from '../controllers/health-check-controller';

const routes = Router();

const healthCheckController = new HealthCheckController();
routes.get('/', (req, res) => healthCheckController.execute(req, res));

const dockerStatsStreamController = new DockerStatsStreamController({ limitOfConnections: 1 });
routes.get('/stream', (req, res) => dockerStatsStreamController.execute(req, res));

export { routes };
