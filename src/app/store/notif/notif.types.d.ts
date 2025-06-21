export interface AppState {
  show: boolean;
  message: string;
  type: string;
}

export declare const notifTypes: {
  getState(): AppState;
  dispatch(action: any): void;
  subscribe(listener: () => void): () => void;
};

export declare const showNotification: (message: any, type: any) => void;
export declare const hideNotification: () => void;