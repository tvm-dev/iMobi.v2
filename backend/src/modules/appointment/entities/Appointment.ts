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
  private _appointmentNumber: string;

  constructor(
    props: Replace<AppointmentSchema, { createdAt?: Date; updatedAt?: Date }>,
    appointmentNumber: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
    this._appointmentNumber = appointmentNumber;
  }

  get userId(): string {
    return this.props.userId;
  }

  get appointmentNumber(): string {
    return this._appointmentNumber;
  }

  get description(): string {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  get location(): string {
    return this.props.location;
  }

  set location(location: string) {
    this.props.location = location;
  }

  get link(): string {
    return this.props.link;
  }

  set link(link: string) {
    this.props.link = link;
  }

  get status(): string {
    return this.props.status;
  }

  set status(status: string) {
    this.props.status = status;
  }

  get actions(): string {
    return this.props.actions;
  }

  set actions(actions: string) {
    this.props.actions = actions;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
