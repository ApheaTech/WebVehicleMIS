<template>
    <div id="app-carinfo">
        <el-row class="query-bar">
            <el-col :span="11">
                <el-form :inline="true" label-width="70px">
                    <el-form-item label="组织">
                        <el-select v-model="selectOrg" clearable placeholder="请选择">
                            <el-option
                                v-for="item in orgList"
                                :key="item.orgID"
                                :label="item.orgName"
                                :value="item.orgID">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关键字">
                        <el-input v-model="keyString" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="el-icon-search" circle @click="queryCarList"></el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="8" :offset="0">
                <el-button type="primary" @click="visibleAddDialog">新增车辆</el-button>
                <el-button type="success" class="el-icon-upload2" @click="dialogAddVisible = true">导入</el-button>
                <el-button type="success" class="el-icon-download" @click="dialogAddVisible = true">导出</el-button>
                <el-button type="danger" @click="dialogAddVisible = true">删除已选中</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table
                    :data="carList"
                    border
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="80px"
                        min-width="10%"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        label="序号"
                        type="index"
                        width="80px"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="carNumber"
                        label="车牌号"
                        width="180px"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="orgName"
                        label="组织"
                        width="180px"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="driverName"
                        label="驾驶员"
                        width="180px"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="carTypeLabel"
                        label="类型"
                        width="180px"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="carStatusLabel"
                        label="状态"
                        width="180px"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="carPatchStatus"
                        label="调度状态"
                        width="180px"
                        align="center"
                        :formatter="dispatchStatusFormatter">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        min-width="100%"
                        align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="visibleShowDialog(scope.row)" size="small">查看</el-button>
                            <el-button type="text" @click="visibleEditDialog(scope.row)" size="small">编辑</el-button>
                            <el-button type="text" @click="deleteCar(scope.row)" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row>
            <el-pagination
                background
                @current-change="currentPageChange"
                :current-page="currentPage"
                layout="prev, pager, next"
                :total="carTotal"
                style="margin-top: 30px">
            </el-pagination>
        </el-row>
        <!-- 操作车辆 -->
        <el-dialog :title="operateDialogTitle" :visible.sync="operateDialogVisible" width="600px">
            <el-form :model="operateCarForm" ref="operateCarForm" label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="车牌号" required>
                            <el-input v-model="operateCarForm.carNumber" :disabled="operateDisable"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="状态">
                            <el-select v-model="operateCarForm.carStatus" clearable placeholder="请选择"
                                       :disabled="operateDisable">
                                <el-option
                                    v-for="item in carStatusList"
                                    :key="item.carStatusValue"
                                    :label="item.carStatusLabel"
                                    :value="item.carStatusValue">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="所属组织">
                            <el-select v-model="operateCarForm.orgID" clearable placeholder="请选择" style="width: 100%"
                                       :disabled="operateDisable">
                                <el-option
                                    v-for="item in orgList"
                                    :key="item.orgID"
                                    :label="item.orgName"
                                    :value="item.orgID">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="驾驶员">
                            <el-select v-model="operateCarForm.driverID" clearable placeholder="请选择"
                                       :disabled="operateDisable">
                                <el-option
                                    v-for="item in driverList"
                                    :key="item.driverID"
                                    :label="item.driverName"
                                    :value="item.driverID">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="车辆类型">
                            <el-select v-model="operateCarForm.carType" placeholder="请选择" :disabled="operateDisable">
                                <el-option
                                    v-for="item in carTypeList"
                                    :key="item.carTypeValue"
                                    :label="item.carTypeLabel"
                                    :value="item.carTypeValue">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelOperate">取消</el-button>
                <el-button @click="submitOperate" type="primary">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import {getCarList, getOrgList, getDriverList, getCarTypeList, getCarStatusList} from "@/lib/api";

export default {
    data() {
        return {
            selectOrg: '',
            keyString: '',

            carList: [],
            orgList: [],
            driverList: [],
            carTypeList: [],
            carStatusList: [],

            operateDialogVisible: false,
            operateDisable: false,
            dialogTitle: '',
            operateCarForm: {},

            currentPage: 1,
            pageSize: 10,
            carTotal: 0
        }
    },
    created() {
        getCarList(this)
        getOrgList(this)
        getDriverList(this)
        getCarTypeList(this)
        getCarStatusList(this)
    },
    methods: {
        queryCarList() {
            getCarList(this)
        },
        currentPageChange(val) {
            this.currentPage = val
            getCarList(this)
        },
        visibleAddDialog() {
            this.operateDisable = false,
            this.operateDialogVisible = true,
            this.operateDialogTitle = '新增车辆'
        },
        visibleEditDialog(row) {
            console.log(this.operateCarForm)
            this.operateDisable = false,

            this.operateDialogTitle = '编辑车辆',
            this.operateCarForm.carID = row.carID,
            this.operateCarForm.carNumber = row.carNumber,
            this.operateCarForm.carStatus = row.carStatus,
            this.operateCarForm.orgID = row.orgID,
            this.operateCarForm.driverID = row.driverID,
            this.operateCarForm.carType = row.carType

            this.operateDialogVisible = true
        },
        visibleShowDialog(row) {
            this.operateDisable = true,
            this.operateDialogVisible = true,
            this.operateDialogTitle = '车辆信息',
            this.operateCarForm.carID = row.carID,
            this.operateCarForm.carNumber = row.carNumber,
            this.operateCarForm.carStatus = row.carStatus,
            this.operateCarForm.orgID = row.orgID,
            this.operateCarForm.driverID = row.driverID,
            this.operateCarForm.carType = row.carType
        },
        deleteCar(row) {
            console.log(row.carID)
            axios
                .delete('http://127.0.0.1:9090/car/', {
                    params: {
                        carID: row.carID
                    }
                }).then(
                getCarList(this),
                getCarList(this)
            )
        },
        submitOperate() {
            if (this.operateDialogTitle === '新增车辆') {
                axios.post('http://127.0.0.1:9090/car/', this.operateCarForm
                ).then(
                    this.operateDialogVisible = false,

                    this.operateCarForm.carID = '',
                    this.operateCarForm.carNumber = '',
                    this.operateCarForm.carStatus = '',
                    this.operateCarForm.orgID = '',
                    this.operateCarForm.driverID = '',
                    this.operateCarForm.carType = '',

                    this.getCarList(),
                    this.getCarList()
                ).catch(err => {
                    console.log(err)
                })
            } else if (this.operateDialogTitle === '编辑车辆') {
                axios.put('http://127.0.0.1:9090/car/', this.operateCarForm
                ).then(
                    this.operateDialogVisible = false,

                    this.operateCarForm.carNumber = '',
                    this.operateCarForm.carStatus = '',
                    this.operateCarForm.orgID = '',
                    this.operateCarForm.driverID = '',
                    this.operateCarForm.carType = '',

                    this.getCarList(),
                    this.getCarList()
                ).catch(err => {
                    console.log(err)
                })
            } else if (this.operateDialogTitle === '车辆信息') {
                this.operateDialogVisible = false,

                this.operateCarForm.carNumber = '',
                this.operateCarForm.carStatus = '',
                this.operateCarForm.orgID = '',
                this.operateCarForm.driverID = '',
                this.operateCarForm.carType = ''
            }
        },
        cancelOperate() {
            this.operateDialogVisible = false,

            this.operateCarForm.carNumber = '',
            this.operateCarForm.carStatus = '',
            this.operateCarForm.orgID = '',
            this.operateCarForm.driverID = '',
            this.operateCarForm.carType = ''
        },
        dispatchStatusFormatter(row) {
            if (row.carDispatchStatus === 0) {
                return "未调度"
            } else {
                return "已调度"
            }
        }
    }
}
</script>

<style>
@import "../../../style/global.css";

#app-carinfo {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
}
</style>