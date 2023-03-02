import request from "../request";

/**
 * @description: 查询权限列表
 * @param {*}
 * @return {*}
 * roleList
 */
export const getRoleList = (params) => {
  return request({
    url: "/role/page",
    method: "get",
    params,
  });
};
/**
 * @description: 通过roleId查询权限
 * @param {*}
 * @return {*}
 * role
 */
export const getRoleById = (roleId) => {
  return request({
    url: `/role/${roleId}`,
    method: "get",
  });
};
/**
 * @description: 修改权限
 * @param {*}
 * @return {*}
 * role
 */
export const updateRole = (data) => {
  return request({
    url: `/role/update`,
    method: "post",
    data,
  });
};
/**
 * @description: 新增权限
 * @param {*}
 * @return {*}
 * role
 */
export const addRole = (data) => {
  return request({
    url: `/role`,
    method: "post",
    data,
  });
};
/**
 * @description: 修改用户权限
 * @param {*}
 * @return {*}
 * role
 */
export const updateUserRole = (data) => {
  return request({
    url: `/userRole`,
    method: "post",
    data,
  });
};

/**
 * @description: 查询权限列表
 * @param {*}
 * @return {*}
 * role
 */
export const RoleList = () => {
  return request({
    url: `/role/roleList`,
    method: "get",
  });
};
