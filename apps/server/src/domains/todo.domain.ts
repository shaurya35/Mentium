export default class Todo {
  private _title: string;
  private _description: string;
  private _deadline: Date;
  private _allDay: boolean;
  private _priority: number;
  private _labels: string[];

  public readonly id: number;
  public completed: boolean;
  public categoryId: number;
  public parentId?: number;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    id: number,
    title: string,
    description: string,
    deadline: Date,
    allDay: boolean,
    priority: number,
    labels: string[],
    completed: boolean,
    categoryId: number,
    parentId: number | undefined,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this._title = title;
    this._description = description;
    this._deadline = deadline;
    this._allDay = allDay;
    this._priority = priority;
    this._labels = labels;
    this.completed = completed;
    this.categoryId = categoryId;
    this.parentId = parentId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   *  -- getters and setters --
   * -- with validations & encapsulations
   */

  get title(): string {
    return this._title;
  }

  set title(newTitle: string) {
    if (!newTitle.trim()) {
      throw new Error("Title cannot be empty");
    }
    this._title = newTitle;
    this.touch();
  }

  get description(): string {
    return this._description;
  }

  set description(newDescription: string) {
    this._description = newDescription;
    this.touch();
  }

  get deadline(): Date {
    return this._deadline;
  }

  set deadline(newDeadline: Date) {
    if (isNaN(newDeadline.getTime())) {
      throw new Error("Invalid deadline date");
    }
    this._deadline = newDeadline;
    this.touch();
  }

  get allDay(): boolean {
    return this._allDay;
  }

  set allDay(value: boolean) {
    this._allDay = value;
    this.touch();
  }

  get priority(): number {
    return this._priority;
  }

  set priority(newPriority: number) {
    if (!Number.isInteger(newPriority) || newPriority < 1) {
      throw new Error("Priority must be positive integer");
    }
    this._priority = newPriority;
    this.touch();
  }

  get labels(): string[] {
    return this._labels;
  }

  set labels(newLabels: string[]) {
    if (!Array.isArray(newLabels)) {
      throw new Error("Labels must be an array");
    }
    newLabels.forEach((label) => {
      if (typeof label !== "string" || !label.trim()) {
        throw new Error("Each label must be a non-empty");
      }
    });
    this._labels = newLabels;
    this.touch();
  }

  /**
   * -- Domain Specific methods --
   * -- Business logic --
   */

  markComplete(): void {
    this.completed = true;
    this.touch();
  }

  toggleComplete(): void {
    this.completed = !this.completed;
    this.touch();
  }

  updateTitle(newTitle: string): void {
    this.title = newTitle;
  }

  updateDescription(newDescription: string): void {
    this.description = newDescription;
  }

  updateDeadline(newDeadline: Date): void {
    this.deadline = newDeadline;
  }

  updatePriority(newPriority: number): void {
    this.priority = newPriority;
  }

  updateLabels(newLabels: string[]): void {
    this.labels = newLabels;
  }

  /**
   * -- Helper method --
   */

  private touch(): void {
    this.updatedAt = new Date();
  }

  /**
   * Centralized method
   * @param title - title of todo
   * @param description - description of todo
   * @param deadline - when todo is due
   * @param allDay - whether the todo is an all-day event
   * @param categoryId - id of associated category
   * @param parentId - (optional) id of parent todo if this is a subtask
   * @param priority - priority level
   * @param labels - array of labels
   * @returns A new todo instance
   */
  static createNew(
    title: string,
    description: string,
    deadline: Date,
    allDay: boolean,
    categoryId: number,
    parentId?: number,
    priority: number = 1,
    labels: string[] = []
  ): Todo {
    const now = new Date();
    return new Todo(
      0,
      title,
      description,
      deadline,
      allDay,
      priority,
      labels,
      false,
      categoryId,
      parentId,
      now,
      now
    );
  }
}
