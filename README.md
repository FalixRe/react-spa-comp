# react-spa-comp

## Uzycie biblioteki

Import komponentow idzie z glownego wejscia paczki:

```tsx
import { Footer } from 'react-spa-comp';
import 'react-spa-comp/styles.css';
```

Style z CSS Modules sa podczas buildu wypychane do jednego pliku `styles.css`.
To oznacza, ze konsument biblioteki powinien jawnie zaimportowac `react-spa-comp/styles.css`, jesli chce dostac gotowe style komponentow.

## Publikacja paczki

Minimalny release flow dla tej biblioteki:

1. Zwieksz wersje w `package.json`.
2. Uruchom `npm run build`.
3. Uruchom `npm run type-check`.
4. Uruchom `npm run pack:check`.
5. Opublikuj paczke przez `npm publish`.

Paczkę publikuje npm jako publiczną, bo manifest zawiera `publishConfig.access = public`.
Do paczki trafiają tylko artefakty z `dist`, plik `README.md` i `LICENSE`.

## Jak dodać nowy komponent do biblioteki?

1. **Utwórz katalog i pliki komponentu:**
	- Utwórz katalog: `src/components/NazwaKomponentu/`
	- Dodaj plik komponentu: `src/components/NazwaKomponentu/NazwaKomponentu.tsx`
	- (Opcjonalnie) Dodaj plik stylów: `NazwaKomponentu.module.css`
	- Dodaj plik eksportu: `src/components/NazwaKomponentu/index.ts`

2. **Przykład prostego komponentu:**

	src/components/MyButton/MyButton.tsx
	```tsx
	import React from 'react';
	import styles from './MyButton.module.css';

	export interface MyButtonProps {
	  children?: React.ReactNode;
	  onClick?: () => void;
	}

	export const MyButton: React.FC<MyButtonProps> = ({ children, onClick }) => (
	  <button className={styles.myButton} onClick={onClick}>
		 {children}
	  </button>
	);
	```

	src/components/MyButton/index.ts
	```ts
	export { MyButton } from './MyButton';
	export type { MyButtonProps } from './MyButton';
	```

3. **Zarejestruj komponent w centralnym eksporcie:**

	Dodaj eksport w pliku `src/components/index.ts`:
	```ts
	export * from './MyButton';
	```

4. **Zarejestruj komponent w głównym wejściu biblioteki:**

	Upewnij się, że w `src/index.ts` jest:
	```ts
	export * from './components';
	```

5. **(Opcjonalnie) Dodaj wpis do exports w package.json:**
	Dodaj go tylko wtedy, gdy build rzeczywiscie generuje osobne pliki JS dla tego komponentu:
	```json
	"exports": {
	  ".": { ... },
	  "./MyButton": {
		 "import": "./dist/components/MyButton/MyButton.js",
		 "require": "./dist/components/MyButton/MyButton.cjs",
		 "types": "./dist/components/MyButton/MyButton.d.ts"
	  }
	}
	```

	Przy obecnej konfiguracji tego repo publiczne API idzie przez glowne wejscie paczki, a style przez osobny eksport `./styles.css`.

6. **Dodaj typy dla CSS Modules (jeśli używasz):**
	Jeśli pojawia się błąd z importem plików .module.css, dodaj plik `src/global.d.ts`:
	```ts
	declare module '*.module.css' {
	  const classes: { [key: string]: string };
	  export default classes;
	}
	```

7. **(Opcjonalnie) Dodaj plik testowy i stories:**
	- `MyButton.test.tsx` — testy komponentu
	- `MyButton.stories.tsx` — dokumentacja w Storybook

8. **Zbuduj bibliotekę:**
	```bash
	npm run build
	```

---

**Podsumowanie:**

- Każdy komponent ma własny katalog, plik z kodem, eksport i (opcjonalnie) style.
- Wszystkie komponenty eksportuj przez `src/components/index.ts` i `src/index.ts`.
- Import komponentow dla konsumenta idzie z glownego wejscia paczki, a style z `react-spa-comp/styles.css`.