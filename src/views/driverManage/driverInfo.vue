<template>
    <div id="app">
      <el-row class="query-bar">
        <el-col :span="2" :offset="1">
          <el-button type="primary" @click="dialogAddVisible = true">新增驾驶员</el-button>
        </el-col>
      </el-row>
      <el-row>
            <el-col :span="24">
              <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                  prop="driverName"
                  label="驾驶员姓名"
                  width="180"
                  fixed>
              </el-table-column>
              <el-table-column
                  prop="phone"
                  label="联系电话">
              </el-table-column>
              <el-table-column
                  prop="orgName"
                  label="所属部门">
              </el-table-column>
              <el-table-column
                  prop="gender"
                  label="性别"
                  :formatter="formatter">
              </el-table-column>
              <!-- <el-table-column
                  prop="active"
                  label="激活"
                  :formatter="formatter">
              </el-table-column> -->
              <el-table-column
                  fixed="right"
                  label="操作"
                  width="250">
                  <template slot-scope="scope">
                    <el-button type="primary" size="small">查看</el-button>
                    <el-button type="success" @click="editCar(scope.row)" size="small">编辑</el-button>
                    <el-button type="danger" @click="deleteCar(scope.row)" size="small">删除</el-button>
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
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      tableData: [],
      orgList: []
    }
  },
  created(){
    this.getOrgList()
    this.getDriverList()
  },
  methods: {
    getOrgList() {
      axios
        .get('http://127.0.0.1:9090/org/list')
        .then(response => (this.orgList = response.data))
    },
    getDriverList() {
      axios
        .get('http://127.0.0.1:9090/driver/list')
        .then(response => (this.tableData = response.data))
    },
    // formatter(row) {
    //   // console.log(column)
    //   if(row.active === true) {
    //     return "激活"
    //   }else {
    //     return "已删除"
    //   }
    // }
    formatter(row, column) {
      console.log(column)
      console.log(row)
      if(row.gender === true) {
        return "男"
      }else {
        return "女"
      }
    },
  }
}
</script>

<style>

</style>