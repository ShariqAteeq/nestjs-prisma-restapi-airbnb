export const jwtConstants = {
  secret: 'secretKey',
};

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum RoomStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  FINISH = 'FINISH',
}
