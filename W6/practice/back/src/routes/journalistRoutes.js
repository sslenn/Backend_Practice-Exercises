import { Router } from 'express';
import { getAllJournalists, getArticlesByJournalist } from '../controllers/journalistController.js';
import { getArticleWithJournalist } from '../controllers/journalistController.js';

const journalistRouter = Router();

journalistRouter.get('/', getAllJournalists);
journalistRouter.get('/:id/articles', getArticlesByJournalist);

export default journalistRouter;
export { getArticleWithJournalist };
