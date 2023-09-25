import { OpenmrsResource } from '@openmrs/esm-framework';

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

export interface AllergyData {
  allergen: {
    allergenType: string;
    codedAllergen: {
      answers: [];
      attrributes: [];
      conceptClass: DisplayMetadata;
      display: string;
      links: Links;
      mappings: DisplayMetadata[];
      name: {
        conceptNameType: string;
        display: string;
        locale: string;
        name: string;
        uuid: string;
      };
      names: DisplayMetadata[];
      setMembers: [];
      uuid: string;
    };
  };
  auditInfo: {
    changedBy: DisplayMetadata;
    creator: DisplayMetadata;
    dateCreated: string;
    dateChanged: string;
  };
  comment: string;
  display: string;
  links: Links;
  reactions: [
    {
      reaction: AllergicReaction;
    },
  ];
  severity: {
    name: {
      conceptNameType: string;
      display: string;
      locale: string;
      name: string;
      uuid: string;
    };
    names: DisplayMetadata[];
    uuid: string;
  };
}

export type Allergen = {
  answers: [];
  attributes: [];
  conceptClass: DisplayMetadata;
  dataType: DisplayMetadata;
  descriptions: [];
  display: string;
  links: Links;
  mappings: Array<DisplayMetadata>;
  name: {
    display: string;
    links: Links;
    uuid: string;
    conceptTypeName?: string;
    locale: string;
    localePreferred: boolean;
    name: string;
    resourceVersion: string;
  };
  names: DisplayMetadata[];
  setMembers: [];
  uuid: string;
};

export type AllergicReaction = {
  answers: [];
  attributes: [];
  conceptClass: DisplayMetadata;
  datatype: DisplayMetadata;
  descriptions: DisplayMetadata[];
  name: {
    display: string;
  };
  display: string;
  uuid: string;
};

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

export interface OpenmrsEncounter extends OpenmrsResource {
  encounterDatetime: Date;
  encounterType: string;
  patient: string;
  location: string;
  encounterProviders?: Array<{ encounterRole: string; provider: string }>;
  obs: Array<OpenmrsResource>;
  form?: string;
  visit?: string;
}

export interface Concept {
  uuid: string;
  display: string;
  answers?: Concept[];
}

export interface FhirPatientResponse {
  entry: Array<FhirPatient>;
  total: number;
  link: Array<{
    relation: string;
    url: string;
  }>;
}

export interface FhirPatient {
  fullUrl: string;
  resource: {
    resourceType: string;
    id: string;
    meta: {
      lastUpdated: string;
    };
    identifier: Array<{
      id: string;
      use: string;
      type: {
        coding: Array<{
          code: string;
        }>;
        text: string;
      };
      value: string;
    }>;
    active: boolean;
    name: Array<{
      id: string;
      family: string;
      given: Array<string>;
    }>;
    gender: string;
    birthDate: string;
    deceasedBoolean: boolean;
  };
}

export interface PatientListRow {
  id: string;
  name: string;
  patientLink?: React.ReactNode;
  gender: string;
  birthDate?: string;
  age?: string;
  lastVisit?: string;
  actions?: React.ReactNode;
}

export interface PatientChartMeta {
  /**
   * Defines the slot name in slug case e.g. "covid-chart-summary"
   */
  slot: string;
  columns: number;
  title: string;
}

// OHRI Dashboard Types
export interface OhriDashboardMeta {
  /**
   * Used to generate the menu title displayed on the sidenav
   * @example "Covid Cases"
   */
  menuTitle: string;
  slot: string;
  config: {
    columns?: number;
    type: string;
    /**
     * Conditionally rendor icon on menu item
     */
    icon?: React.Component;
  };
  /**
   * Determines if the dashboard is a folder
   */
  isFolder?: boolean;
}

export interface OhriDashboardLinkMeta {
  /**
   * Used to generate route and slot names
   * @example "covid-cases"
   */
  name: string;
  slot: string;
  /**
   * Used to generate the menu title displayed on the sidenav
   * @example "Covid Cases"
   */
  title: string;
  config: {
    columns?: number;
    type?: string;
    programme: string;
    /**
     * Title displayed on the welcome section of the dashboard
     */
    dashboardTitle?: string;
    /**
     * Conditionally rendor icon on menu item
     */
    icon?: React.Component;
  };
  isLink?: boolean;
}
