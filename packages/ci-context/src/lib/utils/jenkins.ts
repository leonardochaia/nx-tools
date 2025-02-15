import { RepoMetadata, RunnerContext } from '../interfaces';

export async function context(): Promise<RunnerContext> {
  return {
    actor: process.env.CHANGE_AUTHOR || '',
    eventName: process.env.CHANGE_FORK ? process.env.CHANGE_FORK : 'unknown',
    job: process.env.JOB_NAME || '',
    payload: {},
    ref: process.env.TAG_NAME ? `refs/tags/${process.env.TAG_NAME}` : `refs/heads/${process.env.BRANCH_NAME}`,
    runId: parseInt(process.env.BUILD_NUMBER || '0', 10),
    runNumber: parseInt(process.env.BUILD_NUMBER || '0', 10),
    sha: process.env.GIT_COMMIT || '',
  };
}

export async function repo(): Promise<RepoMetadata> {
  return {
    default_branch: '',
    description: '',
    html_url: process.env.GIT_URL || '',
    license: null,
    name: process.env.JOB_BASE_NAME || '',
  };
}
