import { Role } from './constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsEnum } from 'class-validator';

export class SignUpDto {
  @IsDefined()
  @ApiProperty()
  fullname: string;

  @IsDefined()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsDefined()
  @ApiProperty()
  password: string;

  @IsEnum(Role)
  @IsDefined()
  role: Role;
}

export class LoginDto {
  @IsDefined()
  email: string;
  @IsDefined()
  password: string;
}

export class AddRoomDto {
  id?: number;
  title?: string;
  description?: string;
  status?: string;
  guestRules?: string;
  checkinTime?: string;
  checkoutTime?: string;
  cancellationPolicy?: string;
  currency?: string;
  basePrice?: number;
  cleaningFee?: number;
  weeklyDiscount?: string;
  monthlyDiscount?: string;
  startDate?: Date;
  endDate?: Date;
  minStay?: number;
  maxStay?: number;
  bookingType?: string;
  roomStepType?: string;
  isPersonalHome?: boolean;
  kindOfProperty?: string;
  kindOfPlace?: string;
  totalRooms?: string;
  amenities?: string[];
  sharedSpaces?: string[];
  noOfGuests?: number;
  noOfBedrooms?: number;
  noOfBeds?: number;
  noOfBathrooms?: number;
}
