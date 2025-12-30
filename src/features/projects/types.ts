export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  repoUrl?: string;
  year?: number;
};
