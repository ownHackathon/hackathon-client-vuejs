import Aura from '@primevue/themes/aura';
import {definePreset} from '@primevue/themes';

const stylePreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      dark: {
        primary: {
          50: '{sky.50}',
          100: '{sky.100}',
          200: '{sky.200}',
          300: '{sky.300}',
          400: '{sky.400}',
          500: '{sky.500}',
          600: '{sky.600}',
          700: '{sky.700}',
          800: '{sky.800}',
          900: '{sky.900}',
          950: '{sky.950}'
        },
        surface: {
          0: '#ffffff',
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae2fd',
          300: '#7cc8fb',
          400: '#38adf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#132a45',
          800: '#0d1f35',
          900: '#0a1929',
          950: '#071428'
        }
      },
      light: {
        primary: {
          50: '{blue.50}',
          100: '{blue.100}',
          200: '{blue.200}',
          300: '{blue.300}',
          400: '{blue.400}',
          500: '{blue.600}',
          600: '{blue.700}',
          700: '{blue.800}',
          800: '{blue.900}',
          900: '{blue.950}',
          950: '#020617'
        },
        surface: {
          0: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        }
      }
    },
  },
  components: {
    menubar: {
      colorScheme: {
        dark: {
          root: {
            background: 'transparent',
            borderColor: 'transparent',
            color: '{surface.0}'
          },
        },
        light: {
          root: {
            background: 'transparent',
            borderColor: 'transparent',
            color: '{surface.950}',
          }
        }
      }
    },
    datatable: {
      colorScheme: {
        dark: {
          root: {
            borderRadius: '0 0 12px 12px'
          },
          paginatorBottom :{
            borderColor: 'transparent',
          },
          bodyCell :{
            borderColor: '{gray.700}',
          },
          header: {
            background: 'transparent',
            borderColor: 'transparent',

          },
          headerCell: {
            background: '{surface.700}',
            selectedBackground: 'transparent',
            color: '{surface.0}',
            borderColor: '{surface.700}',
            padding: '0.75rem 1rem',
          },
          bodyRow: {
            background: 'transparent',
            color: '{surface.200}',
            selectedBackground: '{surface.800}',
            focusBackground: '{surface.800}',
            borderColor: 'transparent',
          },
          row: {
            background: '{surface.700}',
            borderColor: '{surface.700}',
          },
          column: {
            borderColor: '{surface.700}',
          },
          footer: {
            borderColor: 'transparent'
          }
        }
      }
    },
    paginator: {
      colorScheme: {
        dark: {
          root: {
            background: '{surface.800}',
            borderColor: 'transparent',
          },
        }
      }
    },
    button: {
      colorScheme: {
        dark: {
          text: {
            secondary: {
              color: '{primary.200}',
            }
          }
        }
      }
    }
  },
});

export default stylePreset;
