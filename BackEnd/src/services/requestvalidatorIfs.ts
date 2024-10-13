import { Request } from 'express';
export interface RequestValidatorIfs {
    validateAddRequest(req : Request) : void;
    validateModifyRequest(req : Request) : void;
}