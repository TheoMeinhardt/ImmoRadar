declare module './session.js' {
  export const getSessionID: (req: any, res: any) => Promise<void>;
  export const postSessionID: (req: any, res: any) => Promise<void>;
}
