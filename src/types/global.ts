export type InputType =
    'text'
    | 'password'
    | 'email'
    | 'number'
    | 'tel'
    | 'url'
    | 'search'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'month'
    | 'week'


export interface Params {
    page?: number;
    per_page?: number;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
    [key: string]: any;
}

export type Role = 'ROOT' | 'COMPANY_ADMINISTRATOR' | 'USER'

export interface Meta {
    current_page: number
    from: number
    last_page: number
    links: { url: string | null, label: string, active: boolean }[]
    path: string
    per_page: number
    to: number
    total: number
}