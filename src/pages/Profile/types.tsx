type Profile = {
    id: number,
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

type profileValidations = Record<keyof Profile, boolean>

type ProfileForm = {
    profile :Partial<Profile>;
    isError: Partial<profileValidations>;
}

export default ProfileForm;
