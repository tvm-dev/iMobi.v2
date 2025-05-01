import { Replace } from 'src/utils/replace';

interface AppointmentSchema {
  userId: string;
  description: string;
  location: string;
  link: string;
  status: string;
  observations: string;
  date: Date;
  hour: string;

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

  get observations(): string {
    return this.props.observations;
  }

  set observations(observations: string) {
    this.props.observations = observations;
  }

  get date(): Date {
    return this.props.date;
  }

  set date(date: Date) {
    this.props.date = date;
  }

  get hour(): string {
    return this.props.hour;
  }

  set hour(hour: string) {
    this.props.hour = hour;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
