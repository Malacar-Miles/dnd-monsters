export type GetImageUrlFunction = (entityIndex: string) => string;

export type SearchableEntity = {
  entityType: string;
  fallbackImageUrl: string;
  getImageUrlFunction?: GetImageUrlFunction;
};
