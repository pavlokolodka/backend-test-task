export class UserPayloadDto {
  email: string;
  id: number;
  roles: [
    {
      id: number;
      value: string;
      created_at: Date;
      updated_at: Date;
    }
  ];
  iat: number;
  exp: number;
}