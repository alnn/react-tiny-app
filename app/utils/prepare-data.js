import dataRelation from '../data-relation';

export const getRelation = (entity, field) => (dataRelation[entity] || [])
  .filter((relation) => relation.entity === field)
  .pop();

export const getRelatedItem = (related, item, field) => ((related && related[field]) || [])
  .filter((relatedItem) => relatedItem.id == item[field]) // eslint-disable-line eqeqeq
  .pop() || {};
