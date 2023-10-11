export const generateInfantPTrackerId = (
    fieldId: string,
    motherPtrackerId: string
  ): string | undefined => {
    if (!fieldId || !motherPtrackerId) return;
    return fieldId === "infantPtrackerid"
      ? motherPtrackerId + "1"
      : fieldId.includes("_")
      ? motherPtrackerId.concat(fieldId.split("_")[1])
      : undefined;
  };