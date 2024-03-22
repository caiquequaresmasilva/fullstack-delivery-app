export class User {
  constructor(private props: UserProps & Id) {}

  public get email(): string {
    return this.props.email;
  }

  public get role(): string {
    return this.props.role;
  }

  public get hashedPassword(): string {
    return this.props.password;
  }

  public get id(): string {
    return this.props.id || '';
  }
}
