import { Octokit } from "octokit";

export const octokit = new Octokit({
  auth: "",
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
