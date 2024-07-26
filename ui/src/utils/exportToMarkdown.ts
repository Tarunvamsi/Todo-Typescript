import { Todo } from "../components/types";

export const generateMarkdown = (title: string, todos: Todo[]) => {
  const completedTodos = todos.filter((todo) => todo.completed);
  const pendingTodos = todos.filter((todo) => !todo.completed);

  const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

  let markdown = `# ${title}\n\n`;
  markdown += `**Summary generated on:** ${currentDate}\n\n`;
  markdown += `**Summary:** ${completedTodos.length} / ${todos.length} completed\n\n`;

  if (pendingTodos.length > 0) {
    markdown += `## Pending Todos\n`;
    pendingTodos.forEach((todo) => {
      markdown += `- [ ] ${todo.title}\n`;
    });
    markdown += "\n";
  }

  if (completedTodos.length > 0) {
    markdown += `## Completed Todos\n`;
    completedTodos.forEach((todo) => {
      markdown += `- [x] ${todo.title}\n`;
    });
  }

  return markdown;
};

export const downloadMarkdownFile = (title: string, todos: Todo[]) => {
  const markdownContent = generateMarkdown(title, todos);
  const blob = new Blob([markdownContent], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${title}.md`;
  link.click();
  URL.revokeObjectURL(url);
};
