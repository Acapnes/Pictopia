export declare class UserUpdateDto {
    email: string;
    password: string;
    name?: string;
    newEmail?: string;
    newPassword?: string;
    username?: string;
    birthDate?: string;
    bio?: string;
    settings: {
        privateAccount: boolean;
        notification: boolean;
    };
}
