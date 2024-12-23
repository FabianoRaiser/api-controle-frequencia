import express from 'express';
import professoresRoutes from './professores.js';
import formacoesRoutes from './formacoes.js';
import turmasRoutes from './turmas.js';
import presencasRoutes from './presencas.js';
import alocacoesRoutes from './alocacoes.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import tokensRoutes from './tokens.js';

const router = express.Router();

//Autorização via middleware
router.use(authMiddleware);

// Rotas
router.use('/professores', professoresRoutes);
router.use('/formacoes', formacoesRoutes);
router.use('/turmas', turmasRoutes);
router.use('/presencas', presencasRoutes);
router.use('/alocacoes', alocacoesRoutes);
router.use('/tokens', tokensRoutes);

export default router;
