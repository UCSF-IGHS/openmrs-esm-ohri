import React from 'react';
import { getNewWorkspaceItem, WorkspaceItem } from '@openmrs/esm-api';
import styles from './workspace-wrapper.component.css';

export default function Workspace(props: any) {
  const [openTabs, setOpenTabs] = React.useState<WorkspaceItem[]>([]);
  const [selectedTab, setSelectedTab] = React.useState(null);

  React.useEffect(() => {
    const sub = getNewWorkspaceItem().subscribe(item => {
      if (item.validations) {
        const validation = item.validations(openTabs);
        if (validation > -1) {
          setSelectedTab(validation);
        } else {
          const updatedOpenTabs = [...openTabs, item];
          setOpenTabs(updatedOpenTabs);
          setSelectedTab(updatedOpenTabs.length - 1);
        }
      } else {
        const updatedOpenTabs = [...openTabs, item];
        setOpenTabs(updatedOpenTabs);
        setSelectedTab(updatedOpenTabs.length - 1);
      }
    });
    return () => sub.unsubscribe();
  });

  React.useEffect(() => {
    openTabs.length ? props.showWorkspace(true) : props.showWorkspace(false);
  }, [openTabs, props]);

  function removeTab(index) {
    const tab = openTabs[index];
    let userConfirmed = false;
    if (tab.inProgress) {
      userConfirmed = confirm('There is ongoing work, are you sure you want to close this tab?');
    }
    if (userConfirmed || !tab.inProgress) {
      const updatedOpenTabs = openTabs.slice();
      updatedOpenTabs.splice(index, 1);
      setOpenTabs(updatedOpenTabs);
      setSelectedTab(getSelectedTabAfterRemove(index, selectedTab));
      props.openTabs(updatedOpenTabs);
    }
  }

  function getSelectedTabAfterRemove(removedItemIndex, currentTab) {
    if (removedItemIndex === currentTab) {
      return removedItemIndex > 0 ? removedItemIndex - 1 : null;
    } else if (removedItemIndex < currentTab) {
      return currentTab - 1;
    } else {
      return selectedTab;
    }
  }

  function setWorkBegan(index) {
    const updatedTabs = openTabs.slice();
    updatedTabs[index].inProgress = true;
    setOpenTabs(updatedTabs);
  }

  function setWorkEnded(index) {
    const updatedTabs = openTabs.slice();
    updatedTabs[index].inProgress = false;
    setOpenTabs(updatedTabs);
  }

  function onCloseTabRequest(index, tab) {
    setWorkEnded(index);
    removeTab(index);
    if (tab.componentClosed) {
      tab.componentClosed();
    }
  }

  return (
    <>
      {openTabs.length && (
        <Tabs selected={selectedTab} setSelected={setSelectedTab} removeTab={removeTab}>
          {openTabs.map((tab, i) => {
            return (
              <Panel key={i} title={tab.name} style={selectedTab === i ? {} : { display: 'none' }}>
                <tab.component
                  {...tab.props}
                  entryStarted={() => setWorkBegan(i)}
                  entrySubmitted={() => setWorkEnded(i)}
                  entryCancelled={() => setWorkEnded(i)}
                  closeComponent={() => onCloseTabRequest(i, tab)}
                />
              </Panel>
            );
          })}
        </Tabs>
      )}
    </>
  );
}

function Tabs(props) {
  function removeTab($event, index) {
    $event.stopPropagation();
    props.removeTab(index);
  }
  return (
    <div>
      <div className={styles.tabs}>
        {Array.isArray(props.children) ? (
          props.children.map((elem, index) => {
            return (
              <div
                key={index}
                className={`${index == props.selected ? styles.selected : styles.unselected}`}
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <div key={index} className={styles.tab}>
                  <button className="omrs-unstyled" onClick={() => props.setSelected(index)}>
                    {elem.props.title}
                  </button>
                </div>
                <button
                  onClick={$event => removeTab($event, index)}
                  className={`${styles.closeIcon} omrs-unstyled omrs-btn-icon-small`}>
                  <svg className="omrs-icon">
                    <use xlinkHref="#omrs-icon-close"></use>
                  </svg>
                </button>
              </div>
            );
          })
        ) : (
          <div className={styles.selected}>{props.children.title}</div>
        )}
      </div>
      <div className={styles.panel}>{props.children}</div>
    </div>
  );
}

function Panel(props) {
  return <div style={props.style}>{props.children}</div>;
}
