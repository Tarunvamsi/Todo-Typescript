import { Octokit } from "octokit";

const GITHUB_GIST_TOKEN = import.meta.env.VITE_GITHUB_GIST_TOKEN;
export const octokit = new Octokit({
  auth: GITHUB_GIST_TOKEN,
});

export const createSecretGist = async (content: string) => {
  const response = await octokit.request("POST /gists", {
    description: "Todo gist",
    public: false,
    files: {
      "README.md": {
        content: content,
      },
    },
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return response.data.html_url;
};
