import { Request } from "express";
import { RequestValidatorIfs } from "../requestvalidatorIfs";
import { Status } from "../../models/statusenum";
import { BadRequest } from "@tsed/exceptions";


export class RequestValidator implements RequestValidatorIfs {
    private validKeys : Set<string>;
    constructor() { 
        this.validKeys = new Set<string>(['text', 'status']);
    }
    validateAddRequest(req: Request): void {
        this.validateForValidKeys(req);
        if ((!('text' in req.body)) || (!('status' in req.body))) { 
            throw new BadRequest('Missing fields');
        }

        this.validateStatusField(req.body.status);
    }
    validateModifyRequest(req: Request): void {
        this.validateForValidKeys(req);
        //here possible missing fields - in this case it will not be modified
        if ((!('text' in req.body)) && (!('status' in req.body))) { 
            throw new BadRequest('Missing fields');
        }
        if ('status' in req.body) { 
            this.validateStatusField(req.body.status);
        }
    } 

    private validateForValidKeys(req : Request) {
        for(let prop in req.body) { 
            if (!this.validKeys.has(prop)) { 
                throw new BadRequest('Wrong fields found');
            }
        } 
    }

    private validateStatusField(statusVal : string) { 
        let isValidValue = (Object.values(Status) as Array<string>).includes(statusVal.toUpperCase()) ; 
        if (!isValidValue) { 
            throw new BadRequest('Invalid field');
        }
    }
  
}