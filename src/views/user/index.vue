<template>
    <div class="dd1">
        <!-- <h1>用户管理</h1> -->
        <table align="center" cellpadding="10" cellspacing="0">
            <tr align="center">
                <td colspan="2">
                    <el-avatar shape="square" :size="100" :src="squareUrl"></el-avatar>
                </td>
            </tr>
            <tr>
                <td><p>用户名：</p></td>
                <td><el-input placeholder="请输入用户名" v-model="user.username" clearable></el-input></td>
            </tr>
            <tr>
                <td><p>密码：</p></td>
                <td><el-input placeholder="请输入密码" v-model="user.password" :disabled="true" show-password></el-input></td>
            </tr>
            <tr>
                <td><p>手机号：</p></td>
                <td><el-input placeholder="请输入手机号" v-model="user.phone" clearable></el-input></td>
            </tr>
            <tr align="center">
                <td colspan="2">
                    
                </td>
            </tr>
            <tr align="center">
                <td colspan="2">
                    <el-button type="warning" @click="updateUser" plain>  修  改  </el-button>
                </td>
            </tr>
        </table>
        
    </div>
</template>

<script>
import userApi from "@/api/user";


export default {
    data() {
        return {
            squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
            user: {
                username: '',
                password: '',
                phone: ''
            },
            userForm: {
                id: '',
                username: '',
                password: '',
                phone: '',
                avater: ''
            }
        };
    },
    methods: {
        getUserInfo() {
            console.log('getuserinfo----');
            userApi.getUserInfo().then((response) => {
                this.user.username = response.data.username;
                this.user.password = response.data.password;
                this.user.phone = response.data.phone;
            });
        },
        updateUser() {
            if(this.user.username.length < 2 || this.user.username.length > 20) {
                this.$message.error('用户名长度错误');
            }
            else {
                this.userForm.username = this.user.username;
                this.userForm.phone = this.user.phone;
                userApi.updateUser(this.userForm).then((response) => {
                    this.$message.success(response.message);
                    location.reload();
                });
            }
            
        }
    },
    created() {
        this.getUserInfo();
    }
}
</script>

<style>
    .dd1 {
        margin-top: 5px;
        padding-top: 100px;
    }
</style>