export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoStats {
  total: number;
  completed: number;
  active: number;
  completionRate: number;
}

export interface AppState {
  todos: Todo[];
  todoStats: TodoStats;
  nextId: number;

  show: boolean;
  message: string;
  type: string;
}

export declare const todoStore: {
  getState(): AppState;
  dispatch(action: any): void;
  subscribe(listener: () => void): () => void;
};

export declare const setTodos: (todos: Todo[]) => any;
export declare const addTodo: (todo: Todo) => any;
export declare const deleteTodo: (id: number) => any;
export declare const toggleTodo: (id: number) => any;
export declare const getTodoStats: () => any;