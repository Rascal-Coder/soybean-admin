/**
 * the common type namespace
 */
declare namespace Common {
  /**
   * the strategic pattern
   */
  interface StrategicPattern {
    /**
     * the condition
     */
    condition: boolean;
    /**
     * if the condition is true, then call the action function
     */
    callback: () => void;
  }

  /**
   * the option type
   * @property value: the option value
   * @property label: the option label
   */
  type Option<K> = { value: K; label: string };

  type YesOrNo = 'Y' | 'N';
  /**
   * 策略模式
   * [状态, 为true时执行的回调函数]
   */
  type StrategyAction = [boolean, () => void];
}
