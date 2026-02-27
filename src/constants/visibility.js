export const Visibility = Object.freeze({
  PRIVATE: {
    id: 1,
    label: 'privat',
    description: 'Wird nicht gelistet. Es können KEINE Mitglieder hinzugefügt werden. Nur der Eigentümer kann den Inhalt sehen.',
    icon: 'pi pi-lock'
  },
  INTERNAL: {
    id: 2,
    label: 'intern',
    description: 'Wird nicht gelistet. Nur der Eigentümer kann Mitglieder hinzufügen. Nur Mitglieder können den Inhalt sehen.',
    icon: 'pi pi-eye-slash'
  },
  INVITE_ONLY: {
    id: 3,
    label: 'Einladung erforderlich',
    description: 'Wird nicht gelistet. Der Beitritt erfordert eine Einladung. Nur Mitglieder können den Inhalt sehen.',
    icon: 'pi pi-receipt'
  },
  UNLISTED: {
    id: 4,
    label: 'nicht gelistet',
    description: 'Mit Link frei zugänglich und einsehbar, erscheint nur für Mitglieder in Listen',
    icon: 'pi pi-eye-slash'
  },
  PUBLIC: {
    id: 5,
    label: 'öffentlich',
    description: 'Wird gelistet und jeder kann den Inhalt einsehen und beitreten.',
    icon: 'pi pi-globe'
  }
});
