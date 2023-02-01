interface IConfig {
  endPointUrl: string | undefined;
  fetchAuthDefaultValue: boolean;
  apiUrls: {
    login: string;
    me: string;
    logout: string;
    curriculumStatus: string;
    curriculumSearch: string;
    curriculum: string;
    curriculumList: string;
    curriculumAdd: string;
    skills: string;
    skillsSearch: string;
    skillAdd: string;
    skillDelete: string;
    skillsPaged: string;
    roles: string;
    accountAdd: string;
    account: string;
    accountUpdate: string;
    accountDelete: string;
  };
  routes: {
    home: string;
    login: string;
    dashboard: string;
    profile: string;
    account: string;
    developer: string;
    hr: string;
    skills: string;
    curriculum: string;
  };
  snackbar: {
    position: {
      vertical: 'top' | 'bottom';
      horizontal: 'left' | 'right' | 'center';
    };
    time: number;
  };
  appBarHeight: number;
  validation: {
    regexPassword: RegExp;
  };
}

// import { IConfig } from 'features/account/services/interfaces';

const config: IConfig = {
  endPointUrl: process.env.NODE_ENV,
  fetchAuthDefaultValue: true,
  apiUrls: {
    login: 'login',
    me: 'me',
    logout: 'logout',
    curriculumStatus: 'curriculum-status',
    curriculumSearch: 'curriculum-search',
    curriculum: 'curriculum',
    curriculumList: 'curriculum-list-by-username',
    curriculumAdd: 'curriculum/add',
    skills: 'skills',
    skillsSearch: 'skills/search',
    skillAdd: 'skills/add',
    skillDelete: 'skills/delete',
    skillsPaged: 'skills-paged',
    roles: 'roles',
    accountAdd: 'account/add',
    account: 'account',
    accountUpdate: 'account/update',
    accountDelete: 'account/delete',
  },
  routes: {
    home: '/',
    login: '/login',
    dashboard: '/dashboard',
    profile: '/profile',
    account: '/account',
    developer: '/developer',
    hr: '/hr',
    skills: '/skills',
    curriculum: '/curriculum',
  },
  snackbar: {
    position: { vertical: 'bottom', horizontal: 'right' },
    time: 3000,
  },
  appBarHeight: 64,
  validation: {
    regexPassword:
      /^(?=.*[A-Za-z])(?=.*\d)[A-zÀ-ú\d!@#$%&*|/"£?°:;<>'§{}€,)(+=._\-~]{8,}$/,
  },
};

export default config;
