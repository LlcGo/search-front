<template>
  <div class="index">
    <!--    搜索-->
    <a-input-search
      v-model:value="searchParam.text"
      placeholder="input search text"
      enter-button="Search"
      size="large"
      @search="onSearch"
    />
    <my-divider />
    <!--标签选项-->
    <a-tabs v-model:activeKey="activeKey" @change="changeKey">
      <a-tab-pane key="port">
        <template #tab>
          <span>
            <comment-outlined />
            帖子
          </span>
        </template>
        <port-list :port-list="postList" />
      </a-tab-pane>
      <a-tab-pane key="image">
        <template #tab>
          <span>
            <apple-outlined />
            图片
          </span>
        </template>
        <image-list :picture-list="pictureList" />
      </a-tab-pane>
      <a-tab-pane key="user">
        <template #tab>
          <span>
            <android-outlined />
            用户
          </span>
        </template>
        <user-list :user-list="userLists" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import {
  AppleOutlined,
  AndroidOutlined,
  CommentOutlined,
} from "@ant-design/icons-vue";
import { ref, watchEffect } from "vue";
import PortList from "@/components/PortList.vue";
import ImageList from "@/components/ImageList.vue";
import MyDivider from "@/components/MyDivider.vue";
import UserList from "@/components/UserList.vue";
import { useRoute, useRouter } from "vue-router";
import myAxios from "@/plugs/MyAxios";
import { message } from "ant-design-vue";

const router = useRouter();
const route = useRoute();
const activeKey = route.params.category;
const postList = ref([]);
const userLists = ref([]);
const pictureList = ref([]);
// const loadDataOld = (params: any) => {
//   const postParams = {
//     ...params,
//     searchText: params.text,
//   };
//   myAxios.post("/post/list/page/vo", postParams).then((res) => {
//     postList.value = res.records;
//   });
//   const userParams = {
//     ...params,
//     userName: params.text,
//   };
//   myAxios.post("/user/list/page/vo", userParams).then((res) => {
//     console.log(res.records);
//     userLists.value = res.records;
//   });
//   myAxios.post("/picture/search/page/vo", postParams).then((res) => {
//     console.log(res.records);
//     pictureList.value = res.records;
//   });
// };

const loadData = (params: any) => {
  const { type } = params;
  if (!type) {
    message.error("类型为空");
  }
  const postParams = {
    ...params,
    type: params.type,
  };
  myAxios.post("/search/all", postParams).then((res) => {
    if (type === "image") {
      pictureList.value = res?.pictureList?.records;
    } else if (type === "user") {
      userLists.value = res?.userVOList?.records;
    } else if (type === "port") {
      postList.value = res?.postVOList?.records;
    }
  });
};

const searchParam = ref({
  type: activeKey,
  text: "",
  pageNum: 10,
  pageSize: 1,
});

// loadData(searchParam);

watchEffect(() => {
  searchParam.value = {
    ...searchParam,
    type: route.params.category,
    text: route.query.text,
  } as any;
  loadData(searchParam.value);
});
const onSearch = (value: string) => {
  router.push({
    query: searchParam.value,
  });
  loadData(searchParam.value);
};
const changeKey = (key: string) => {
  router.push({
    path: `/${key}`,
    query: searchParam.value,
  });
};
</script>
