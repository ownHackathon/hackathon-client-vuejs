import axios from "axios";

export const WorkspaceService = {
  async getOwnWorkspaces(params) {
    const {first, rows} = params; // first = Startindex (z.B. 0), rows = Anzahl pro Seite (z.B. 5)
    const page = Math.floor(first / rows) + 1;

    const ownWorkspaces = [];


    await axios
        .get(`/api/me/workspaces/?page=${page}&limit=${rows}`,)
        .then((response) => {
          ownWorkspaces['workspaces'] = response.data.workspaces;
          ownWorkspaces['meta'] = response.data.meta;
          return ownWorkspaces;
        });
    return new Promise((resolve) => {
      resolve({
        data: ownWorkspaces['workspaces'],
        totalItems: ownWorkspaces['meta'].totalItems
      });
    });
  },

  async getWorkspace(params) {
    let workspace = [];
    await axios
        .get(`/api/workspace/${params}`,)
        .then((response) => {
          workspace = response.data
          return workspace;
        });
    return new Promise((resolve) => {
      resolve({
        data: workspace
      });
    })
  }
};
