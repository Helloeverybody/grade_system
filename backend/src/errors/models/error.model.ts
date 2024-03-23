import {StatusCode} from "../enums/status-code.enum";
import {StatusCodeMessage} from "../enums/status-code-message.enum";

export class ErrorModel {
    statusCode = 500;
    errorMessage: string | any;

    constructor(statusCode?: StatusCode, message?: string | any) {
        if (statusCode) {
            this.statusCode = statusCode;
        }

        this.errorMessage = message ? message : StatusCodeMessage[this.statusCode] || 'Unexpected error'
    }
}
