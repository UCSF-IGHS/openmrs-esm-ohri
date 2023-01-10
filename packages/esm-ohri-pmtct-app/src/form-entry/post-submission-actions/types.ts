export type Relationship = {
  relationshipType: string;
  personA: string;
  personB: string;
};

export interface PatientIdentifier {
  uuid?: string;
  identifier: string;
  identifierType?: string;
  location?: string;
  preferred?: boolean;
}

interface NameValue {
  uuid?: string;
  preferred: boolean;
  givenName: string;
  middleName: string;
  familyName: string;
}
export interface AttributeValue {
  attributeType: string;
  value: string;
}

export type Patient = {
  uuid?: string;
  identifiers: Array<PatientIdentifier>;
  person: {
    uuid?: string;
    names: Array<NameValue>;
    gender: string;
    birthdate: string;
    birthdateEstimated: boolean;
    dead: boolean;
    deathDate?: string;
    causeOfDeath?: string;
  };
};

export interface RelationshipValue {
  relatedPersonName?: string;
  relatedPersonUuid: string;
  relation?: string;
  relationshipType: string;
  action?: 'ADD' | 'UPDATE' | 'DELETE';
  initialrelationshipTypeValue?: string;
  uuid?: string;
}
