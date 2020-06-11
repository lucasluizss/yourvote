const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  public readonly _id: number;
  protected props: T;

  constructor (props: T, id?: number) {
    this._id = id ? id : 0;
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