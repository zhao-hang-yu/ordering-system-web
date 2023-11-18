import request from '@/utils/request'

export default {
  getFoodList(searchModel) {
    return request({
      url: '/menu/foodlist', 
      method: 'get',
      params: {
        foodName: searchModel.foodName,
        foodType: searchModel.foodType,
        pageNo: searchModel.pageNo,
        pageSize: searchModel.pageSize
      }
    });
  },
  addFood(menuForm) {
    return request({
      url: '/menu',
      method: 'post',
      data: menuForm
    })
  },
  selectById(id) {
    return request({
      url: '/menu/selectById',
      method: 'get',
      params: {
        foodId: id
      }
    });
  },
  deleteById(id) {
    return request({
      url: '/menu',
      method: 'delete',
      params: {
        foodId: id
      }
    });
  },
}