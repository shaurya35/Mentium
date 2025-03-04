import Todo from "../../server/src/domains/todo.domain";

describe("Todo Domain Model", () => {
  let todo: Todo;

  beforeEach(() => {
    todo = Todo.createNew(
      "Test Title",
      "Test Description",
      new Date("2025-01-01T09:00:00Z"),
      false,
      1,    
      undefined,
      1,
      ["label1", "label2"]
    );
  });

  it("should throw an error for an empty title", () => {
    expect(() => todo.updateTitle("  ")).toThrow("Title cannot be empty");
  });

  it("should update title and update the timestamp", () => {
    const oldUpdatedAt = todo.updatedAt;
    todo.updateTitle("New Title");
    expect(todo.title).toBe("New Title");
    expect(todo.updatedAt.getTime()).toBeGreaterThan(oldUpdatedAt.getTime());
  });

  it("should mark a todo as complete", () => {
    expect(todo.completed).toBe(false);
    todo.markComplete();
    expect(todo.completed).toBe(true);
  });
});
