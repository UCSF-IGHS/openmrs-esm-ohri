import { CodeSnippetSkeleton, Tile } from 'carbon-components-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '../empty-state/empty-state.component';
import styles from './encounter-tile.scss';

export interface EncounterTileProps {
  patientUuid: string;
  encounterUuid: string;
  form?: { package: string; name: string; view?: string };
  columns: Array<any>;
  headerTitle: string;
  description: string;
  dropdownText?: string;
  hideFormLauncher?: boolean;
  forms?: Array<{
    package: string;
    name: string;
    view?: string;
    excludedIntents?: Array<string>;
    fixedIntent?: string;
  }>;
  filter?: (encounter: any) => boolean;
}

export const EncounterTile: React.FC<EncounterTileProps> = ({
  patientUuid,
  encounterUuid,
  form,
  columns,
  headerTitle,
  description,
  dropdownText,
  hideFormLauncher,
  forms,
  filter,
}) => {
  const { t } = useTranslation();
  const [allRows, setAllRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <div className={styles.widgetContainer}>
        <div className={styles.widgetHeaderContainer}>
          <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>{headerTitle}</h4>

          {/* {!hideFormLauncher && <div className={styles.toggleButtons}>{formLauncher}</div>} */}
        </div>
        <Tile>
          <span className={styles.tileTitle}> HIV Status </span>
          <div className={styles.tileBackground}>
            <div className={styles.tileItemTextLabel}>
              <span className={styles.labelTile}>Last Viral load </span>
              <span className={styles.tileNumber}> 2000 </span>
              <span className={styles.tileDate}> 12-Jan-2022 </span>
            </div>

            <div className={styles.tileItemTextLabel}>
              <span className={styles.labelTile}> Last CD4 count </span>
              <span className={styles.tileNumber}> 132 </span>
              <span className={styles.tileDate}> 12-Jan-2022 </span>
            </div>

            <div className={styles.tileItemTextLabel}>
              <span className={styles.labelTile}> Enrolled in care </span>
              <span className={styles.tileNumber}> 10-Jan-2006 </span>
              <span className={styles.tileDate}> AMPATH UZIMA Eldoret Current WHO stage </span>
            </div>

            <div className={styles.tileItemTextLabel}>
              <span className={styles.labelTile}> Enrolled in care </span>
              <span className={styles.tileNumber}> 1 </span>
            </div>
          </div>
        </Tile>

        <Tile>
          <span className={styles.tileTitle}> Current ARV regimen </span>
          <div className={styles.tileBackground}>
            <div className={styles.tileItemTextLabelHorizantal}>
              <span className={styles.labelTile}>Current ARV regimen </span>
              <span className={styles.tileNumber}> Lamivudine, Tenofovir, Dolutegavir Drug </span>
            </div>

            <div className={styles.tileItemTextLabel}>
              <span className={styles.labelTile}> Drug allergies </span>
              <span className={styles.tileItemTextLabelHorizantal}> NSAIDs Heparins </span>
              <span className={styles.tileDate}> 12-Jan-2022 </span>
            </div>

            <div className={styles.tileItemTextLabel}>
              <span className={styles.labelTile}> </span>
              <span className={styles.tileItemTextLabelHorizantal}> EAC session </span>
              <span className={styles.tileDate}> 2 </span>
            </div>

            <div className={styles.tileItemTextLabel}>
              <span className={styles.labelTile}> ARV initiation date </span>
              <span className={styles.tileItemTextLabelHorizantal}> 09-Feb-2006 </span>
            </div>
          </div>
        </Tile>
      </div>

      {/* {isLoading ? (
        <CodeSnippetSkeleton type="multi" />
      ) : allRows.length > 0 ? (
        <>
          
        </>
      ) : (
        <EmptyState
          displayText={description}
          headerTitle={headerTitle}
          // launchForm={launchEncounterForm}
          // launchFormComponent={formLauncher}
          hideFormLauncher
        />
      )} */}
    </>
  );
};
