export enum SurgeryStatusEnum {
    Completed = "Completed",
    Scheduled = "Scheduled",
    NotScheduled = "Not Scheduled",
    NotIndicated = "Not Indicated",
    // these two are not saved, but assigned dynamically 
    // depending on current date and used in display
    ScheduledToday = "Scheduled Today",
    Missed = "Missed"
}