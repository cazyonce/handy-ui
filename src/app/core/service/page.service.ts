import { Injectable } from "@angular/core";

@Injectable()
export class PageService {

    loading: boolean;

    private actionError: boolean;

    private actionErrorCode: number;

    public exception504(): boolean {
        return this.actionError && this.actionErrorCode === 504;
    }

    public exception(): boolean {
        return this.actionError;
    }

    public setActionErrorCode(code: number): void {
        this.actionError = true;
        this.actionErrorCode = code;
    }
}