<template>
    <div class="d1">
        <!-- <h1>点菜</h1> -->

        <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">

            <el-table-column label="序号" align="center" width="150">
                <template slot-scope="scope">
                    {{
                        (searchModel.pageNo - 1) * searchModel.pageSize + scope.$index + 1
                    }}
                </template>
            </el-table-column>

            <el-table-column prop="tableNum" label="桌号" width="180">
            </el-table-column>

            <el-table-column prop="name" label="菜品名称" width="180">
            </el-table-column>

            <el-table-column prop="amount" label="数量">
            </el-table-column>

            <el-table-column prop="money" label="总金额">
            </el-table-column>

            <el-table-column prop="time" label="下单时间">
            </el-table-column>

            <el-table-column prop="remark" label="备注">
            </el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="searchModel.pageNo" :page-sizes="[10, 15, 20]" :page-size="searchModel.pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

    </div>
</template>

<script>
import orderApi from "@/api/order";

  export default {
    data() {
        return {
            searchModel: {
                pageNo: 1,
                pageSize: 15
            },
            total: 0,
            tableData: [{
                tableNum: '',
                name: '',
                amount: '',
                money: '',
                time: '',
                remark: ''
            }]
        }
    },
    methods: {
        tableRowClassName({row, rowIndex}) {
            if (rowIndex % 4 == 1) {
                return 'warning-row';
            } else if (rowIndex % 4 == 3) {
                return 'success-row';
            }
            return '';
        },
        getOrderList() {
            orderApi.getOrderList(this.searchModel).then((response) => {
                this.tableData = response.data.rows;
                this.total = response.data.total;
                // console.log(this.tableData)
            });
        },
        handleSizeChange(pageSize) {
            this.searchModel.pageSize = pageSize;
            this.getOrderList();
        },
        handleCurrentChange(pageNo) {
            this.searchModel.pageNo = pageNo;
            this.getOrderList();
        },
      
    },
    created() {
        this.getOrderList();
    }
  }
</script>

<style>
    .d1 {
        margin-top: 5px;
    }
    .el-table .warning-row {
        background: #f5f7fa;
    }

    .el-table .success-row {
        /* background: #f0f9eb; */
        background: #f5f7fa;
    }
</style>
