/*
 * @Description: 
 * @Date: 2022-11-25 20:42:21
 * @LastEditTime: 2023-02-06 09:08:37
 * @FilePath: \vue_test\src\utils\commonUtils.js
 */
/*
 * @Description: 
 * @Date: 2022-11-25 20:42:21
 * @LastEditTime: 2022-11-25 22:00:54
 * @FilePath: \vue_test\src\utils\commonUtils.js
 */

export default {
    /**
     * @description: 
     * 获取用户权限路由
     * @event:  
     * asyncRoutes roleRoutes 
     * @return 
     * userRoutes
     */
    getUserRoutes(asyncRoutes, roleRoutes) {
        if (Array.isArray(asyncRoutes) && Array.isArray(roleRoutes)) {
            asyncRoutes = asyncRoutes.filter((v) => {
                if (roleRoutes.indexOf(v.id) != -1) {

                    if (v.children && v.children.length != 0) {

                        v.children = this.getUserRoutes(v.children, roleRoutes)

                    }
                    return true
                }

            })
            return asyncRoutes

        } else {
            throw new Error("两个参数都必须是数组")
        }
    },
    /**
     * @description: 
     * 下载文件
     * @event: 
     * fileName,res(blob二进制流),this(vue实例)
     * @return 
     * 
     */
    download(url, name, blob) {
        let href = "";
        const downloadElement = document.createElement("a");
        downloadElement.download = name || +new Date() + ".txt"; // 下载后文件名
        url && (downloadElement.href = url);

        if (blob) {
            href = window.URL.createObjectURL(blob); // 创建下载的链接
            downloadElement.href = href;
        }
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); // 下载完成移除元素
        blob && href && window.URL.revokeObjectURL(href); // 释放掉blob对象
    },


    // 下载文件时，失败时，需要提示后台信息，成功则下载文件
    my_download(fileName, res, that) {
        const resData = res;
        if (res.type === "application/json") {
            // 说明是普通对象数据，读取信息
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                const jsonData = JSON.parse(fileReader.result);
                // 后台信息
                that.$confirm(jsonData.msg, "提示", {
                    confirmButtonText: "确定",
                    showCancelButton: false,
                    type: "warning",
                })
                    .then(() => { })
                    .catch(() => { });
            };
            fileReader.readAsText(resData);
        } else {
            this.download(
                "",
                fileName,
                res
            );

        }
    },
    /**
     * @description: 
     * 获取当前时间
     * @event: 
     * option ==> tab 分隔符，week，是否返回星期，sfm 是否返回时分秒
     * @return { }
     * yyyy-MM-dd
     */
    getTime: function (option) {
        let time = +new Date
        let result = undefined
        let tab = option && option.tab ? option.tab : "-"
        let date = new Date(time)
        let Y = date.getFullYear()

        let M = date.getMonth() + 1 <= 9 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1

        let D = date.getDate() <= 9 ? "0" + date.getDate() : date.getDate()
        result = Y + tab + M + tab + D
        if (option && option.sfm) {
            let hour = date.getHours() <= 9 ? "0" + date.getHours() : date.getHours()
            let minutes = date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes()
            let seconds = date.getSeconds() <= 9 ? "0" + date.getSeconds() : date.getSeconds()
            let sfm = `${hour}:${minutes}:${seconds}`
            result = result + " " + sfm
        }
        if (option && option.week) {
            let W = date.getDay()
            let arr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
            result = result + " " + arr[W]
        }


        return result
    },
    /**
     * @description: 
     * 深拷贝
     * @event: 
     * object
     * @return {*}
     * deepObject
     */
    deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj))
    }
,

    routersConcat(constantRoutes, roleRoutes) {
        for (let j = 0; j < roleRoutes.length; j++) {         
            if (roleRoutes[j].meta.appendChildren) {         
                for (let index = 0; index < constantRoutes.length; index++) {
                    if (constantRoutes[index].path == roleRoutes[j].path) {
                        constantRoutes[index].children = constantRoutes[index].children.concat(roleRoutes[j].children)
                        break;
                    }
                }
            } else {
                constantRoutes.push(roleRoutes[j])
            }
        }
        return constantRoutes;
    }

}
