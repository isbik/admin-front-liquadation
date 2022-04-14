export type User = {
  id: number;
  organizationName: string;
  INN: string;
  KPP: string;
  ORGN: string;
  city: string;
  factAddress: string;
  legalAddress: string;
  postalCode: string;
  phone: string;
  email: string;
  fio: string;
  position: string;
  directorPhone: string;
  directorEmail: string;
  emailStatus: UserEmailStatus;
};

export enum UserEmailStatus {
  active = 'active',
  blocked = 'blocked',
  verification = 'verification',
}
