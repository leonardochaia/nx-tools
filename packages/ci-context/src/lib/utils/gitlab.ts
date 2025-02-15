import { RepoMetadata, RunnerContext } from '../interfaces';

export async function context(): Promise<RunnerContext> {
  return {
    actor: process.env.GITLAB_USER_LOGIN || '',
    eventName: process.env.CI_PIPELINE_SOURCE || '',
    job: process.env.CI_JOB_NAME || '',
    payload: {},
    ref: process.env.CI_COMMIT_TAG
      ? `refs/tags/${process.env.CI_COMMIT_TAG}`
      : `refs/heads/${process.env.CI_COMMIT_REF_SLUG}`,
    runId: parseInt(process.env.CI_PIPELINE_IID || '0', 10),
    runNumber: parseInt(process.env.CI_PIPELINE_ID || '0', 10),
    sha: process.env.CI_COMMIT_SHA || '',
  };
}

export async function repo(): Promise<RepoMetadata> {
  return {
    default_branch: process.env.CI_DEFAULT_BRANCH || '',
    description: '',
    html_url: process.env.CI_PROJECT_URL || '',
    license: null,
    name: process.env.CI_PROJECT_NAME || '',
  };
}
