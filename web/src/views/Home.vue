<script setup>
import img1 from '@/assets/2db1abefce1b9d1602004c43b5deb48f8d546441.jpg'
import img2 from '@/assets/05a881b1cb13495418d83e46104e9258d0094a41.jpg'
import img3 from '@/assets/906445540923dd5445b5714a9709b3de9d824841.jpg'
import img4 from '@/assets/a68da351f3deb48f8faf77fcb61f3a292cf57841.jpg'
import img5 from '@/assets/eff8805494eef01f3cd2cee7a6fe9925bd317d41.jpg'

import { onMounted } from 'vue';
onMounted(() => {
    console.log(img1);
})
const imgArr = [img1, img2, img3, img4, img5]
</script>
<template>
    <div class="container">
        <el-carousel height="calc(100vh - 60px)">
            <el-carousel-item v-for="img in imgArr" :key="1">
                <div class="zz" :style="{backgroundImage:`url('${img}')`}"></div>
            </el-carousel-item>
        </el-carousel>
        <div class="motto">修德、博学、求实、创新</div>
    </div>
</template>

<style scoped>
/* .el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
} */

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
 .zz1{
    /* background-image: url('../assets/05a881b1cb13495418d83e46104e9258d0094a41.jpg'); */
    /* background-image: url('../assets/906445540923dd5445b5714a9709b3de9d824841.jpg'); */
    /* background-image: url('../assets/a68da351f3deb48f8faf77fcb61f3a292cf57841.jpg'); */
    /* background-image: url('../assets/eff8805494eef01f3cd2cee7a6fe9925bd317d41.jpg');
    height: 220px; */
 }
 .zz{
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
 }
 .container{
    position: relative
 }
 .motto{
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 65px;
    color: #fff;
    font-weight: bolder;
    opacity:0.9
 }

</style>