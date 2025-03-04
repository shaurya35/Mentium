export default class Category {
  private _name: string;

  public readonly id: number;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(id: number, name: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this._name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   *  -- getters and setters --
   * -- with validations & encapsulations
   */

  get name(): string {
    return this._name;
  }

  set name(newName: string) {
    if (!newName.trim()) {
      throw new Error("Category name cannot be empty");
    }
    this._name = newName;
    this.touch();
  }

  updateName(newName: string): void {
    this.name = newName;
  }

  private touch(): void {
    this.updatedAt = new Date();
  }

  /**
   * Factory method to create a new Category instance.
   * Sets default values for createdAt and updatedAt.
   * @param name - The name of the category.
   * @returns A new Category instance with id set to 0 (to be replaced by the database).
   */
  
  static createNew(name: string): Category {
    const now = new Date();
    return new Category(0, name, now, now);
  }
}
