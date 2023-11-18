<template>
    <div class="d1">
        <!-- <h1>菜品管理</h1> -->
        <!-- <el-divider><i class="el-icon-mobile-phone"></i></el-divider> -->
        <!-- 搜索栏 -->
        <el-card id="search">
            <el-row>
                <el-col :span="20">
                    菜品名称：<el-input v-model="searchModel.foodName" placeholder="菜品名称" clearable></el-input>
                    菜品类型：<el-input v-model="searchModel.foodType" placeholder="菜品类型" clearable></el-input>
                    <el-button type="success" @click="getFoodList" round icon="el-icon-search">查询</el-button>
                </el-col>
                <el-col :span="4">
                    <el-button @click="openEditUI(null)" type="success" icon="el-icon-plus" round>添加菜品</el-button>
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

            <el-table-column align="center" label="操作" width="300px;">
                <template slot-scope="scope">
                    <el-row>
                        <el-button type="primary" @click="selectById(scope.row)">修改</el-button>
                        <el-button type="danger" @click="deleteById(scope.row);">删除</el-button>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="searchModel.pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="searchModel.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <!-- 菜品信息编辑对话框 -->
        <el-dialog @close="clearForm" :title="title" :visible.sync="dialogFormVisible">
            <el-form :model="menuForm" ref="menuFormRef" :rules="rules">
                <el-form-item label="菜品名称" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="menuForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜品类型" prop="type" :label-width="formLabelWidth">
                    <el-input v-model="menuForm.type" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="菜品图片" prop="picture" :label-width="formLabelWidth">
                    <el-upload action="http://localhost:8080/menu/saveImage" list-type="picture-card" :auto-upload="true" :file-list="fileList" :limit="1"
                        :on-exceed="handleExceed" :on-success="handleAvatarSuccess" v-model="menuForm.picture">
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                    <i class="el-icon-zoom-in"></i>
                                </span>
                                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                                    <i class="el-icon-download"></i>
                                </span>
                                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                    <i class="el-icon-delete"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>


                <!-- <el-form-item label="菜品图片" :label-width="formLabelWidth">
                    <el-input v-model="menuForm.picture" autocomplete="off"></el-input>
                </el-form-item> -->
                <el-form-item label="菜品价格" prop="price" :label-width="formLabelWidth">
                    <el-input v-model="menuForm.price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜品状态" :label-width="formLabelWidth">
                    <el-switch v-model="menuForm.state" :active-value="1" :inactive-value="0">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveMenu">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import foodApi from "@/api/food";

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
                state: "state"
            }],
            title: null,
            dialogFormVisible: false,
            menuForm: {
                name: null,
                price: null,
                picture: null,
                type: null,
                state: null
            },
            formLabelWidth: '200px',
            rules: {
                name: [
                    { required: true, message: "请输入菜品名称", trigger: "blur" },
                    {
                        min: 2,
                        max: 20,
                        message: "长度在 1 到 20 个字符",
                        trigger: "blur",
                    },
                ],
                type: [
                    { required: true, message: "请输入菜品类型", trigger: "blur" },
                    {
                        min: 1,
                        max: 10,
                        message: "长度在 1 到 10 个字符",
                        trigger: "blur",
                    },
                ],
                price: [
                    { required: true, message: "请输入价格", trigger: "blur" },
                ]
            },
            fileList: [],
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            imageUrl: '',

        }
    },
    methods: {
        getFoodList() {
            foodApi.getFoodList(this.searchModel).then((response) => {
                this.tableData = response.data.rows;
                this.total = response.data.total;
            });
        },
        handleSizeChange(pageSize) {
            this.searchModel.pageSize = pageSize;
            this.getFoodList();
        },
        handleCurrentChange(pageNo) {
            this.searchModel.pageNo = pageNo;
            this.getFoodList();
        },
        openEditUI() {
            this.title = '新增菜品';
            this.dialogFormVisible = true;
        },
        clearForm() {
            this.menuForm = {};
            this.$refs.menuFormRef.clearValidate();
            this.dialogImageUrl = '';
            this.dialogVisible = false;
            this.disabled = false;
            this.fileList = [];
        },

        saveMenu() {
            // 触发表单验证
            this.$refs.menuFormRef.validate((valid) => {
                if (valid) {
                    console.log(this.fileList);

                    // 提交请求给后台
                    foodApi.addFood(this.menuForm).then(response => {
                        // 成功提示
                        this.$message({
                            message: response.message,
                            type: 'success'
                        });
                        // 关闭对话框
                        this.dialogFormVisible = false;
                        // 刷新表格
                        this.getFoodList();
                    });
                    // this.dialogFormVisible = false;
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        // 图片
        handleRemove(file) {
            console.log(file);
            this.dialogImageUrl = '';
            this.fileList = [];
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            console.log(file.url);
            this.dialogVisible = true;
        },
        handleDownload(file) {
            const fileUrl = file.url;
            // window.location.href = fileUrl;
            window.open(fileUrl);
        },
        handleExceed() {
            this.$message.warning(`只能提交1个文件`);
        },
        handleAvatarSuccess(res, file) {
            console("handleAvatarSuccess");
            this.imageUrl = file.url;
            console(this.imageUrl);
        },
        selectById(val, file) {
            foodApi.selectById(val.id).then((response) => {
                this.menuForm = response.data;
                this.title = '修改菜品';
                this.dialogFormVisible = true;
                console.log(response.data.picture);
                //不能正确显示
                this.fileList = [{uid:response.data.picture}];
                file.url = response.data.picture;
            });
        },
        deleteById(val) {
            foodApi.deleteById(val.id).then((response) => {
                if(response.code == 20000) {
                    this.getFoodList();
                    this.$message.success('删除成功');
                } else {
                    this.$message.error('删除失败');
                }
            });
        }
    },
    created() {
        this.getFoodList();
    }
};
</script>

<style>
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
