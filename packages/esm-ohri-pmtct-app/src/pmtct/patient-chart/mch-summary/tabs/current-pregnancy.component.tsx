import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  type PatientChartProps,
  ExpandableList,
  fetchPatientRelationships,
  basePath,
  fetchPatientLastEncounter,
  SummaryCard,
  getSummaryCardProps,
  EncounterListTabsComponent,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import dayjs from 'dayjs';
import { Link } from '@carbon/react';
import { navigate, useConfig } from '@openmrs/esm-framework';
import recentPregnancyConfigSchema from './recent-pregnancy-config.json';
import appointmentSummaryConfigSchema from './appointments-config.json';
import arvTherapyColumnsConfigSchema from './arv-therapy-config.json';
import motherPreviousVisitConfigSchema from './mother-previous-visit.json';
import { fetchChildLatestFinalOutcome, fetchPatientIdentifiers } from '../../../../api.resource';

interface pregnancyOutcomeProps {
  id: string;
  pTrackerId: string;
  dateOfBirth: string;
  infantStatus: string;
  breastfeeding: string;
}
export interface familyItemProps {
  id: string;
  pTrackerId: string;
  name: any;
  relationship: string;
  dateOfBirth: string;
  hivStatus: string;
  finalOutcome: string;
}
const CurrentPregnancy: React.FC<PatientChartProps> = ({ patientUuid, pTrackerId }) => {
  const { t } = useTranslation();
  const currentPregnancyHeader = t('recentPregnancy', 'Recent Pregnancy');
  const arvTherapyHeader = t('art', 'ART');
  const appointmentsHeader = t('appointments', 'Appointments');
  const familyHeader = t('family', 'Family');
  const pregnancyOutcomeHeader = t('infantStatusAtBirth', 'Infant Status At Birth');
  const [relatives, setRelatives] = useState([]);
  const [relativeToIdentifierMap, setRelativeToIdentifierMap] = useState([]);
  const [pregnancyOutcomes, setPregnancyOutcomes] = useState([]);
  const [infantOutcomes, setInfantOutcomes] = useState([]);
  const { encounterTypes, obsConcepts, identifiersTypes } = useConfig();
  const config = useConfig();
  const recentPregnancyTabs = getSummaryCardProps(recentPregnancyConfigSchema, config);
  const appointmentSummaryTabs = getSummaryCardProps(appointmentSummaryConfigSchema, config);
  const arvTherapyTabs = getSummaryCardProps(arvTherapyColumnsConfigSchema, config);

  const headersFamily = [
    {
      header: t('pTrackerId', 'PTracker ID'),
      key: 'pTrackerId',
    },
    {
      header: t('name', 'Name'),
      key: 'name',
    },
    {
      header: t('relationship', 'Relationship'),
      key: 'relationship',
    },
    {
      header: t('dateOfBirth', 'Date of birth'),
      key: 'dateOfBirth',
    },
    {
      header: t('hivStatus', 'HIV Status'),
      key: 'hivStatus',
    },
    {
      header: t('finalOutcome', 'Final Outcome'),
      key: 'finalOutcome',
    },
  ];
  const headersPregnancyOutcome = [
    {
      header: t('pTrackerId', 'PTracker ID'),
      key: 'pTrackerId',
    },
    {
      header: t('dateOfBirth', 'Date of Birth'),
      key: 'dateOfBirth',
    },
    {
      header: t('infantStatus', 'Infant Status at Birth'),
      key: 'infantStatus',
    },
    {
      header: t('breastfeeding', 'Breast Feeding'),
      key: 'breastfeeding',
    },
  ];

  const { showRecentPregnancy, showMotherArtTherapy, showAppointmentsSummary } = config;

  const getParentRelationships = useCallback(async () => {
    let relationships = [];
    const relationshipsData = await fetchPatientRelationships(patientUuid);
    if (relationshipsData?.length) {
      relationshipsData.forEach((item) => {
        relationships.push(item);
      });
    }
    setRelatives(relationships);
  }, [patientUuid]);

  const getParentCurrentLabourAndDeliveryEncounter = useCallback(async () => {
    const currentPregnancyANCEncounter = await fetchPatientLastEncounter(
      patientUuid,
      encounterTypes.antenatalEncounterType,
    );
    const currentPregnancyLabourAndDeliveryEncounter = await fetchPatientLastEncounter(
      patientUuid,
      encounterTypes.labourAndDeliveryEncounterType,
    );
    if (
      currentPregnancyLabourAndDeliveryEncounter?.encounterDatetime > currentPregnancyANCEncounter?.encounterDatetime ||
      currentPregnancyANCEncounter?.encounterDatetime == null
    ) {
      if (currentPregnancyLabourAndDeliveryEncounter !== null) {
        setPregnancyOutcomes(
          currentPregnancyLabourAndDeliveryEncounter.obs?.filter(
            (obs) => obs.concept.uuid === obsConcepts.infantDeliveryGroupingConcept,
          ),
        );
      }
    }
  }, [patientUuid, encounterTypes, obsConcepts]);
  useEffect(() => {
    getParentCurrentLabourAndDeliveryEncounter();
    getParentRelationships();
  }, [getParentCurrentLabourAndDeliveryEncounter, getParentRelationships]);

  const getInfantOutcome = useCallback(() => {
    const infantOutcomes = relatives.map(async (relative) => {
      const finalOutcome = await fetchChildLatestFinalOutcome(
        relative.personB.uuid,
        obsConcepts.outcomeStatus,
        encounterTypes.infantPostnatalEncounterType,
      );
      return { finalOutcome: finalOutcome, childUuid: relative.personB.uuid };
    });

    Promise.all(infantOutcomes).then((values) => {
      setInfantOutcomes(values.map((value) => ({ finalOutcome: value.finalOutcome, childUuid: value.childUuid })));
    });
  }, [encounterTypes.infantPostnatalEncounterType, obsConcepts.outcomeStatus, relatives]);

  const getChildPTracker = useCallback(
    async (patientUuid: string) => {
      let pTrackerMap = { patientId: patientUuid, pTrackerId: '--' };
      const identifiers = await fetchPatientIdentifiers(patientUuid);
      if (identifiers?.length) {
        pTrackerMap.pTrackerId =
          identifiers.find((id) => id.identifierType.uuid === identifiersTypes.ptrackerIdentifierType)?.identifier ??
          '--';
      }
      return pTrackerMap;
    },
    [identifiersTypes.ptrackerIdentifierType],
  );

  useEffect(() => {
    const relativeToPtrackerPromises = relatives.map((relative) => getChildPTracker(relative.personB.uuid));
    Promise.all(relativeToPtrackerPromises).then((values) => {
      setRelativeToIdentifierMap(values.map((value) => ({ patientId: value.patientId, pTrackerId: value.pTrackerId })));
    });
    getInfantOutcome();
  }, [relatives, getChildPTracker, getInfantOutcome]);

  const parentRelationships: familyItemProps[] = useMemo(() => {
    let items = [];
    relatives.forEach((relative) => {
      //Ensure a parent is not their own child
      if (relative.personB.uuid !== patientUuid) {
        let patientLink = (
          <Link
            onClick={(e) => {
              e.preventDefault();
              navigate({ to: `${basePath}${relative.personB.uuid}/chart` });
            }}
          >
            {relative.personB.display}
          </Link>
        );
        let relativeObject: familyItemProps = {
          id: relative.uuid,
          pTrackerId: relativeToIdentifierMap.find((entry) => entry.patientId === relative.personB.uuid)?.pTrackerId,
          name: patientLink,
          relationship: relative.relationshipType.displayBIsToA,
          dateOfBirth: dayjs(relative.personB.birthdate).format('DD-MMM-YYYY'),
          hivStatus: '',
          finalOutcome:
            infantOutcomes.find((outcome) => outcome.childUuid === relative.personB.uuid)?.finalOutcome ?? '--',
        };
        items.push(relativeObject);
      }
    });

    return items;
  }, [relatives, patientUuid, relativeToIdentifierMap, infantOutcomes]);

  const childrenDetails: pregnancyOutcomeProps[] = useMemo(() => {
    let items = [];
    pregnancyOutcomes.forEach((child) => {
      let infantStatusObs = child.groupMembers.find(
        (member) => member.concept.uuid === obsConcepts.infantStatusAtBirthConcept,
      );
      let childObject: pregnancyOutcomeProps = {
        id: child.uuid,
        pTrackerId: child.groupMembers.find((member) => member.concept.uuid === obsConcepts.infantPTrackerIdConcept)
          ?.value,
        dateOfBirth: dayjs(
          child.groupMembers.find((member) => member.concept.uuid === obsConcepts.infantDateOfBirth)?.value,
        ).format('DD-MMM-YYYY'),
        infantStatus:
          infantStatusObs.value?.names?.find((conceptName) => conceptName.conceptNameType === 'SHORT')?.name ||
          infantStatusObs.value.name.name,
        breastfeeding: child.groupMembers.find((member) => member.concept.uuid === obsConcepts.breastfeedingStatus)
          ?.value?.display,
      };
      items.push(childObject);
    });
    return items;
  }, [
    pregnancyOutcomes,
    obsConcepts.infantStatusAtBirthConcept,
    obsConcepts.infantPTrackerIdConcept,
    obsConcepts.infantDateOfBirth,
    obsConcepts.breastfeedingStatus,
  ]);

  return (
    <div>
      {showRecentPregnancy && (
        <SummaryCard patientUuid={patientUuid} headerTitle={currentPregnancyHeader} columns={recentPregnancyTabs} />
      )}
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', height: '15rem' }}>
        {showMotherArtTherapy && (
          <SummaryCard patientUuid={patientUuid} headerTitle={arvTherapyHeader} columns={arvTherapyTabs} />
        )}
        {showAppointmentsSummary && (
          <SummaryCard patientUuid={patientUuid} headerTitle={appointmentsHeader} columns={appointmentSummaryTabs} />
        )}
      </div>

      <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <ExpandableList
          patientUuid={patientUuid}
          headerTitle={pregnancyOutcomeHeader}
          headers={headersPregnancyOutcome}
          items={childrenDetails}
          isActionable={true}
          isStriped={true}
          launchOptions={{
            hideFormLauncher: true,
            moduleName: '',
            displayText: '',
          }}
        />

        <ExpandableList
          patientUuid={patientUuid}
          headerTitle={familyHeader}
          headers={headersFamily}
          items={parentRelationships}
          isActionable={true}
          isStriped={true}
          launchOptions={{
            hideFormLauncher: true,
            moduleName: '',
            displayText: '',
          }}
        />
      </div>

      <EncounterListTabsComponent
        patientUuid={patientUuid}
        configSchema={motherPreviousVisitConfigSchema}
        config={config}
      />
    </div>
  );
};

export default CurrentPregnancy;
