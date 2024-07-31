export type UserProfile = {
    id: string;
    email: string;
    status: string;
    roles: string[];
    profile: Profile;
}

export type Profile = {
    id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    phone_number: string;
    address: string;
    dob: string;
    gender: 1 | 2;
    avatar: string;
}

export type UserRequest = {
    email: string;
    status: string;
    roles: string[];
    password: string;
    password_confirmation: string;
    first_name: string;
    last_name: string;
    full_name: string;
    phone_number: string;
    address: string;
    dob: string;
    gender: 1 | 2;
    avatar: string;
}
