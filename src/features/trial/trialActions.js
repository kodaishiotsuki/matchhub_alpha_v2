import { CLEAR_SELECTED_TRIAL, CREATE_TRIAL, LISTEN_TO_SELECTED_TRIAL } from "./trialConstants";

//トライアル申請を表示
export function listenToSelectedTrial(trial) {
  return {
    type: LISTEN_TO_SELECTED_TRIAL,
    payload: trial,
  };
}

//トライアル申請をクリア（新規入力時）
export function clearSelectedTrial() {
  return {
    type: CLEAR_SELECTED_TRIAL,
  };
}

//トライアル作成
export function createTrial(trial) {
  return {
    type: CREATE_TRIAL,
    payload:trial,
  }
}
