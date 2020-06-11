import { EStatus } from './../enums/Status.enum';
import { Entity } from './entity';

interface IUserEntity {
  username: string;
  name: string;
	email: string;
	phone: string;
  status: EStatus;
}

export default class UserEntity extends Entity<IUserEntity> {

	get username (): string {
    return this.props.username;
  }

	get name (): string {
    return this.props.name;
  }

  get email (): string {
    return this.props.email;
  }

  get phone (): string {
    return this.props.phone;
  }

	private constructor(props: IUserEntity, id?: number) {
		super(props);
	}

	public isActive (): boolean {
    return this.props.status === EStatus.Active;
	}

	public static createUser (props: IUserEntity, id?: number) : UserEntity {
    return new UserEntity(props);
  }
}
