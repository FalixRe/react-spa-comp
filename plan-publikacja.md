## Plan publikacji

Ten dokument rozbija punkt 5 z planu głównego na konkretne kroki wdrożeniowe dla publikacji biblioteki do npm.

### Cel

Przygotować paczkę tak, aby publikacja była:
- przewidywalna,
- bezpieczna,
- łatwa do powtórzenia,
- ograniczona tylko do potrzebnych artefaktów.

### Obecny stan

Już gotowe:
- nazwa paczki i wersja są ustawione w package.json,
- główne entry pointy są ustawione,
- eksporty paczki są ustawione,
- build i type-check działają,
- README opisuje podstawowe użycie biblioteki,
- kontrola zawartości paczki jest ustawiona przez files,
- publikacja jest zabezpieczona przez prepublishOnly,
- istnieje skrypt pack:check do podglądu paczki przed publikacją,
- publishConfig.access jest ustawione na public,
- README opisuje minimalny release flow.

Jeszcze brakuje:
- wykonania finalnego kroku publikacji przez npm publish,
- weryfikacji opublikowanej paczki w publicznym rejestrze npm,
- zalogowania środowiska do npm, bo bez aktywnej autoryzacji nie da się wykonać npm publish.

### Zakres prac

#### 1. Ograniczenie zawartości paczki

Status:
- ✅DONE

Preferowane rozwiązanie:
- dodać pole files do package.json zamiast polegać na .npmignore.

Minimalna whitelist:
- dist
- README.md
- LICENSE

Uwagi:
- .npmignore można dodać tylko wtedy, gdy naprawdę będzie potrzebny,
- dla bibliotek pole files jest zwykle bezpieczniejsze i łatwiejsze do utrzymania.

#### 2. Zabezpieczenie publikacji

Status:
- ✅DONE

Dodać w package.json skrypt:
- prepublishOnly

Minimalny przebieg:
- npm run build
- npm run type-check

Cel:
- nie dopuścić do publikacji paczki bez aktualnego buildu lub z błędami typów.

#### 3. Kontrola zawartości paczki przed wydaniem

Status:
- ✅DONE

Dodać skrypt pomocniczy, np.:
- pack:check

Proponowana komenda:
- npm pack --dry-run

Cel:
- zobaczyć dokładnie, co trafi do npm,
- szybko wykryć przypadkowe pliki w publikacji.

#### 4. Konfiguracja publikacji publicznej

Status:
- ✅DONE

Jeśli paczka ma być publiczna, dodać:
- publishConfig.access = public

Cel:
- uniknąć problemów przy pierwszej publikacji scoped lub publicznej paczki,
- ujednolicić zachowanie npm publish.

#### 5. Minimalny workflow release

Status:
- 🟡PARTIAL

Ustalić i opisać prosty proces publikacji:
1. podnieś wersję w package.json,
2. uruchom npm run build,
3. uruchom npm run type-check,
4. uruchom npm run pack:check,
5. opublikuj npm publish.

Opcjonalnie później:
- publikacja z taga Git,
- changelog,
- automatyczny release przez GitHub Actions.

### Proponowane zmiany w plikach

#### package.json

Do dodania lub aktualizacji:
- publishConfig
- files
- scripts.prepublishOnly
- scripts.pack:check

#### README.md

Opcjonalnie dodać krótki rozdział:
- publikacja paczki,
- podstawowy release flow,
- informacja, że styles.css jest częścią publicznego API.

#### LICENSE

Jeśli repo ma być publikowane do npm, warto dodać plik LICENSE, bo package.json już deklaruje licencję MIT.

### Kryteria ukończenia punktu 5

Punkt publikacji można uznać za gotowy, gdy:
- package.json zawiera files,
- package.json zawiera publishConfig,
- istnieje prepublishOnly,
- istnieje skrypt pack:check,
- npm pack --dry-run pokazuje poprawną, małą paczkę,
- proces publikacji jest opisany przynajmniej w jednym miejscu.

### Proponowana kolejność wdrożenia

1. dodać files do package.json,
2. dodać prepublishOnly i pack:check,
3. dodać publishConfig,
4. uruchomić npm pack --dry-run,
5. uzupełnić README lub osobną notatkę release.

### Status

Na ten moment punkt 5 jest:
- 🟡PARTIAL.

Najważniejsze elementy przygotowania do publikacji zostały wdrożone.
Nie został jeszcze wykonany sam release do npm.

Aktualizacja realizacji:
- pkt 1: ✅DONE - package.json zawiera whitelistę files dla dist, README.md i LICENSE.
- pkt 2: ✅DONE - package.json zawiera prepublishOnly uruchamiający build i type-check przed publikacją.
- pkt 3: ✅DONE - package.json zawiera pack:check, a npm pack --dry-run pokazuje poprawną zawartość paczki.
- pkt 4: ✅DONE - package.json zawiera publishConfig.access ustawione na public.
- pkt 5: 🟡PARTIAL - README opisuje minimalny release flow, build, type-check i pack:check przechodzą poprawnie, ale krok npm publish nie został jeszcze wykonany, a paczka nie jest widoczna w publicznym rejestrze npm.

Blokada wykonania:
- npm whoami zwraca ENEEDAUTH, więc bieżące środowisko nie jest zalogowane do npm.
- dopiero po npm adduser albo skonfigurowaniu tokenu npm można wykonać npm publish i domknąć punkt 5.
