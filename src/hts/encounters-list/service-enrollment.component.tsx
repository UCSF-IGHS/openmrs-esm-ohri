// import React, { useEffect, useMemo, useState } from 'react';
// import styles from './care-and-treatment-list.scss';
// import Button from 'carbon-components-react/es/components/Button';
// import { Add16 } from '@carbon/icons-react';
// import { useTranslation } from 'react-i18next';
// import OTable from '../../components/data-table/o-table.component';
// import { openmrsFetch } from '@openmrs/esm-framework';
// import {
//   ComposedModal,
//   DataTableSkeleton,
//   ModalBody,
//   ModalHeader,
//   OverflowMenu,
//   OverflowMenuItem,
//   Tab,
//   Tabs,
// } from 'carbon-components-react';
// import EmptyState from '../../components/empty-state/empty-state.component';
// import moment from 'moment';
// import { getForm } from '../../utils/forms-loader';
// import OHRIForm from '../../forms/ohri-form.component';
// import { SessionMode } from '../../forms/types';
// import { launchOHRIWorkSpace } from '../../workspace/ohri-workspace-utils';

// interface CareAndTreatmentProps {
//   patientUuid: string;
// }

// export const htsFormSlot = 'hts-encounter-form-slot';
// export const htsEncounterRepresentation =
//   'custom:(uuid,encounterDatetime,location:(uuid,name),' +
//   'encounterProviders:(uuid,provider:(uuid,name)),' +
//   'obs:(uuid,obsDatetime,concept:(uuid,name:(uuid,name)),value:(uuid,name:(uuid,name))))';

// const CareAndTreatmentList: React.FC<CareAndTreatmentProps> = ({ patientUuid }) => {
//   const { t } = useTranslation();
//   const [tableRows, setTableRows] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [counter, setCounter] = useState(0);
//   const [currentMode, setCurrentMode] = useState<SessionMode>('enter');
//   const [currentEncounterUuid, setCurrentEncounterUuid] = useState(null);
//   const rowCount = 5;
//   const htsRetrospectiveTypeUUID = '79c1f50f-f77d-42e2-ad2a-d29304dde2fe'; // HTS Retrospective
//   const hivTestResultConceptUUID = '106513BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB'; // HIV Result
//   const hivTestDateConceptUUID = '140414BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB'; //

//   const forceComponentUpdate = () => setCounter(counter + 1);
//   const htsRetroForm = useMemo(() => {
//     return getForm('hiv', 'hts');
//   }, []);

//   const launchHTSForm = () => {
//     launchOHRIWorkSpace('ohri-forms-view-ext', {
//       title: htsRetroForm?.name,
//       state: { updateParent: forceComponentUpdate, formJson: htsRetroForm },
//     });
//   };
//   const editHTSEncounter = encounterUuid => {
//     launchOHRIWorkSpace('ohri-forms-view-ext', {
//       title: htsRetroForm?.name,
//       encounterUuid: encounterUuid,
//       state: { updateParent: forceComponentUpdate, formJson: htsRetroForm },
//     });
//   };
//   const viewHTSEncounter = encounterUuid => {
//     launchOHRIWorkSpace('ohri-forms-view-ext', {
//       title: htsRetroForm?.name,
//       encounterUuid: encounterUuid,
//       mode: 'view',
//       state: { updateParent: forceComponentUpdate, formJson: htsRetroForm },
//     });
//   };

//   const tableHeaders = [
//     { key: 'date', header: 'Date of service enrolment', isSortable: true },
//     { key: 'location', header: 'Description of client' },
//     { key: 'result', header: 'Population category' },
//     { key: 'provider', header: 'Date confirmed positive' },
//     { key: 'action', header: 'Action' },
//   ];

//   function getHtsEncounters(query: string, customRepresentation: string, encounterType: string) {
//     return openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${customRepresentation}`).then(({ data }) => {
//       let rows = [];

//       const sortedEncounters = data.results.sort(
//         (firstEncounter, secondEncounter) =>
//           new Date(secondEncounter.encounterDatetime).getTime() - new Date(firstEncounter.encounterDatetime).getTime(),
//       );

//       sortedEncounters.map(encounter => {
//         const htsResult = encounter.obs.find(observation => observation.concept.name.uuid === hivTestResultConceptUUID);
//         const htsProvider = encounter.encounterProviders.map(p => p.provider.name).join(' | ');
//         const HIVTestDate = encounter.obs.find(observation => observation.concept.name.uuid === hivTestDateConceptUUID);

//         const encounterActionOverflowMenu = (
//           <OverflowMenu flipped className={styles.flippedOverflowMenu}>
//             <OverflowMenuItem
//               itemText={t('viewHTSEncounter', 'View')}
//               onClick={e => {
//                 e.preventDefault();
//                 viewHTSEncounter(encounter.uuid);
//               }}
//             />
//             <OverflowMenuItem
//               itemText={t('editHTSEncounter', 'Edit')}
//               onClick={e => {
//                 e.preventDefault();
//                 editHTSEncounter(encounter.uuid);
//               }}
//             />
//           </OverflowMenu>
//         );

//         rows.push({
//           id: encounter.uuid,
//           date: moment(encounter.encounterDatetime).format('DD-MMM-YYYY'),
//           dateOfTest: HIVTestDate ? moment(HIVTestDate.obsDatetime).format('DD-MMM-YYYY') : 'None',
//           location: encounter.location.name,
//           result: htsResult?.value?.name?.name || 'None',
//           encounter_type: encounterType,
//           provider: htsProvider,
//           action: encounterActionOverflowMenu,
//         });
//       });
//       setTableRows(rows);
//       setIsLoading(false);
//     });
//   }
//   useEffect(() => {
//     let query = `encounterType=${htsRetrospectiveTypeUUID}&patient=${patientUuid}`;
//     getHtsEncounters(query, htsEncounterRepresentation, 'HTS Retrospective');
//   }, [counter]);

//   const headerTitle = 'Service Enrolment';

//   return (
//     <>
//       {isLoading ? (
//         <DataTableSkeleton rowCount={rowCount} />
//       ) : tableRows.length > 0 ? (
//         <>
//           <div className={styles.newServiceEnrolmentBtn}>
//             <Button
//               kind="ghost"
//               renderIcon={Add16}
//               iconDescription="New"
//               onClick={e => {
//                 e.preventDefault();
//                 launchHTSForm();
//               }}>
//               {t('add', 'New')}
//             </Button>
//           </div>
//           <div className={styles.widgetContainer}>
//             <Tabs type="container">
//               <Tab id="tab-1" label="Service Enrolment">
//                 <OTable tableHeaders={tableHeaders} tableRows={tableRows} />
//               </Tab>
//             </Tabs>
//           </div>
//         </>
//       ) : (
//         <EmptyState
//           displayText={t('htsEncounters', 'hts encounters')}
//           headerTitle={headerTitle}
//           launchForm={launchHTSForm}
//         />
//       )}
//     </>
//   );
// };

// export default CareAndTreatmentList;
