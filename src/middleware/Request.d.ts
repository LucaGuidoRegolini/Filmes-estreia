declare namespace Express {
  export interface Request {
    userId?: number;
    cinemaId?: number;
    userRole?: string;
    authenticated?: boolean;
  }
}
