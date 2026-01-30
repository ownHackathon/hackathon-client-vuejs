import axios from "axios";

export const WorkspaceService = {
  async getOwnWorkspaces(params) {
    const { first, rows } = params; // first = Startindex (z.B. 0), rows = Anzahl pro Seite (z.B. 5)
    const page = Math.floor(first / rows) + 1;

    const ownWorkspaces = [];


    await axios
        .get(`/api/me/workspaces/?page=${page}&limit=${rows}`, )
    .then((response ) => {
      ownWorkspaces['workspaces'] = response.data.workspaces;
      ownWorkspaces['meta'] = response.data.meta;
      console.log(ownWorkspaces);
      return ownWorkspaces;
    })
    return new Promise((resolve) => {
      // Künstliche Verzögerung, um das Laden zu sehen
        resolve({
          data: ownWorkspaces['workspaces'],          // Nur die Daten für die aktuelle Seite
          totalItems: ownWorkspaces['meta'].totalItems // Die Gesamtzahl aller Einträge in der DB
        });
    });
  }
};
