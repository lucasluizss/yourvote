import { ERole } from './../enums/Roles.enum';
import { EStatus } from './../enums/Status.enum';
import { Entity } from './entity';
import { Document } from 'mongoose';

export interface IUserEntity extends Document {
  username: string;
  name: string;
  email: string;
  password: string;
	phone: string;
  status: EStatus;
  role: ERole;
}

export default class UserEntity extends Entity<IUserEntity> {

	get username(): string {
    return this.props.username;
  }

	get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get phone(): string {
    return this.props.phone;
  }

  get status(): EStatus {
    return this.props.status;
  }

  get role(): ERole {
    return this.props.role;
  }

	private constructor(props: IUserEntity, id?: number) {
		super(props);
	}

	public isActive(): boolean {
    return this.props.status === EStatus.Active;
	}

	public isInactive(): boolean {
    return this.props.status === EStatus.Inactive;
	}

	public active(): void {
    this.props.status = EStatus.Active;
	}

	public inactive(): void {
    this.props.status = EStatus.Inactive;
  }

  public setEncriptedPassword(pwd: string) {
    this.props.password = pwd;
  }

  public getProps(): IUserEntity {
    return this.props;
  }

	public static create (props: IUserEntity, id?: number) : UserEntity {
    return new UserEntity(props);
  }
}
