import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ExpandableList,
  EncounterList,
  fetchPatientRelationships,
  basePath,
  SummaryCard,
  getMenuItemTabConfiguration,
  getSummaryCardProps,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { navigate, useConfig } from '@openmrs/esm-framework';
import dayjs from 'dayjs';
import { Link } from '@carbon/react';
import { type familyItemProps } from './current-pregnancy.component';
import hivExposedInfantSummary from './hiv-exposed-infant-summary-config.json';
import hivExposedFamilySummary from './hiv-exposed-family-summary-config.json';
import hivExposedInfantConfigSchema from './infant-summary-config.json';
import { fetchPatientIdentifiers } from '../../../../api.resource';

const HivExposedInfant: React.FC<{
  patientUuid: string;
  dateOfBirth: string;
}> = ({ patientUuid, dateOfBirth }) => {
  const { t } = useTranslation();
  const [relatives, setRelatives] = useState([]);
  const [relativeToIdentifierMap, setRelativeToIdentifierMap] = useState([]);
  const { identifiersTypes } = useConfig();
  const config = useConfig();
  const hivExposedInfantSummaryTabs = getMenuItemTabConfiguration(hivExposedInfantSummary, config);
  const hivExposedFamilySummaryTabs = getMenuItemTabConfiguration(hivExposedFamilySummary, config);
  const infantCardColumns = getSummaryCardProps(hivExposedInfantConfigSchema, config);

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

  useEffect(() => {
    getParentRelationships();
  }, [getParentRelationships]);

  const familyHeaders = [
    {
      key: 'pTrackerId',
      header: t('pTrackerId', 'PTracker ID'),
    },
    {
      key: 'name',
      header: t('name', 'Name'),
    },
    {
      key: 'relationship',
      header: t('relationship', 'Relationship'),
    },
    {
      key: 'dateOfBirth',
      header: t('dateOfBirth', 'Date of birth'),
    },
    {
      key: 'hivStatus',
      header: t('hivStatus', 'HIV Status'),
    },
  ];

  const getChildPTracker = useCallback(
    async (patientUuid) => {
      let pTrackerMap = { patientId: '', pTrackerId: '--' };
      const identifiers = await fetchPatientIdentifiers(patientUuid);
      if (identifiers) {
        pTrackerMap.pTrackerId = identifiers.find(
          (id) => id.identifierType.uuid === identifiersTypes?.ptrackerIdentifierType,
        )?.identifier;
        pTrackerMap.patientId = patientUuid;
      }
      return pTrackerMap;
    },
    [identifiersTypes?.ptrackerIdentifierType],
  );

  useEffect(() => {
    const relativeToPtrackerPromises = relatives.map((relative) => getChildPTracker(relative.personA.uuid));
    Promise.all(relativeToPtrackerPromises).then((values) => {
      setRelativeToIdentifierMap(values.map((value) => ({ patientId: value.patientId, pTrackerId: value.pTrackerId })));
    });
  }, [getChildPTracker, relatives]);

  const parentRelationships: familyItemProps[] = useMemo(() => {
    let items = [];
    relatives.forEach((relative) => {
      let patientLink = (
        <Link
          onClick={(e) => {
            e.preventDefault();
            navigate({ to: `${basePath}${relative.personA.uuid}/chart` });
          }}
        >
          {relative.personA.display}
        </Link>
      );
      let relativeObject: familyItemProps = {
        id: relative.uuid,
        pTrackerId: relativeToIdentifierMap.find((entry) => entry.patientId === relative.personA.uuid)?.pTrackerId,
        name: patientLink,
        relationship: relative.relationshipType.displayAIsToB,
        dateOfBirth: dayjs(relative.personA.birthdate).format('DD-MMM-YYYY'),
        hivStatus: '',
        finalOutcome: '',
      };
      items.push(relativeObject);
    });
    return items;
  }, [relatives, relativeToIdentifierMap]);

  return (
    <div>
      <SummaryCard
        patientUuid={patientUuid}
        headerTitle={t('infantSummary', 'Infants Summary')}
        columns={infantCardColumns}
      />

      {hivExposedInfantSummaryTabs.map((tab) => (
        <EncounterList
          patientUuid={patientUuid}
          encounterType={tab.encounterType}
          columns={tab.columns}
          description={tab.description}
          headerTitle={tab.headerTitle}
          formList={tab.formList}
          launchOptions={tab.launchOptions}
        />
      ))}

      <ExpandableList
        headerTitle={t('family', 'Family')}
        patientUuid={patientUuid}
        headers={familyHeaders}
        items={parentRelationships}
        isActionable={true}
        isStriped={true}
        launchOptions={{
          hideFormLauncher: true,
          moduleName: '',
          displayText: '',
        }}
      />

      {hivExposedFamilySummaryTabs.map((tab) => (
        <EncounterList
          patientUuid={patientUuid}
          encounterType={tab.encounterType}
          columns={tab.columns}
          description={tab.description}
          headerTitle={tab.headerTitle}
          formList={tab.formList}
          launchOptions={tab.launchOptions}
        />
      ))}
    </div>
  );
};

export default HivExposedInfant;
