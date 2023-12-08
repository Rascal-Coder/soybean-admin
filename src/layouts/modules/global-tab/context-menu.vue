<script setup lang="ts">
import { computed } from 'vue';
import type { VNode } from 'vue';
import { $t } from '@/locales';
import { useSvgIconRender } from '@sa/hooks';
import { useTabStore } from '@/store/modules/tab';
import SvgIcon from '@/components/custom/svg-icon.vue';

defineOptions({
  name: 'ContextMenu'
});

interface Props {
  tabId: string;
  excludeKeys?: App.Global.DropdownKey[];
  disabledKeys?: App.Global.DropdownKey[];
}

const props = withDefaults(defineProps<Props>(), {
  excludeKeys: () => [],
  disabledKeys: () => [],
  trigger: 'contextmenu'
});

const visible = defineModel<boolean>('visible', { default: false });

const { removeTab, clearTabs, clearLeftTabs, clearRightTabs } = useTabStore();
const { SvgIconVNode } = useSvgIconRender(SvgIcon);

type DropdownOption = {
  key: App.Global.DropdownKey;
  label: string;
  icon?: () => VNode;
  disabled?: boolean;
};

const tabOptions = computed(() => {
  const opts: DropdownOption[] = [
    {
      key: 'closeCurrent',
      label: $t('dropdown.closeCurrent'),
      icon: SvgIconVNode({ icon: 'ant-design:close-outlined', fontSize: 18 })
    },
    {
      key: 'closeOther',
      label: $t('dropdown.closeOther'),
      icon: SvgIconVNode({ icon: 'ant-design:column-width-outlined', fontSize: 18 })
    },
    {
      key: 'closeLeft',
      label: $t('dropdown.closeLeft'),
      icon: SvgIconVNode({ icon: 'mdi:format-horizontal-align-left', fontSize: 18 })
    },
    {
      key: 'closeRight',
      label: $t('dropdown.closeRight'),
      icon: SvgIconVNode({ icon: 'mdi:format-horizontal-align-right', fontSize: 18 })
    },
    {
      key: 'closeAll',
      label: $t('dropdown.closeAll'),
      icon: SvgIconVNode({ icon: 'ant-design:line-outlined', fontSize: 18 })
    }
  ];
  const { excludeKeys, disabledKeys } = props;
  const result = opts.filter(opt => !excludeKeys.includes(opt.key));

  disabledKeys.forEach(key => {
    const opt = result.find(item => item.key === key);

    if (opt) {
      opt.disabled = true;
    }
  });

  return result;
});

function hideDropdown() {
  visible.value = false;
}

const dropdownAction: Record<App.Global.DropdownKey, () => void> = {
  closeCurrent() {
    removeTab(props.tabId);
  },
  closeOther() {
    clearTabs([props.tabId]);
  },
  closeLeft() {
    clearLeftTabs(props.tabId);
  },
  closeRight() {
    clearRightTabs(props.tabId);
  },
  closeAll() {
    clearTabs();
  }
};

function handleDropdown(optionKey: App.Global.DropdownKey) {
  dropdownAction[optionKey]?.();
  hideDropdown();
}
</script>

<template>
  <ElDropdown trigger="contextmenu" @command="handleDropdown">
    <slot></slot>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem
          v-for="option in tabOptions"
          :key="option.key"
          :disabled="option.disabled"
          :command="option.key"
        >
          <component :is="option.icon" />
          <span>{{ option.label }}</span>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<style scoped></style>
