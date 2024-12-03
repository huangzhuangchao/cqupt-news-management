<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, defineEmits } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

// 定义 mode
const mode = 'simple' // 或者你可以根据需要设置为其他值

const emit = defineEmits(["event"])
const props = defineProps(["content"])

// const emits = defineEmits(["event"])
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref("")

// 模拟 ajax 异步获取内容
// onMounted(() => {
//     setTimeout(() => {
//         valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
//     }, 1500)
// })

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入正文...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  props.content && editor.setHtml(props.content)
}

const handleChange = (editor) => {
  // console.log('change:', editor.children)
  // emit("event", editor.children) //这个children函数是个代理对象
  emit("event", editor.getHtml())
  // console.log(editor.getHtml());
  // console.log(editor.getText());
  // console.log(typeof editor.getText(), typeof editor.getHtml());
}

// onMounted((editor) => {
//  setTimeout((editor)=>{
//   console.log(props, 666);
  
//  }, 1000)
// })
// return {
//   editorRef,
//   valueHtml,
//   mode: 'simple', // 或 'simple'
//   toolbarConfig,
//   editorConfig,
//   handleCreated,
//   handleChange
// };


</script>
<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor style="height: 400px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode"
      @onCreated="handleCreated" @onChange="handleChange" />
  </div>
</template>