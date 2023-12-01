import { ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { REG_USER_NAME, REG_PHONE, REG_PWD, REG_CODE_SIX, REG_EMAIL } from '@/constants/reg';
import { $t } from '@/locales';
export function useFormRules() {
  const constantRules = {
    userName: [
      createRequiredRule($t('form.userName.required')),
      {
        validator(_rule, value, callback) {
          if (!new RegExp(REG_USER_NAME).test(value)) {
            callback(new Error($t('form.userName.invalid')));
          } else {
            callback();
          }
        },
        trigger: 'change'
      }
    ],
    phone: [
      createRequiredRule($t('form.phone.required')),
      {
        validator(_rule, value, callback) {
          if (!new RegExp(REG_PHONE).test(value)) {
            callback(new Error($t('form.phone.invalid')));
          } else {
            callback();
          }
        },
        trigger: 'change'
      }
    ],
    pwd: [
      createRequiredRule($t('form.pwd.required')),
      {
        validator(_rule, value, callback) {
          if (!new RegExp(REG_PWD).test(value)) {
            callback(new Error($t('form.pwd.invalid')));
          } else {
            callback();
          }
        },
        trigger: 'change'
      }
    ],
    code: [
      createRequiredRule($t('form.code.required')),
      {
        validator(_rule, value, callback) {
          if (!new RegExp(REG_CODE_SIX).test(value)) {
            callback(new Error($t('form.code.invalid')));
          } else {
            callback();
          }
        },
        trigger: 'change'
      }
    ],
    email: [
      createRequiredRule($t('form.email.required')),
      {
        validator(_rule, value, callback) {
          if (!new RegExp(REG_EMAIL).test(value)) {
            callback(new Error($t('form.email.invalid')));
          } else {
            callback();
          }
        },
        trigger: 'change'
      }
    ]
  } satisfies Record<string, App.Global.FormRule[]>;

  function createRequiredRule(message: string) {
    return {
      required: true,
      message
    };
  }

  return {
    constantRules,
    createRequiredRule
  };
}

export function useEleForm() {
  const formRef = ref<FormInstance | null>(null);

  async function validate() {
    await formRef.value?.validate();
  }

  return {
    formRef,
    validate
  };
}
