import 'vue';
import type { messageSuccess, messageWarning, messageInfo, messageError, messageBox } from '@/utils/message';
declare module 'vue' {
  interface ComponentCustomProperties {
    $messageBox: typeof messageBox;
    $messageSuccess: typeof messageSuccess;
    $messageWarning: typeof messageWarning;
    $messageInfo: typeof messageInfo;
    $messageError: typeof messageError;
  }
}
