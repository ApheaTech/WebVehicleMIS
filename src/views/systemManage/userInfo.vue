<template>
    <div id="app-userinfo">
        <el-row class="query-bar">
            <el-col :span="6">
                <el-form :inline="true" label-width="70px">
                    <el-form-item label="关键字">
                        <el-input v-model="keyString" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button icon="el-icon-search" circle></el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="3" :offset="0">
                <el-button type="primary" @click="dialogAddVisible = true">新增用户</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="3">
                <el-tree :data="orgTree"
                         :props="defaultProps"
                         @node-click="handleNodeClick"
                         node-key="ID"
                         highlight-current="true"
                         default-expand-all="true">
                </el-tree>
            </el-col>
            <el-col :span="20" :offset="1">
                <el-table
                    :data="userList"
                    border
                    style="width: 100%">
                    <el-table-column
                        type="index"
                        width="50"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="userName"
                        label="用户名"
                        width="180"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="userAccount"
                        label="账号"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="orgName"
                        label="组织"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="手机号"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="gender"
                        label="性别"
                        :formatter="formatter"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="250"
                        align="center">
                        <template slot-scope="scope">
                            <el-button type="text" size="small">查看</el-button>
                            <el-button type="text" @click="editUser(scope.row)" size="small">编辑</el-button>
                            <el-button type="text" @click="dialogDeleteVisible = true" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>

        </el-row>
        <el-dialog title="新增用户" :visible.sync="dialogAddVisible" width="25%">
            <el-form :model="addUserForm" ref="addOrgForm">
                <el-form-item label="用户名" required>
                    <el-input v-model="addUserForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="账号" required>
                    <el-input v-model="addUserForm.userAccount"></el-input>
                </el-form-item>
                <el-form-item label="组织">
                    <el-select v-model="addUserForm.orgID" clearable placeholder="请选择">
                        <el-option
                            v-for="item in orgList"
                            :key="item.orgID"
                            :label="item.orgName"
                            :value="item.orgID">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="addUserForm.gender" clearable placeholder="请选择">
                        <el-option label="男" value=true></el-option>
                        <el-option label="女" value=false></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddVisible = false">取消</el-button>
                <el-button type="primary" @click="submitAddUser">确认</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="删除用户"
            :visible.sync="dialogDeleteVisible"
            width="30%"
            center>
            <span>是否确认删除用户</span>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogDeleteVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteUser(row)">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import {getUserList, getOrgTree} from '@/lib/api'

export default {
    data() {
        return {
            userList: [],
            orgList: [],
            dialogAddVisible: false,
            dialogDeleteVisible: false,
            addUserForm: {},
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            orgTree: []
        }
    },
    created() {
        getUserList(this)
        getOrgTree(this)
    },
    methods: {
        formatter(row) {
            if (row.gender === true) {
                return "男"
            } else {
                return "女"
            }
        },
        deleteUser(row) {
            console.log(row.carID)
            axios
                .delete('http://127.0.0.1:9090/user/', {
                    params: {
                        userID: row.userID
                    }
                }).then(
                this.getUserList(),
                this.getUserList())
        },
        submitAddUser() {
            // this.addUserForm.active = true
            axios.post('http://127.0.0.1:9090/user/', this.addUserForm
            ).then(
                this.dialogAddVisible = false,
                this.getUserList(),
                this.getUserList()
            ).catch(err => {
                console.log(err)
            })
        }
    }

}
</script>

<style>

</style>