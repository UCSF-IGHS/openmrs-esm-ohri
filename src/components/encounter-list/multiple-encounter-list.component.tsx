export interface MultipleEncounterListProps {
  patientUuid: string;
  encounterUuid: string;
  columns: Array<any>;
  headerTitle: string;
  description: string;
  filter?: (encounter: any) => boolean;
}
