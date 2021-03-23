/* eslint-disable camelcase */
type profileForm = {
    profile :Partial<profile>;
    isError: profileValidations;
}

type profile = {
    id: number,
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

type profileValidations = {
    first_name?: boolean;
    second_name?: boolean;
    display_name?: boolean;
    login?: boolean;
    email?: boolean;
    phone?: boolean;
    avatar?: boolean;
}

export default profileForm;
