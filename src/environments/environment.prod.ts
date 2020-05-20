import { CommonUtil } from 'src/app/commons';

export const environment = {
  production: true,
  api: {
    questions: CommonUtil.Api.prod.questionsUrl,
    codes: CommonUtil.Api.prod.naicsCodesUrl,
    saveForm: CommonUtil.Api.prod.saveAppliation
  }
};

