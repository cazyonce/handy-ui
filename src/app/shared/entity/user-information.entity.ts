import { UserBaseInformationEntity } from './user-base-information.entity';

export class UserInformationEntity {

    base: UserBaseInformationEntity;
    private permissions: Array<{ (group: string): Array<string> }>;

    constructor() { }

}
