import type {Game} from "@/types/Game";
import type {UserProfile} from "@/types/UserProfile";

export type Company = {
    id: string;
    name: string;
    admin_id: string;
    admin: UserProfile;
    games: Game[];
    phone: string;
    website: string;
    address: string;
    email: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    youtube: string;
    description: string;
    status: string;
}