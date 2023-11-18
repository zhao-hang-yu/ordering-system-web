<template>
    <div class="dashboard-container">
        <div class="dashboard-text">欢迎用户<u> {{ name }} </u>使用点餐 / 管理系统</div>
        <el-row>
            <el-col :span="8" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0">
                <el-card :body-style="{ padding: '0px' }">
                <img src="http://localhost:8080/picture/premium_photo-1699467557466-cdae423ae0c3.jpg" class="image">
                <div style="padding: 14px;">
                    <span>Overhead of soup in a bowl on a surface</span>
                    <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <!-- <el-button type="text" class="button">操作按钮</el-button> -->
                    </div>
                </div>
                </el-card>
            </el-col>
            <el-col :span="8" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0">
                <el-card :body-style="{ padding: '0px' }">
                <img src="http://localhost:8080/picture/Snipaste_2023-11-14_17-54-03.jpg" class="image">
                <div style="padding: 14px;">
                    <span>A box of yellow and black cookies</span>
                    <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <!-- <el-button type="text" class="button">操作按钮</el-button> -->
                    </div>
                </div>
                </el-card>
            </el-col>
            <el-col :span="8" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0">
                <el-card :body-style="{ padding: '0px' }">
                <img src="http://localhost:8080/picture/premium_photo-1695239202526-9b848d03e60f.jpg" class="image">
                <div style="padding: 14px;">
                    <span>Burnt bread</span>
                    <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <!-- <el-button type="text" class="button">操作按钮</el-button> -->
                    </div>
                </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0">
                <el-card :body-style="{ padding: '0px' }">
                <img src="http://localhost:8080/picture/premium_photo-1699467558878-c200e71fff93.jpg" class="image">
                <div style="padding: 14px;">
                    <span>Overhead of soup with celery</span>
                    <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <!-- <el-button type="text" class="button">操作按钮</el-button> -->
                    </div>
                </div>
                </el-card>
            </el-col>
            <el-col :span="8" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0">
                <el-card :body-style="{ padding: '0px' }">
                <img src="http://localhost:8080/picture/premium_photo-1694519942638-8ca28fa3bf24.jpg" class="image">
                <div style="padding: 14px;">
                    <span>Mango smoothie bowl with granola,mango, kiwi and coconut</span>
                    <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <!-- <el-button type="text" class="button">操作按钮</el-button> -->
                    </div>
                </div>
                </el-card>
            </el-col>
            <el-col :span="8" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0">
                <el-card :body-style="{ padding: '0px' }">
                <img src="http://localhost:8080/picture/photo-1694505396696-b093cca3d8ea.jpg" class="image">
                <div style="padding: 14px;">
                    <span>Rose bread with fruit</span>
                    <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <!-- <el-button type="text" class="button">操作按钮</el-button> -->
                    </div>
                </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Dashboard',
    computed: {
        ...mapGetters([
        'name'
        ])
    },
    data () {
        return {
            currentDate: new Date(),
            count: 0,
            src: 'http://localhost:8080/picture/premium_photo-1699467557466-cdae423ae0c3.jpg'
        };
    },
    methods: {
      load () {
        this.count += 2
      }
    }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>