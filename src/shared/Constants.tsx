const authBase = 'auth';
export const AuthPath = {
    LOGIN: `${authBase}/login`,
    SIGN_UP: `${authBase}/sign-up`,
    RESET_PASSWORD: `${authBase}/reset-password`
}

const userBase = 'user';
export const UserPath = {
    PERSONAL_INFORMATION: (id: string) => `${userBase}/${id}/pi`,
    KYC: (id: string) => `${userBase}/${id}/kyc`
}