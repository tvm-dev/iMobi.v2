import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

interface AppointmentSchema {
  userId: string;
  description: string;
  location: string;
  link: string;
  status: string;
  actions: string;

  createdAt: Date;
  updatedAt: Date;
}

export class Appointment {
  private props: AppointmentSchema;
  private _id: string;

  constructor(
    props: Replace<AppointmentSchema, { createdAt?: Date; updatedAt?: Date }>,
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

  // UserId
  get userId(): string {
    return this.props.userId;
  }

  // Description
  get description(): string {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  // location
  get location(): string {
    return this.props.location;
  }

  set location(location: string) {
    this.props.location = location;
  }

  // link
  get link(): string {
    return this.props.location;
  }

  set link(link: string) {
    this.props.link = link;
  }

  // status
  get status(): string {
    return this.props.location;
  }

  set status(status: string) {
    this.props.status = status;
  }

  // actions
  get actions(): string {
    return this.props.location;
  }

  set actions(actions: string) {
    this.props.actions = actions;
  }

  // Date
  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
