// src/api/address/index.ts

import api from '../client';

// 请求类型
import type { CreateAddressRequest } from './request/create';
import type { UpdateAddressRequest } from './request/update';
import type { DeleteAddressRequest } from './request/delete';
import type { SetDefaultAddressRequest } from './request/setDefault';

// 响应类型
import type { ListAddressResponseData } from './response/ListResponse';
import type { CreateAddressResponseData } from './response/CreateResponse';
import type { UpdateAddressResponseData } from './response/UpdateResponse';
import type { DeleteAddressResponseData } from './response/DeleteResponse';
import type { SetDefaultAddressResponseData } from './response/SetDefaultResponse';

/**
 * 收货地址相关 API
 */
export class AddressApi {
  /**
   * 获取用户所有收货地址（GET）
   */
  static getList() {
    return api.get<ListAddressResponseData>('/address/list');
  }

  /**
   * 新增收货地址
   */
  static create(data: CreateAddressRequest) {
    return api.post<CreateAddressResponseData>('/address/create', data);
  }

  /**
   * 修改收货地址
   */
  static update(data: UpdateAddressRequest) {
    return api.post<UpdateAddressResponseData>('/address/update', data);
  }

  /**
   * 删除收货地址
   */
  static delete(data: DeleteAddressRequest) {
    return api.post<DeleteAddressResponseData>('/address/delete', data);
  }

  /**
   * 设置默认地址
   */
  static setDefault(data: SetDefaultAddressRequest) {
    return api.post<SetDefaultAddressResponseData>('/address/setDefault', data);
  }
}

// 便捷导出
export const {
  getList,
  create,
  update,
  delete: remove,  // 避免与关键字冲突
  setDefault
} = AddressApi;
