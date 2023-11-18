<template>
    <div class="d1">
        <!-- <h1>点菜</h1> -->
        <!-- 搜索栏 -->
        <el-card id="search">
            <el-row>
                <el-col :span="20">
                    菜品名称：<el-input v-model="searchModel.foodName" placeholder="菜品名称" clearable></el-input>
                    菜品类型：<el-input v-model="searchModel.foodType" placeholder="菜品类型" clearable></el-input>
                    <el-button type="success" @click="getMenuList" round icon="el-icon-search">查询</el-button>
                </el-col>
                <el-col :span="4">
                    <el-button @click="openTableNumUI()" type="success" icon="el-icon-finished" round>结算</el-button>
                </el-col>
            </el-row>
        </el-card>

        <!-- 查询结果表格 -->
        <el-table :data="tableData" stripe style="width: 100%">

            <el-table-column label="序号" align="center" width="150">
                <template slot-scope="scope">
                    {{
                        (searchModel.pageNo - 1) * searchModel.pageSize + scope.$index + 1
                    }}
                </template>
            </el-table-column>

            <el-table-column prop="name" label="菜品名称" width="120">
            </el-table-column>

            <el-table-column prop="picture" label="菜品展示" align="center" width="300">
                <template slot-scope="scope">
                    <img :src="scope.row.picture" min-width="70" height="100" />
                </template>
            </el-table-column>

            <el-table-column prop="type" label="菜品类型" width="200">
            </el-table-column>

            <el-table-column prop="price" label="菜品价格" width="200">
            </el-table-column>

            <el-table-column prop="state" label="售卖状态" width="200">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.state == 1">售卖</el-tag>
                    <el-tag v-else type="danger">停售</el-tag>
                </template>
            </el-table-column>

            <el-table-column align="right" label="" width="100px;">
                <template slot-scope="scope">
                    <el-row>
                        <el-button type="primary" @click="addAmount(scope.row)" icon="el-icon-plus" circle></el-button>
                    </el-row>
                </template>
            </el-table-column>

            <el-table-column prop="amount" label="数量" width="50" align="center">
            </el-table-column>

            <el-table-column align="left" label="" width="100px;">
                <template slot-scope="scope">
                    <el-row>
                        <el-button type="danger" @click="cutAmount(scope.row);" icon="el-icon-minus" circle></el-button>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="searchModel.pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="searchModel.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <!-- 表单收集tableNum -->
        <el-dialog @close="clearForm" :title="title" :visible.sync="dialogFormVisible">
            <el-form :model="tableInfo" ref="tableInfoRef" class="demo-form-inline" :rules="rules">
                <el-form-item label="桌号：" prop='num' :label-width="formLabelWidth">
                    <el-input v-model="tableInfo.num"></el-input>
                </el-form-item>
                <el-form-item label="备注：" prop='remark' :label-width="formLabelWidth">
                    <el-input v-model="tableInfo.remark"></el-input>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="goToOrder">确 定</el-button>
                </el-form-item>
                <!-- <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="goToOrder">确 定</el-button>
                </div> -->
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import menuApi from "@/api/menu";

export default {
    data() {
        return {
            searchModel: {
                foodName: null,
                foodType: null,
                pageNo: 1,
                pageSize: 5
            },
            total: 100,
            tableData: [{
                name: "name",
                picture: "picture",
                type: "type",
                price: "price",
                state: "state",
                // amount: 0
            }],
            tableSubmit: [{
                id: '',
                name: '',
                price: '',
                amount: ''
            }],
            tableInfo: {
                num: '',
                remark: ''
            },
            dialogFormVisible: false,
            formLabelWidth: '200px',
            title: '填写信息',
            rules: {
                num: [
                    { required: true, message: "请输入桌号", trigger: "blur" }
                ]
            },

        }
    }, 
    methods: {
        getMenuList() {
            menuApi.getMenuList(this.searchModel, this.tableInfo).then((response) => {
                // 添加amount列 值为0
                this.tableData = response.data.rows.map(item => {
                    return {
                        ...item,
                        amount: 0
                    };
                });
                this.total = response.data.total;
                // 对amount的修改放到then里面 不然修改页面后再返回表格数据会变成0
                for(let i = 0; i < this.tableSubmit.length; i++) {
                    for(let j = 0; j < this.tableData.length; j++) {
                        if(this.tableSubmit[i].id == this.tableData[j].id) {
                            this.$set(this.tableData[j], 'amount', this.tableSubmit[i].amount);
                        }
                    }
                }
            });
            console.log(this.tableData);
        },
        handleSizeChange(pageSize) {
            this.searchModel.pageSize = pageSize;
            this.getMenuList();
            // 数据强制刷新 但是会一定程度影响程序效率
            // this.$forceUpdate();
        },
        handleCurrentChange(pageNo) {
            this.searchModel.pageNo = pageNo;
            this.getMenuList();
            // this.$forceUpdate();
        },
        addAmount(val) {
            val.amount += 1;
            let flag = 0;
            for(let i = 0; i < this.tableSubmit.length; i++) {
                if(this.tableSubmit[i].id == val.id) {
                    this.tableSubmit[i].amount = val.amount;
                    flag = 1;
                    break;
                }
            }
            if(flag == 0) {
                this.tableSubmit.push({id: val.id, name: val.name, price: val.price, amount: val.amount})
            }
            // console.log(val.amount);
        },
        cutAmount(val) {
            if (val.amount > 0) {
                val.amount -= 1;
                for(let i = 0; i < this.tableSubmit.length; i++) {
                    if(this.tableSubmit[i].id == val.id) {
                        this.tableSubmit[i].amount = val.amount;
                        break;
                    }
                }
            } else {
                this.$message.error('数量为0,不能减少');
            }
            // console.log(val.amount);
        },
        goToOrder() {
            // 触发表单验证
            this.$refs.tableInfoRef.validate((valid) => {
                if (valid) {
                    console.log('table:' + this.tableInfo);
                    
                    // 提交请求给后台
                    contentType: "application/json;charset=UTF-8";
                    menuApi.goToOrder(this.tableSubmit).then((response) => {
                        if(response.code == 20000) {
                            menuApi.getTableInfo(this.tableInfo).then((response) => {
                                if(response.code == 20000) {
                                    this.$message.success("下单成功");
                                    this.dialogFormVisible = false
                                    // 刷新表格
                                    this.getMenuList();
                                } else {
                                    this.$message.error('下单失败');
                                }
                            });
                        } else {
                            this.$message.error('下单失败');
                        }
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });

            
        },
        openTableNumUI() {
            this.dialogFormVisible = true;
        },
        clearForm() {
            this.tableInfo = {};
            this.$refs.tableInfoRef.clearValidate();
        }
    },
    created() {
        this.getMenuList();
    }
};
</script>

<style lang="scss" scoped>
    .d1 {
        margin-top: 5px;
    }
    #search .el-input {
        width: 200px;
        margin-right: 10px;
    }

    .el-dialog .el-input {
        width: 80%;
    }

    #search {
        padding-left: 35px;
    }
</style>
