import { ISteps } from "./ISteps";

export interface ITasks {
  TasksID: number;
  Task: string;
  Concurrency: string;
  Steps: ISteps[] | null;
  ProgramsID: number;
  ProgramCode: string;
  ProgramName: string;
  Requirements: string;
  DateAdded: Date | string;
}
