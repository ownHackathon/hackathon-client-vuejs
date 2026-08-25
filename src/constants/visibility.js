export const Visibility = Object.freeze({
  PRIVATE: {
    id: 100,
    label: 'privat',
    description: 'Wird nicht gelistet. Es können KEINE Mitglieder hinzugefügt werden. Nur der Eigentümer kann den Inhalt sehen.',
    icon: 'pi pi-lock'
  },
  INTERNAL: {
    id: 200,
    label: 'intern',
    description: 'Wird nicht gelistet. Nur der Eigentümer kann Mitglieder hinzufügen. Nur Mitglieder können den Inhalt sehen.',
    icon: 'pi pi-shield'
  },
  FRIENDS_ONLY: {
    id: 300,
    label: 'Nur Freunde',
    description: 'Wird nur bei Freunden gelistet. Nur Freunde können beitreten. Nur Mitglieder können den Inhalt sehen.',
    icon: 'pi pi-key'
  },
  INVITE_ONLY: {
    id: 400,
    label: 'Einladung erforderlich',
    description: 'Der Beitritt erfordert eine Einladung. Nur Mitglieder können den Inhalt sehen.',
    icon: 'pi pi-key'
  },
  REGISTERED: {
    id: 500,
    label: 'nur Registrierte',
    description: 'Gelistet, Sichtbar und Zugänglich nur für registrierte Benutzer',
    icon: 'pi pi-eye-slash'
  },
  UNLISTED: {
    id: 600,
    label: 'nicht gelistet',
    description: 'Mit Link frei zugänglich und einsehbar, erscheint nur für Mitglieder des Workspaces in Listen',
    icon: 'pi pi-eye-slash'
  },
  PUBLIC: {
    id: 700,
    label: 'öffentlich',
    description: 'Wird öffentlich gelistet und jeder kann den Inhalt einsehen und beitreten.',
    icon: 'pi pi-globe'
  }
});
