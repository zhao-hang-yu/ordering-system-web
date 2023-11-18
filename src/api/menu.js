import request from '@/utils/request'

export default {
  getMenuList(searchModel) {
    return request({
      url: '/menu/list', 
      method: 'get',
      params: {
        foodName: searchModel.foodName,
        foodType: searchModel.foodType,
        pageNo: searchModel.pageNo,
        pageSize: searchModel.pageSize,
        state: 1
      }
    });
  },
  goToOrder(tableSubmit) {
    return request({
      url: '/order',
      method: 'post',
      data: tableSubmit
    });
  },
  getTableInfo(tableInfo) {
    return request({
      url: '/order/info',
      method: 'post',
      params: {
        tableNum: tableInfo.num,
        remark: tableInfo.remark
      }
    });
  }
}