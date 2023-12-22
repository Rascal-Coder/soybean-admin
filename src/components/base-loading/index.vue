<script lang="tsx">
import type { LoadingEnum } from '@/enum';
import { loadingMap } from '@/enum';
import type { Component, PropType } from 'vue';
import { defineComponent, h } from 'vue';
import SvgIcon from '@/components/custom/svg-icon.vue';
export default defineComponent({
  name: 'BaseLoading',
  components: {
    SvgIcon
  },
  props: {
    text: {
      type: String,
      default: '正在加载中...'
    },
    textColor: {
      type: String,
      default: 'var(--el-color-primary-light-1)'
    },
    background: {
      type: String,
      default: 'rgba(0, 0, 0, .5)'
    },
    modal: {
      type: Boolean,
      default: true
    },
    spin: {
      type: String as PropType<LoadingEnum>,
      default: 'chase'
    },
    full: {
      type: Boolean,
      default: false
    }
  },
  setup({ textColor, spin, full, background, modal, text }) {
    const renderBaseLoading = () => {
      return <SvgIcon local-icon="loading" class="loading-icon" />;
    };
    const renderBasicLoading = () => {
      return h(loadingMap.get(spin) as Component, { color: textColor });
    };

    return () => {
      return (
        <div style={modal ? { background } : {}} class={{ 'loading-container': true, 'is-fullscreen': full }}>
          <div class="loading-wrapper flex-center flex-col">
            {spin === 'loading' ? renderBaseLoading() : renderBasicLoading()}
            <div class="text" style={{ color: textColor }}>
              {text}
            </div>
          </div>
        </div>
      );
    };
  }
});
</script>
<style lang="scss" scoped>
.loading-container {
  position: absolute;
  inset: 0;
  z-index: 1001;

  &.is-fullscreen {
    position: fixed;
  }

  .loading-wrapper {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -21px;
    text-align: center;

    .text {
      width: 100%;
      margin: 8px 0;
    }

    .loading-icon {
      animation: rotating 1.5s linear infinite;
    }
  }
}
@keyframes rotating {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(1turn);
  }
}
</style>
