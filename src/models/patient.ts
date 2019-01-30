import { BiopsyStatus } from "./biopsy-status";

export class Patient {
    lastName: string;
    firstName: string;
    gender: string;
    dob: Date;
    phoneNumber: string;
    contactFirstName: string;
    contactLastName: string;
    contactPhoneNumber: string;
    biopsyStatus: BiopsyStatus;
    _id: string; // unique id for pouchdb
    _rev: string; // document version in pouchdb
}