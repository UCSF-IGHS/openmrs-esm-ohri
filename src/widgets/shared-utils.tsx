export function openWorkspaceTab<TProps = DataCaptureComponentProps, TParams = any>(
  componentToAdd: React.FC<TProps>,
  componentName: string,
  params?: TParams,
  requiresVisit = true,
): void {
  // TODO
  throw new Error('TODO! Restore visit functionality.');
}

export type DataCaptureComponentProps = {
  entryStarted: () => void;
  entrySubmitted: () => void;
  entryCancelled: () => void;
  closeComponent: () => void;
};
