import { Biopsy } from "./biopsy";
import { Surgery } from "./surgery";
import { RadiationTherapy } from './radiation-therapy';

export class Patient {
    lastName: string;
    firstName: string;
    gender: string;
    dob: Date;
    phoneNumber: string;
    contactFirstName: string;
    contactLastName: string;
    contactPhoneNumber: string;
    biopsy: Biopsy;
    surgery: Surgery;
    radiationTherapies: RadiationTherapy[];
    watchers: string[] = [];
    isArchived: boolean = false;
    editorDeviceUuid: string;
    editorUsername: string;
    editedDate: Date;
    _id: string; // unique id for pouchdb
    _rev: string; // document revision in pouchdb
}