<template>
    <div id="app">
      <el-row class="query-bar">
        <el-col :span="2" :offset="1">
          <el-button type="primary" @click="dialogAddVisible = true">新增组织</el-button>
        </el-col>
      </el-row>
      <el-row>
            <el-col :span="12" :offset="6">
              <el-table
              :data="orgList"
              border
              style="width: 100%">
              <el-table-column
                  prop="orgName"
                  label="组织名称"
                  width="180"
                  fixed>
              </el-table-column>
              <el-table-column
                  prop="parentOrgName"
                  label="所属组织"
                  width="180"
                  fixed>
              </el-table-column>
              <el-table-column
                  fixed="right"
                  label="操作"
                  width="250">
                  <template slot-scope="scope">
                    <el-button type="text" size="small">查看</el-button>
                    <el-button type="text" @click="editCar(scope.row)" size="small">编辑</el-button>
                    <el-button type="text" @click="dialogDeleteVisible = true" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
        </el-row>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>
        <el-dialog title="新增组织" :visible.sync="dialogAddVisible" width="25%">
          <el-form :model="addOrgForm" ref="addOrgForm">
            <el-form-item label="组织名称" required>
              <el-input v-model="addOrgForm.orgName"></el-input>
            </el-form-item>
            <el-form-item label="所属组织">
              <el-select v-model="addOrgForm.parentOrgID" clearable placeholder="请选择">
                <el-option
                  v-for="item in orgList"
                  :key="item.orgID"
                  :label="item.orgName"
                  :value="item.orgID">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogAddVisible = false">取消</el-button>
            <el-button type="primary" @click="submitAddOrg">确认</el-button>
          </div>
        </el-dialog>
        <el-dialog
          title="删除用户"
          :visible.sync="dialogDeleteVisible"
          width="30%"
          center>
          <span>是否确认删除用户</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      tableData: [],
      orgList: [],
      addOrgForm: {},
      dialogAddVisible: false,
      dialogDeleteVisible: false
    }
  },
  created(){
    this.getOrgList()
  },
  methods: {
    getOrgList() {
      axios
        .get('http://127.0.0.1:9090/org/list')
        .then(response => (this.orgList = response.data))
    },
    deleteOrg(row) {
      console.log(row.carID)
      axios
        .delete('http://127.0.0.1:9090/org/', {
          params: {
            orgID: row.orgID
          }
        }).then(
          this.getCarList(),
          this.getCarList())
    },
    submitAddOrg() {
      axios.post('http://127.0.0.1:9090/org/', this.addOrgForm
      ).then(
        this.dialogAddVisible = false,
        this.getOrgList(),
        this.getOrgList()
      ).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>