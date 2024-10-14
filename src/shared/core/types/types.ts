export type ReturnTypeMeta<T> = {
  data: T;
  meta: {
    total: number;
    currentPage: number;
    lastPage: number;
    perPage: number;
    prev: number;
    next: number;
  };
};

export type DeviceInfo = {
  ip: string | string[];
  ua: string;
  description: {
    browser: {
      name: string;
      version: string;
    };
    os: {
      name: string;
      version: string;
    };
    device: {
      vendor: string;
      model: string;
      type: string;
    };
  };
};

export enum RolesEnum {
  USER = 'user',
  MANAGER = 'manager',
  ADMIN = 'admin',
}

export enum RolesNameEnum {
  USER = 'Пользователь',
  MANAGER = 'Менеджер',
  ADMIN = 'Администратор',
}

export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
}

export enum GenderNameEnum {
  MALE = 'Мужской',
  FEMALE = 'Женский',
}

export enum FileTypesEnum {
  IMAGES = 'images',
  DOCS = 'docs',
  VIDEO = 'video',
}

export interface PaginateQuery {
  page: number;
  limit: number;
  search: string;
}
