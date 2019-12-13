import { Request, Response } from "express";

export default function errorHandler(req: Request, res: Response) {
  res.status(404).json({ message: "404 Not found" });
}
