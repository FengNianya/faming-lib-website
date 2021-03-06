import {
  getDB,
  getOneFromBD,
  updateOneInDB,
  addOneToDBWithoutId,
  genMatchQuery,
  resolveMultiResults
} from '../utils/dbUtils';
import _omit from 'lodash/omit'; 

const DB = getDB();

export const addNews = request =>
  addOneToDBWithoutId({
    ...request.payload,
    createTime: new Date().getTime(),
    visitTimes: 0,
    deleted: 0
  }, 'news');

export const getNewByTitle = async params => {
  try {
    const resp = await DB.search({
      index: 'news',
      type: 'data',
      body: {
        query: {
          bool: {
            must_not: {
              term: {
                deleted: 1 // 搜索对应没有删除的，删除的为1，没删除的为0
              }
            },
            must: {
              match: {
                ...genMatchQuery(params.params)
              }
            }
          }
        }
      }
    });
    return {
      res: 'success',
      msg: resolveMultiResults(resp),
    }
  } catch(err) {
    return {
      res: 'error',
      msg: err
    }
  }
}

export const getNewsById = params =>
  getOneFromBD({index: 'news', id: params.params.id});

export const deleteNewsById = request => {
  const { id } = request.payload;
  return updateOneInDB({
    index: 'news',
    id,
    doc: { deleted: 1 }
  })
}

export const updateNewsById = request => {
  const {
    id
  } = request.payload;
  return updateOneInDB({
    index: 'news',
    id,
    doc: {
      ..._omit(request.payload, ['id'])
    },
  })
} 