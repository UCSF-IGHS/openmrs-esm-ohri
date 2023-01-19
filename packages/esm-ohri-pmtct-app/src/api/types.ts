export interface LocationData {
  display: string;
  uuid: string;
}

export interface SessionData {
  authenticated: boolean;
  locale: string;
  currentProvider: {
    uuid: string;
    display: string;
    person: DisplayMetadata;
    identifier: string;
    attributes: Array<{}>;
    retired: boolean;
    links: Links;
    resourceVersion: string;
  };
  sessionLocation: {
    uuid: string;
    display: string;
    name: string;
    description?: string;
  };
  user: {
    uuid: string;
    display: string;
    username: string;
  };
  privileges: Array<DisplayMetadata>;
  roles: Array<DisplayMetadata>;
  retired: false;
  links: Links;
}

type Links = Array<{
  rel: string;
  uri: string;
}>;

type DisplayMetadata = {
  display?: string;
  links?: Links;
  uuid?: string;
};

export interface Location {
  uuid: string;
  display: string;
  name: string;
  description?: string;
  address1?: string;
  address2?: string;
  cityVillage?: string;
  stateProvince?: string;
  country?: string;
  postalCode?: string;
  latitude?: string;
  longitude?: string;
  countryDistrict?: string;
  address3?: string;
  address4?: string;
  address5?: string;
  address6?: string;
}

export interface Concept {
  uuid: string;
  display: string;
  answers?: Concept[];
}

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

export interface AncVisitsReport {
  uuid: string;
  rows: Array<{ total: number }>;
  definition: {
    uuid?: string;
    name?: string;
    description?: string;
  };
}
