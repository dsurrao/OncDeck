import { BiopsyStatus } from "./biopsy-status";
import { Surgery } from "./surgery";
import { SurgicalPathology } from "./surgical-pathology";

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
    surgeries: Surgery[];
    surgicalPathologies: SurgicalPathology[];
    watchers: string[] = [];
    isArchived: boolean = false;
    editorDeviceUuid: string;
    editorUsername: string;
    editedDate: Date;
    _id: string; // unique id for pouchdb
    _rev: string; // document revision in pouchdb
}