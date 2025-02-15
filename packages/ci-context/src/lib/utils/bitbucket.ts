import { RepoMetadata, RunnerContext } from '../interfaces';

export async function context(): Promise<RunnerContext> {
  return {
    actor: process.env.BITBUCKET_STEP_TRIGGERER_UUID || '',
    eventName: process.env.BITBUCKET_PR_ID ? 'pull_request' : 'unknown',
    job: process.env.BITBUCKET_STEP_UUID || '',
    payload: {},
    ref: process.env.BITBUCKET_TAG
      ? `refs/tags/${process.env.BITBUCKET_TAG}`
      : `refs/heads/${process.env.BITBUCKET_BRANCH}`,
    runId: parseInt(process.env.BITBUCKET_BUILD_NUMBER || '0', 10),
    runNumber: parseInt(process.env.BITBUCKET_BUILD_NUMBER || '0', 10),
    sha: process.env.BITBUCKET_COMMIT || '',
  };
}

export async function repo(): Promise<RepoMetadata> {
  return {
    default_branch: '',
    description: '',
    html_url: `https://bitbucket.org/${process.env.BITBUCKET_REPO_FULL_NAME}`,
    license: null,
    name: process.env.BITBUCKET_WORKSPACE || '',
  };
}
