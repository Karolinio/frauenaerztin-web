import { useId, useState, type FormEvent } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { praxis, sprechzeiten } from '../../praxis.config';
import { Pfeil } from '../ui/Pfeil';

type Status = 'ruht' | 'sendet' | 'gesendet' | 'fehler' | 'ohne-endpunkt';

interface Fehler {
  readonly name?: string;
  readonly telefon?: string;
  readonly einwilligung?: string;
}

/** Wunschzeiträume kommen aus den Sprechzeiten — keine zweite Liste. */
const ZEITRAEUME = {
  vormittag: sprechzeiten
    .filter((zeile) => zeile.vormittag)
    .map((zeile) => `${zeile.tag} vormittags (${zeile.vormittag})`),
  nachmittag: sprechzeiten
    .filter((zeile) => zeile.nachmittag)
    .map((zeile) => `${zeile.tag} nachmittags (${zeile.nachmittag})`),
} as const;

const OFFEN = 'So bald wie möglich';

/**
 * Rückruf statt Terminbuchung — und bewusst ohne Freitextfeld.
 *
 * Ein Feld „Ihr Anliegen" wäre auf einer Arztseite in aller Regel ein
 * Gesundheitsdatum nach Art. 9 DSGVO. Dafür bräuchte es eine ausdrückliche
 * Einwilligung, eine Verschlüsselung und einen Zweck, den ein Rückruf nicht
 * hat. Erhoben wird deshalb nur, was zum Zurückrufen nötig ist.
 */
export function Rueckrufformular() {
  const kennung = useId();
  const [name, setName] = useState('');
  const [telefon, setTelefon] = useState('');
  const [zeitraum, setZeitraum] = useState(OFFEN);
  const [einwilligung, setEinwilligung] = useState(false);
  const [falle, setFalle] = useState('');
  const [fehler, setFehler] = useState<Fehler>({});
  const [status, setStatus] = useState<Status>('ruht');

  const feld = (teil: string) => `${kennung}-${teil}`;

  const pruefen = (): Fehler => ({
    ...(name.trim().length < 2 ? { name: 'Bitte tragen Sie Ihren Namen ein.' } : {}),
    ...(telefon.replace(/\D/g, '').length < 6
      ? { telefon: 'Bitte tragen Sie eine Rufnummer ein, unter der ich Sie erreiche.' }
      : {}),
    ...(einwilligung ? {} : { einwilligung: 'Ohne Einwilligung darf ich Ihre Daten nicht speichern.' }),
  });

  const absenden = async (ereignis: FormEvent<HTMLFormElement>) => {
    ereignis.preventDefault();

    const gefunden = pruefen();
    setFehler(gefunden);
    if (Object.keys(gefunden).length > 0) return;

    // Honigtopf: von Menschen nie ausgefüllt, von einfachen Bots meistens.
    if (falle !== '') {
      setStatus('gesendet');
      return;
    }

    if (!praxis.formularEndpunkt) {
      setStatus('ohne-endpunkt');
      return;
    }

    setStatus('sendet');
    try {
      const antwort = await fetch(praxis.formularEndpunkt, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), telefon: telefon.trim(), zeitraum }),
      });
      if (!antwort.ok) throw new Error(`Endpunkt antwortete mit ${antwort.status}`);
      setStatus('gesendet');
      setName('');
      setTelefon('');
      setZeitraum(OFFEN);
      setEinwilligung(false);
    } catch {
      setStatus('fehler');
    }
  };

  if (status === 'gesendet') {
    return (
      <div className="formular formular--fertig" role="status">
        <p className="t-sub">Ihre Nummer liegt mir vor.</p>
        <p className="t-body">
          Ich rufe am selben Werktag zurück, wenn Sie bis 11:30 Uhr geschrieben haben — sonst am nächsten.
          Wenn es eilt, rufen Sie bitte an: <a href={praxis.telefon.href}>{praxis.telefon.anzeige}</a>.
        </p>
      </div>
    );
  }

  return (
    <form className="formular" onSubmit={absenden} noValidate>
      <div className="formular__feld">
        <label htmlFor={feld('name')}>Name</label>
        <input
          id={feld('name')}
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          required
          aria-invalid={fehler.name ? true : undefined}
          aria-describedby={fehler.name ? feld('name-fehler') : undefined}
          onChange={(e) => setName(e.target.value)}
        />
        {fehler.name ? (
          <p className="formular__fehler" id={feld('name-fehler')}>
            {fehler.name}
          </p>
        ) : null}
      </div>

      <div className="formular__feld">
        <label htmlFor={feld('telefon')}>Telefonnummer</label>
        <input
          id={feld('telefon')}
          name="telefon"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={telefon}
          required
          aria-invalid={fehler.telefon ? true : undefined}
          aria-describedby={fehler.telefon ? feld('telefon-fehler') : undefined}
          onChange={(e) => setTelefon(e.target.value)}
        />
        {fehler.telefon ? (
          <p className="formular__fehler" id={feld('telefon-fehler')}>
            {fehler.telefon}
          </p>
        ) : null}
      </div>

      <div className="formular__feld formular__feld--weit">
        <label htmlFor={feld('zeitraum')}>Wann erreiche ich Sie?</label>
        <select
          id={feld('zeitraum')}
          name="zeitraum"
          value={zeitraum}
          onChange={(e) => setZeitraum(e.target.value)}
        >
          <option value={OFFEN}>{OFFEN}</option>
          <optgroup label="Vormittags">
            {ZEITRAEUME.vormittag.map((wert) => (
              <option key={wert} value={wert}>
                {wert}
              </option>
            ))}
          </optgroup>
          <optgroup label="Nachmittags">
            {ZEITRAEUME.nachmittag.map((wert) => (
              <option key={wert} value={wert}>
                {wert}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Honigtopf. Für Menschen unsichtbar und nicht erreichbar. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={feld('ort')}>Bitte leer lassen</label>
        <input
          id={feld('ort')}
          name="ort"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={falle}
          onChange={(e) => setFalle(e.target.value)}
        />
      </div>

      <div className="formular__feld formular__feld--weit formular__einwilligung">
        <input
          id={feld('einwilligung')}
          name="einwilligung"
          type="checkbox"
          checked={einwilligung}
          required
          aria-invalid={fehler.einwilligung ? true : undefined}
          aria-describedby={fehler.einwilligung ? feld('einwilligung-fehler') : undefined}
          onChange={(e) => setEinwilligung(e.target.checked)}
        />
        <label htmlFor={feld('einwilligung')}>
          Ich bin damit einverstanden, dass mein Name und meine Telefonnummer gespeichert werden, bis der
          Rückruf erledigt ist. Die Einwilligung kann ich jederzeit widerrufen. Mehr dazu in der{' '}
          <a href="/datenschutz.html">Datenschutzerklärung</a>.
        </label>
        {fehler.einwilligung ? (
          <p className="formular__fehler" id={feld('einwilligung-fehler')}>
            {fehler.einwilligung}
          </p>
        ) : null}
      </div>

      <div className="formular__abschluss">
        <button className="cta" type="submit" disabled={status === 'sendet'}>
          {status === 'sendet' ? 'Wird gesendet …' : 'Rückruf anfordern'}
          <Pfeil className="cta__arrow" />
        </button>
        <p className="formular__notiz t-meta">
          Kein Feld für Ihr Anliegen — das gehört ins Gespräch, nicht in ein Formular.
        </p>
      </div>

      <AnimatePresence>
        {status === 'fehler' || status === 'ohne-endpunkt' ? (
          <m.p
            className="formular__meldung"
            role="alert"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {status === 'ohne-endpunkt'
              ? 'Das Formular ist noch nicht angeschlossen. '
              : 'Das Absenden hat nicht geklappt. '}
            Bitte rufen Sie an: <a href={praxis.telefon.href}>{praxis.telefon.anzeige}</a>.
          </m.p>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
