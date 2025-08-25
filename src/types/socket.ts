export interface ServerToClientEvents {
  message: (message: string) => void;
}

export interface ClientToServerEvents {
  message: (message: string) => void;
}
