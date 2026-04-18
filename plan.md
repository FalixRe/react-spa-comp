# Plan: Minimalna biblioteka komponentów React TS/JS

**Cel:**  
Stworzenie szkieletu biblioteki React z TypeScript/JavaScript, gotowej do rozbudowy o kolejne komponenty. Na start – jeden przykładowy komponent (np. Button).

---

**Kroki:**

### 1. Struktura katalogów i plików ✅ **DONE**
- src/components/Footer/Footer.tsx — przykładowy komponent
- src/components/Footer/index.ts — eksport komponentu
- src/components/index.ts — centralny eksport wszystkich komponentów
- src/index.ts — główny punkt wejścia biblioteki
- rollup.config.js — konfiguracja budowania
- tsconfig.json — konfiguracja TypeScript
- package.json — eksporty, skrypty, zależności
- (opcjonalnie) testy, .npmignore, README.md

### 2. Konfiguracja TypeScript ✅ **DONE**
- Ustaw `rootDir: ./src`, `outDir: ./dist`, `declaration: true`, `jsx: react-jsx`
- Wyklucz pliki testowe i stories

### 3. Konfiguracja eksportu ✅ **DONE**
- W package.json ustaw:
   - main: dist/index.cjs
   - module: dist/index.esm.js
   - types: dist/index.d.ts
   - exports: zdefiniuj eksporty dla całości i pojedynczych komponentów

### 4. Budowanie ✅ **DONE**
- Skrypt npm: `build` z Rollupem
- Skrypt npm: `type-check` z tsc


### 5. Publikacja
- Szczegółowy plan: [plan-publikacja.md](/workspaces/react-spa-comp/plan-publikacja.md)

### 6. Testowanie (opcjonalnie)
- Dodaj testy z Jest i Testing Library


### 7. Weryfikacja ✅ **DONE**
- Uruchom `npm run build` i sprawdź katalog dist/
- Przetestuj import komponentu lokalnie

---

**Pliki do utworzenia/modyfikacji:**
- rollup.config.js — nowy
- src/components/Button/Button.tsx — nowy
- src/components/Button/index.ts — nowy
- src/components/index.ts — nowy
- src/index.ts — modyfikacja
- package.json — modyfikacja
- tsconfig.json — modyfikacja
- (opcjonalnie) testy, .npmignore

---

**Decyzje i uwagi:**
- Używaj `react-jsx` w tsconfig.json
- Eksportuj komponenty przez barrel exports
- Buduj bibliotekę Rollupem
- Testy i publikacja są opcjonalne, ale zalecane

---

## Opcjonalnie: Dodanie Storybook

**Storybook** to narzędzie do interaktywnego podglądu, testowania i dokumentowania komponentów UI w izolacji. Pozwala tworzyć tzw. „stories” – przykładowe warianty komponentów, które można przeglądać w przeglądarce bez uruchamiania całej aplikacji.

### Jak dodać Storybook do biblioteki komponentów:

1. **Instalacja zależności**

   ```bash
   npx storybook@latest init --type react
   # lub
   npm install --save-dev storybook @storybook/react-vite @storybook/addon-docs @storybook/addon-a11y
   ```

2. **Uruchomienie Storybooka**

   ```bash
   npm run storybook
   # domyślnie dostępny pod http://localhost:6006
   ```

3. **Dodanie plików stories**

   W katalogu komponentu utwórz plik, np. `Button.stories.tsx`:
   ```tsx
   import type { Meta, StoryObj } from '@storybook/react';
   import { Button } from './Button';

   const meta: Meta<typeof Button> = {
     component: Button,
     title: 'Button',
   };
   export default meta;

   type Story = StoryObj<typeof Button>;

   export const Primary: Story = {
     args: { children: 'Primary', variant: 'primary' },
   };
   export const Danger: Story = {
     args: { children: 'Danger', variant: 'danger' },
   };
   ```

4. **Podgląd i rozwój**
   - Każda zmiana w plikach stories lub komponentach jest od razu widoczna w Storybooku.
   - Możesz dokumentować propsy, testować różne stany, sprawdzać dostępność (a11y) itd.

5. **(Opcjonalnie) Publikacja Storybooka**
   - Możesz zbudować statyczną wersję: `npm run build-storybook`
   - Wynikowy katalog (np. `storybook-static/`) można hostować np. na GitHub Pages.

**Więcej informacji:** https://storybook.js.org/

---