export const Status = {
  "NEW": {
    id: "NEW",
    displayName: "New"
  },
  "INPROCESS": {
    id: "INPROCESS",
    displayName: "In Process" 
  },
  "DONE": {
    id: "DONE",
    displayName: "Done"
  }
};

export type StatusKey = keyof typeof Status;  

export enum StatusEnum {
  NEW = "New",
  INPROCESS = "In Process",
  DONE = "Done"
};

export type StatusEnumKey = keyof typeof StatusEnum;  