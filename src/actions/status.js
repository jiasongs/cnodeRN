import * as types from '../constants/actionTypes'

export const loading = (loading) => {
  return {
    type: types.LOADING,
    loading
  }
}
