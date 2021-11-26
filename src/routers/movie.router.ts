import { Router } from "express";
import multer from 'multer'

import uploadConfig from '../config/upload'

const movieRouter = Router();
const upload = multer(uploadConfig)


movieRouter.post('/', upload.array('images'));

export default movieRouter;