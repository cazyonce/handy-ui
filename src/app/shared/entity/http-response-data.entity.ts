
const DATA_CODE = {
    SUCCESS: 1,
    FAIL: 10,
    NO_LOGIN: 2,
    NO_PERMISSIONS: 3,
    INVALID_ARGUMENT: 4
};

export class HttpResponseDataEntity {

    private code: number;
    private data: any;
    private message: string;

    public static success(code: number): boolean {
        return DATA_CODE.SUCCESS === code;
    }

    public fail(): boolean {
        return DATA_CODE.FAIL === this.code;
    }

    public noLogin(): boolean {
        return DATA_CODE.NO_LOGIN === this.code;
    }

    public noPermissions(): boolean {
        return DATA_CODE.NO_PERMISSIONS === this.code;
    }

    public invalidArgument(): boolean {
        return DATA_CODE.INVALID_ARGUMENT === this.code;
    }

    public getMessage(): string {
        return this.message;
    }
}