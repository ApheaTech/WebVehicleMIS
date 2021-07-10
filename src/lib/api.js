import axios from 'axios';

export function getUserList(that) {
    axios
        .get('http://127.0.0.1:9090/user/list')
        .then(response => (that.userList = response.data))
        .catch(err => (console.log(err)))
}

export function getOrgList(that) {
    axios
        .get('http://127.0.0.1:9090/org/list')
        .then(response => (that.orgList = response.data))
}

export function getDriverList(that) {
    axios
        .get('http://127.0.0.1:9090/driver/list')
        .then(response => (that.driverList = response.data))
}

export function getCarTotal(that) {
    axios
        .get('http://127.0.0.1:9090/car/total', {
            params: {
                keyString: that.keyString
            }
        }).then(response => (that.carTotal = response.data))
}

export function getCarList(that) {
    getCarTotal(that)
    axios
        .get('http://127.0.0.1:9090/car/list', {
            params: {
                start: (that.currentPage-1)*that.pageSize,
                size: that.pageSize,
                keyString: that.keyString
            }
        }).then(response => (that.tableData = response.data))
}

export function getCarTypeList(that) {
    axios
        .get('http://127.0.0.1:9090/car/type')
        .then(response => (that.carTypeList = response.data))
}

export function getCarStatusList(that) {
    axios
        .get('http://127.0.0.1:9090/car/status')
        .then(response => (that.carStatusList = response.data))
}