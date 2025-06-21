export interface AppState {
  [key: string]: any;
}

export declare const storageType: {
  getState(): AppState;
  dispatch(action: any): void;
  subscribe(listener: () => void): () => void;
};

export declare const setItem: (key: any, value: any) => void;
export declare const removeItem: (key: any) => void;