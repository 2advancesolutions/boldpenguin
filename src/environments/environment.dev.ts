import { CommonUtil } from './../app/commons';

export const environment = {
  production: false,
  api: {
    questions: CommonUtil.Api.dev.questionsUrl,
    codes: CommonUtil.Api.dev.naicsCodesUrl,
    saveForm: CommonUtil.Api.dev.saveAppliation
  }
};
