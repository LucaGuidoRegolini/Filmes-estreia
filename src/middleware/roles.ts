export interface permissionsInterface {
  readonly manage_users: boolean;
  readonly manage_cinema: boolean;
  readonly register_film: boolean;
  readonly analyze_film: boolean;
}

export interface rolesInterface {
  admin: permissionsInterface;
  analyze: permissionsInterface;
  register: permissionsInterface;
}

export const roles: rolesInterface = {
  admin: {
    manage_users: true,
    manage_cinema: true,
    register_film: true,
    analyze_film: true,
  },
  analyze: {
    manage_users: false,
    manage_cinema: false,
    register_film: false,
    analyze_film: true,
  },
  register: {
    manage_users: false,
    manage_cinema: false,
    register_film: true,
    analyze_film: false,
  },
};
