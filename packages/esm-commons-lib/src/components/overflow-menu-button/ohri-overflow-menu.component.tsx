import React, { useState, useCallback, useEffect, useRef } from 'react';
import styles from './ohri-overflow-menu.scss';
import { useTranslation } from 'react-i18next';
import { applyFormIntent } from '@ohri/openmrs-ohri-form-engine-lib';
import { Button } from '@carbon/react';

interface OverflowMenuProps {
  menuTitle: React.ReactNode;
  overflowItems: Array<any>;
  launchForm?: (formJson?: any, intent?: string) => void;
  formJson?: any;
}

export const OHRIOverflowMenu: React.FC<OverflowMenuProps> = ({ menuTitle, overflowItems, launchForm, formJson }) => {
  const { t } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const wrapperRef = useRef(null);
  const toggleShowMenu = useCallback(() => setShowMenu((state) => !state), []);

  useEffect(() => {
    /**
     * Toggle showMenu if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className={`cds--overflow-menu ${styles.overflowMenuContainer}`} ref={wrapperRef}>
      {overflowItems.length > 0 ? (
        <>
          <button
            className={`cds--overflow-menu__trigger ${showMenu && 'cds--overflow-menu--open'}`}
            aria-haspopup="true"
            aria-expanded={showMenu}
            id="custom-actions-overflow-menu-trigger"
            aria-controls="custom-actions-overflow-menu"
            onClick={toggleShowMenu}
            style={{
              width: 'auto',
              height: 'auto',
              padding: '1rem',
              color: '#0f62fe',
              outline: '2rem solid transparent',
              boxShadow: showMenu ? '0 2px 6px 0 rgb(0 0 0 / 30%)' : 'none',
            }}>
            {menuTitle}
          </button>
          <div
            className="cds--overflow-menu-options cds--overflow-menu--flip"
            tabIndex={0}
            data-floating-menu-direction="bottom"
            role="menu"
            aria-labelledby="custom-actions-overflow-menu-trigger"
            id="custom-actions-overflow-menu"
            style={{
              display: showMenu ? 'block' : 'none',
              top: '3.125rem',
              minWidth: 'initial',
              left: 'auto',
              right: '0',
              backgroundColor: '#f4f4f4',
              marginRight: '0.2rem',
              boxShadow: '0 6px 6px rgb(0 0 0 / 30%)',
              width: '13rem',
            }}>
            <ul className="cds--overflow-menu-options__content">
              {overflowItems.map((item) => {
                return item.availableIntents.map((intent, index) => {
                  return (
                    <li className="cds--overflow-menu-options__option" id={'item-' + index} key={index}>
                      <button
                        id={'menuItem-' + index}
                        className="cds--overflow-menu-options__btn"
                        role="menuitem"
                        title={intent.display}
                        onClick={(e) => {
                          e.preventDefault();
                          const processedForm = applyFormIntent(intent, item.formJson);
                          launchForm(processedForm, intent.display);
                          setShowMenu(false);
                        }}
                        style={{
                          maxWidth: '100vw',
                        }}>
                        <span className="cds--overflow-menu-options__option-content">{intent.display}</span>
                      </button>
                    </li>
                  );
                });
              })}
            </ul>
            <span />
          </div>
        </>
      ) : (
        <Button
          size="small"
          kind="ghost"
          onClick={(e) => {
            e.preventDefault();
            const processedForm = applyFormIntent(overflowItems[0].intent, formJson);
            launchForm(processedForm);
          }}
          style={{
            width: 'auto',
            height: 'auto',
            padding: '1rem',
            color: '#0f62fe',
            outline: '2rem solid transparent',
            boxShadow: showMenu ? '0 2px 6px 0 rgb(0 0 0 / 30%)' : 'none',
          }}>
          {menuTitle}
        </Button>
      )}
    </div>
  );
};
