export const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj)
}
export const getStatusClass = (value: string) => {
    return value == '1'
        ? 'inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'
        : 'inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10';
}
export const getStatusText = (value: string) => {
    return value == '1' ? 'Active' : 'Inactive';
}
export const getRoleClass = (value: string) => {
    switch (value) {
        case 'ROOT':
            return 'inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20';
        case 'COMPANY_ADMINISTRATOR':
            return 'inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10';
        default:
            return 'inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/10';
    }
}
export const getRoleName = (roles: string) => {
    if (roles.includes('ROOT')) return 'Super Admin';
    if (roles.includes('COMPANY_ADMINISTRATOR')) return 'Admin Entreprise';
    return 'Utilisateur';
}