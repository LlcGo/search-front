<template>
  <div class="index">
    <a-list item-layout="horizontal" :data-source="props.portList">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :description="item.content">
            <template #title>
              {{ item.title }}
            </template>
            <template #avatar>
              <a-avatar :src="ikun" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";
import ikun from "../assets/ikun.jpg";

interface Props {
  portList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  portList: () => [],
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
