import { Request, Response, NextFunction } from 'express';
export const errorHandlerMiddleware = (err : Error, req : Request, res : Response, next : NextFunction) => {
    // Handle the erroryers
    let message = `Server error : ${err}`;
    res.status(500).json({ error: message, code: 500 });
};