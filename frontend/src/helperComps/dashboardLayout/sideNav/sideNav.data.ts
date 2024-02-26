import { RoutePath } from 'data';
import { FaBeer, FaNewspaper, FaUser } from 'react-icons/fa';
//import { PermissionType, UserType } from 'types';

export const __SideNavOptions = [
    {
        url: RoutePath.announcement.__index,
        title: 'Announcements',
        icon: FaNewspaper,
        patterns: ['/announcements/*'],
        children: [
            { url: RoutePath.announcement.__index, title: 'Announcements', icon: FaBeer },
            {
                url: RoutePath.announcement.new(),
                title: 'Add Announcement',
                permissions: ['create announcement'],
            },
        ],
        // functional_permissions: (user: UserType) => {
        //     return true;
        // },
    },
    {
        url: RoutePath.user.__index,
        title: 'User Management',
        icon: FaUser,
        patterns: ['/users/*', '/permissions/*', '/roles/*'],
        children: [
            { url: RoutePath.user.__index, title: 'User List', permissions: ['View Users'] },
            { url: RoutePath.user.new(), title: 'Add User', permissions: ['Add User'] },
            { url: RoutePath.role.__index, title: 'Roles', permissions: ['Create Role'] },
            { url: RoutePath.role.new(), title: 'Add Role', permissions: ['Create Role'] },
            { url: RoutePath.permission.__index, title: 'Permissions', permissions: ['Create Permission'] },
            { url: RoutePath.permission.new(), title: 'Add Permission', permissions: ['Create Permission'] },
        ],
        permissions: ['Add User', 'Update User', 'View Users', 'Create Role', 'Create Permission'],
    },
    {
        url: RoutePath.patient.__index,
        title: 'Patients',
        icon: FaUser,
        patterns: ['/patients/*'],
        children: [
            { url: RoutePath.patient.__index, title: 'Patients List' },
            { url: RoutePath.patient.new(), title: 'Add Patient', permissions: ['create patients'] },
        ],
        permissions: ['create patients', 'view all patients'],
    },
    {
        url: RoutePath.provider.__index,
        title: 'Providers',
        icon: FaUser,
        patterns: ['/providers/*'],
        children: [
            { url: RoutePath.provider.__index, title: 'Providers List' },
            { url: RoutePath.provider.new(), title: 'Add Provider' },
        ],
        permissions: ['view all providers'],
    },
];
