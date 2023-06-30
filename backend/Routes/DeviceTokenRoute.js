import express from "express";
import { setDeviceToken } from "../Controllers/DeviceTokController.js";

const router = express.Router();

router.post("/", setDeviceToken);

export default router;
