import { randomUUID } from 'node:crypto';
import { Replace } from 'src/utils/replace';

interface UserSchema {
  email: string;
  password: string;
  name: string;
  nameCompare: string;
  emailCompare: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private props: UserSchema;
  private _id: string;

  constructor(
    props: Replace<UserSchema, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
    };
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get password(): string {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  // To compare

  get emailCompare(): string {
    return this.props.emailCompare;
  }

  set emailCompare(emailCompare: string) {
    this.props.emailCompare = emailCompare;
  }

  get nameCompare(): string {
    return this.props.nameCompare;
  }

  set nameCompare(nameCompare: string) {
    this.props.nameCompare = nameCompare;
  }

  // Date

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }
}
