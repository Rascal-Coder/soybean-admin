<script setup lang="ts">
import { computed } from 'vue';
import { $t } from '@/locales';

defineOptions({
  name: 'LangSwitch'
});

interface Props {
  /**
   * current language
   */
  lang: App.I18n.LangType;
  /**
   * language options
   */
  langOptions: App.I18n.LangOption[];
  /**
   * show tooltip
   */
  showTooltip?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showTooltip: false
});

type Emits = {
  (e: 'changeLang', lang: App.I18n.LangType): void;
};

const emits = defineEmits<Emits>();

const tooltipContent = computed(() => {
  if (!props.showTooltip) return '';

  return $t('icon.lang');
});
function changeLang(lang: App.I18n.LangType) {
  emits('changeLang', lang);
}
</script>

<template>
  <ElDropdown @command="changeLang">
    <div>
      <ButtonIcon :tooltip-content="tooltipContent" tooltip-placement="left" icon="heroicons:language"></ButtonIcon>
    </div>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem
          v-for="option in langOptions"
          :key="option.key"
          :command="option.key"
          :disabled="lang === option.key"
        >
          {{ option.label }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<style scoped></style>
