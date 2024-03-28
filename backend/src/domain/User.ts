export class User {
  constructor(private props: UserProps & Partial<Id<string>>) {}

  public get name(): string {
    return this.props.name;
  }

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

  public toJSON(){
    return this.props;
  }
}
