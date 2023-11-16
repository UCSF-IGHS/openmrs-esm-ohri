export const generateInfantPTrackerId = (
    fieldId: string,
    motherPtrackerId: string
  ): string => {
    try {
      if (typeof fieldId !== 'string' || typeof motherPtrackerId !== 'string') {
        throw new Error('Invalid input types');
      }
  
      if (fieldId === "infantPtrackerid") {
        return motherPtrackerId + "1";
      } else if (fieldId.includes("_")) {
        const position = fieldId.split("_")[1];
        if (position && !isNaN(Number(position))) {
          return motherPtrackerId.concat(position);
        }
      }
  
      return;;
    } catch (error) {
      return;; 
    }
  };
  