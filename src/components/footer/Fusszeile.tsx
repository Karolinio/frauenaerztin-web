import { notfall, praxis } from '../../praxis.config';
import './fusszeile.css';

export function Fusszeile() {
  return (
    <footer className="fuss on-dark grain">
      <div className="shell fuss__gitter">
        {/* Notfälle zuerst: wer sie sucht, sucht sie eilig. */}
        <section className="fuss__notfall" aria-labelledby="notfall-titel">
          <h2 className="t-label" id="notfall-titel">
            Im Notfall
          </h2>
          <ul>
            <li>
              <a href={notfall.rettungsdienst.href}>{notfall.rettungsdienst.anzeige}</a>
              <span className="t-meta">Rettungsdienst, lebensbedrohliche Lage</span>
            </li>
            <li>
              <a href={notfall.aerztlicherBereitschaftsdienst.href}>
                {notfall.aerztlicherBereitschaftsdienst.anzeige}
              </a>
              <span className="t-meta">Ärztlicher Bereitschaftsdienst außerhalb der Sprechzeiten</span>
            </li>
            <li>
              <a href={notfall.hilfetelefon.href}>{notfall.hilfetelefon.anzeige}</a>
              <span className="t-meta">{notfall.hilfetelefon.titel}, rund um die Uhr, kostenfrei</span>
            </li>
          </ul>
        </section>

        <div className="fuss__praxis">
          <p className="fuss__marke">
            {praxis.titel} {praxis.nachname}
          </p>
          <p className="t-meta">{praxis.fachbezeichnung}</p>
          <address className="t-meta fuss__adresse">
            {praxis.adresse.strasse}
            <br />
            {praxis.adresse.plz} {praxis.adresse.ort}
            <br />
            <a href={praxis.telefon.href}>{praxis.telefon.anzeige}</a>
          </address>
        </div>

        <nav className="fuss__nav" aria-label="Rechtliches">
          <ul>
            <li>
              <a href="/impressum.html">Impressum</a>
            </li>
            <li>
              <a href="/datenschutz.html">Datenschutz</a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="shell fuss__fuss">
        {/* Pflichtangabe, solange die Räume generiert sind. */}
        <p className="t-meta">
          Die gezeigten Räume sind Visualisierungen und bilden die Praxis nicht fotografisch ab.
        </p>
      </div>
    </footer>
  );
}
