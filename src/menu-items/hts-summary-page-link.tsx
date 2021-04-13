
import { ConfigurableLink } from "@openmrs/esm-framework";
import React from "react";
import { useTranslation } from "react-i18next";

export default function() {
  const { t } = useTranslation();

  return (
    <ConfigurableLink
      to={`hts-summary-page`}
      className="bx--side-nav__link"
    >
      {t("HTS summary page", "HTS summary page")}
    </ConfigurableLink>
  );
}
