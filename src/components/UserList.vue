<template>
  <div class="index">
    <a-list item-layout="horizontal" :data-source="props.userList">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-card hoverable style="width: 240px">
            <template #cover>
              <img alt="example" :src="ikun" />
            </template>
            <a-card-meta :title="item.userName">
              <template #description>{{ item.userProfile }}</template>
            </a-card-meta>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";
import ikun from "../assets/ikun.jpg";

interface Props {
  userList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  userList: () => [],
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
