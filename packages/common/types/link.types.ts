export type User = {
  id: number;
  access: string;
  username: string;
  firstName: string;
  lastName: string;
  permissions: Array<string>;
};
