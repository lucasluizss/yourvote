import { uuid } from 'uuidv4';

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  public readonly _id: string;
  protected props: T;

  constructor (props: T, id?: string) {
    this._id = id ? id : uuid();
    this.props = props;
  }

  public equals (object?: Entity<T>): boolean {

    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id === object._id;
  }
}