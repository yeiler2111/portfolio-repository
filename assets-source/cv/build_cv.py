# -*- coding: utf-8 -*-
"""
Genera los dos PDFs de hoja de vida desde `cv_data.py`.

    python assets-source/cv/build_cv.py

Salida:
    public/documents/HvAts.pdf      formato plano, para filtros ATS
    public/documents/hvHarvard.pdf  formato visual de dos columnas

Renderiza con Chrome headless (`--print-to-pdf`), que conserva la capa de texto
y los hipervínculos. Los HTML intermedios quedan junto a este script para poder
abrirlos en el navegador y ajustar el diseño antes de regenerar.
"""

import html
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
import cv_data as D  # noqa: E402

HERE = Path(__file__).parent
ROOT = HERE.parent.parent
OUT = ROOT / "public" / "documents"

CHROME_CANDIDATES = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "/usr/bin/google-chrome",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
]

e = html.escape


def find_chrome() -> str:
    for c in CHROME_CANDIDATES:
        if Path(c).exists():
            return c
    raise SystemExit("No se encontró Chrome ni Edge para renderizar el PDF.")


def to_pdf(html_path: Path, pdf_path: Path) -> None:
    pdf_path.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            find_chrome(),
            "--headless",
            "--disable-gpu",
            "--no-sandbox",
            "--no-pdf-header-footer",
            f"--print-to-pdf={pdf_path}",
            html_path.resolve().as_uri(),
        ],
        check=True,
        capture_output=True,
    )


# --------------------------------------------------------------------------
# CV ATS: una columna, sin tablas ni color de fondo, encabezados literales.
# Todo lo que un parser automático necesita leer va en texto plano.
# --------------------------------------------------------------------------
ATS_CSS = """
@page { size: A4; margin: 14mm 15mm; }
* { box-sizing: border-box; }
body { font-family: Arial, Helvetica, sans-serif; font-size: 10.1pt;
       line-height: 1.38; color: #000; margin: 0; }
h1 { font-size: 16pt; margin: 0 0 2pt; letter-spacing: .3pt; }
.role { font-size: 11pt; font-weight: bold; margin: 0 0 8pt; }
.contact { margin: 0 0 3pt; }
.contact a { color: #1a5f7a; }
h2 { font-size: 11pt; margin: 11pt 0 4pt; padding-bottom: 2pt;
     border-bottom: 1px solid #000; letter-spacing: .4pt;
     break-after: avoid; page-break-after: avoid; }
h3 { font-size: 10.1pt; margin: 8pt 0 0;
     break-after: avoid; page-break-after: avoid; }
.meta { font-size: 9.6pt; margin: 1pt 0 3pt; }
ul { margin: 0 0 0 16pt; padding: 0; }
li { margin-bottom: 2pt; }
p { margin: 0 0 5pt; }
.skill { margin-bottom: 4pt; }
/* Cada término va en un span sin salto: si no, Chrome parte palabras como
   "Speech-to-text" por el guion y la capa de texto que lee un ATS queda rota. */
.tok { white-space: nowrap; }
/* El bloque NO lleva `page-break-inside: avoid`: forzarlo dejaba media página
   en blanco y empujaba educación y referencias a una tercera hoja casi vacía. */
.job { break-inside: auto; }
"""


def _tokens(items: str) -> str:
    """Envuelve cada término en un span nowrap (los muy largos se dejan fluir)."""
    out = []
    for tok in items.split(" · "):
        out.append(f"<span class='tok'>{e(tok)}</span>" if len(tok) <= 46 else e(tok))
    return " · ".join(out)


def build_ats_html() -> str:
    c = D.CONTACT
    parts = [
        "<!doctype html><html lang='es'><head><meta charset='utf-8'>",
        f"<title>{e(D.NAME)} - Hoja de vida</title><style>{ATS_CSS}</style></head><body>",
        f"<h1>{e(D.NAME)}</h1>",
        f"<div class='role'>{e(D.ROLE)} | {e(D.SUBROLE)}</div>",
        f"<p class='contact'>Email: {e(c['email'])} | Teléfono: {e(c['phone'])} | "
        f"Ubicación: {e(c['location'])}</p>",
        f"<p class='contact'>Portafolio: <a href='{D.PORTFOLIO_URL}'>{e(D.PORTFOLIO_TXT)}</a></p>",
        f"<p class='contact'>GitHub: <a href='{c['github_url']}'>{e(c['github_txt'])}</a></p>",
        f"<p class='contact'>LinkedIn: <a href='{c['linkedin_url']}'>{e(c['linkedin_txt'])}</a></p>",
        "<h2>PERFIL PROFESIONAL</h2>",
        f"<p>{e(D.PROFILE)}</p>",
        "<h2>EXPERIENCIA PROFESIONAL</h2>",
    ]
    for j in D.EXPERIENCE:
        parts.append("<div class='job'>")
        parts.append(f"<h3>{e(j['role'])} | {e(j['company'])}</h3>")
        parts.append(f"<div class='meta'>{e(j['period'])}</div><ul>")
        parts += [f"<li>{e(b)}</li>" for b in j["bullets"]]
        parts.append("</ul></div>")

    parts.append("<h2>HABILIDADES TÉCNICAS</h2>")
    for cat, items in D.SKILLS:
        parts.append(f"<div class='skill'><b>{e(cat)}:</b> {_tokens(items)}</div>")

    ed = D.EDUCATION
    parts += [
        "<h2>EDUCACIÓN</h2>",
        f"<h3>{e(ed['degree'])}</h3>",
        f"<div class='meta'>{e(ed['school'])} - {e(ed['place'])}<br>"
        f"{e(ed['extra'])}<br>{e(ed['date'])}</div>",
        "<h2>IDIOMAS</h2>",
        "<p>" + " | ".join(f"{e(a)}: {e(b)}" for a, b in D.LANGUAGES) + "</p>",
        "<h2>REFERENCIAS</h2>",
    ]
    for name, role, phone in D.REFERENCES:
        parts.append(f"<p><b>{e(name)}</b> - {e(role)} - {e(phone)}</p>")

    parts.append("</body></html>")
    return "\n".join(parts)


# --------------------------------------------------------------------------
# CV visual: recrea la maqueta de dos columnas del PDF anterior.
# Medidas tomadas del original: banda #414042 de 218pt, sidebar #EEEEEF de
# 214pt, títulos #333E50, cuerpo #77787B, todo en Arial.
# --------------------------------------------------------------------------
VIS_CSS = """
@page { size: A4; margin: 0; }
* { box-sizing: border-box; }
body { margin: 0; font-family: Arial, Helvetica, sans-serif; color: #333132;
       -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { position: relative; width: 210mm; height: 297mm; overflow: hidden;
        background: #fff; }
.page + .page { page-break-before: always; }

/* Banda superior */
.banner { height: 218pt; background: #414042; color: #fff; text-align: center;
          padding-top: 26pt; }
.mono { font-size: 15pt; font-weight: bold; color: #d2d2d2; letter-spacing: 2pt; }
.name { font-size: 30pt; font-weight: bold; letter-spacing: 7pt;
        margin: 22pt 0 0; padding-left: 7pt; }
.rolewrap { display: flex; align-items: center; justify-content: center;
            gap: 14pt; margin-top: 14pt; padding: 0 60pt; }
.rolewrap .rule { flex: 1; height: 1px; background: #8a8a8c; }
.rolewrap .txt { font-size: 10.5pt; font-weight: bold; color: #d2d2d2;
                 letter-spacing: 3.4pt; white-space: nowrap; }
.contactrow { display: flex; margin-top: 20pt; padding: 0 34pt; color: #d2d2d2; }
.contactrow .cell { flex: 1; text-align: center; font-size: 10pt; line-height: 1.35;
                    padding: 0 8pt; }
.contactrow .cell + .cell { border-left: 1px solid #6b6a6c; }
.contactrow svg { display: block; margin: 0 auto 6pt; }

/* Columnas */
.cols { display: flex; height: calc(297mm - 218pt); }
.cols.full { height: 297mm; }
.side { width: 214pt; background: #eeeeef; padding: 26pt 29pt 20pt 30pt; }
.main { flex: 1; padding: 26pt 25pt 20pt 18pt; }

.shead { font-size: 11pt; font-weight: bold; color: #333e50; letter-spacing: 2.6pt;
         padding-bottom: 8pt; border-bottom: 1px solid #c9c9ca; margin-bottom: 12pt; }
.shead.mt { margin-top: 22pt; }
.side p, .side li { font-size: 9.4pt; line-height: 1.55; color: #666766; margin: 0; }
.side ul { list-style: none; margin: 0; padding: 0; }
.side li { position: relative; padding-left: 11pt; margin-bottom: 6pt; }
.side li::before { content: ""; position: absolute; left: 0; top: 5.5pt;
                   width: 4pt; height: 4pt; border-radius: 50%; background: #b9b9ba; }
.edu-degree { font-size: 9.8pt; font-weight: bold; color: #333e50; margin: 0 0 3pt; }
.edu-line { font-size: 9.4pt; color: #666766; line-height: 1.5; }
.lang { font-size: 9.4pt; color: #666766; margin-bottom: 5pt; }
.lang b { color: #333132; }
.side a { color: #67686b; text-decoration: none; font-size: 9pt; word-break: break-all; }
.side .linkgroup { margin-bottom: 12pt; }
.side .linkgroup b { display: block; font-size: 9.6pt; color: #333132; margin-bottom: 2pt; }

/* Experiencia */
.job { display: flex; margin-bottom: 15pt; page-break-inside: avoid; }
.job .when { width: 96pt; flex: none; padding-right: 10pt; }
.job .when .co { font-size: 10.2pt; font-weight: bold; color: #333132;
                 line-height: 1.3; }
.job .when .pe { font-size: 8.9pt; color: #77787b; margin-top: 3pt; }
.job .bar { width: 13pt; flex: none; position: relative; }
.job .bar::before { content: ""; position: absolute; left: 4.5pt; top: 10pt; bottom: -15pt;
                    width: 1px; background: #d8d8d9; }
.job:last-child .bar::before { bottom: 0; }
.job .bar::after { content: ""; position: absolute; left: 1pt; top: 3.5pt;
                   width: 8pt; height: 8pt; border-radius: 50%; background: #b9b9ba; }
.job .what { flex: 1; }
.job .what .ro { font-size: 10.4pt; font-weight: bold; color: #333e50;
                 letter-spacing: .5pt; text-transform: uppercase; margin-bottom: 6pt; }
.job .what ul { list-style: none; margin: 0; padding: 0; }
.job .what li { position: relative; padding-left: 11pt; font-size: 9.6pt;
                line-height: 1.45; color: #77787b; margin-bottom: 4pt; }
.job .what li::before { content: "\\2022"; position: absolute; left: 0; color: #a9a9aa; }
.ref { margin-bottom: 10pt; font-size: 9.4pt; color: #666766; line-height: 1.5; }
.ref b { color: #333132; }
"""

PIN = ('<svg width="13" height="15" viewBox="0 0 24 24" fill="#d2d2d2">'
       '<path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5'
       'A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>')
PHONE = ('<svg width="13" height="15" viewBox="0 0 24 24" fill="#d2d2d2">'
         '<path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1'
         'A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2z"/></svg>')
MAIL = ('<svg width="15" height="15" viewBox="0 0 24 24" fill="none" '
        'stroke="#d2d2d2" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'
        '<rect x="2.5" y="5" width="19" height="14" rx="1.5"/>'
        '<path d="M3 6.5l9 6.5 9-6.5"/></svg>')


def _side_head(txt: str, mt: bool = False) -> str:
    return f"<div class='shead{' mt' if mt else ''}'>{e(txt)}</div>"


def _job(j: dict) -> str:
    lis = "".join(f"<li>{e(b)}</li>" for b in j["bullets"])
    return (
        "<div class='job'>"
        f"<div class='when'><div class='co'>{e(j['company'])}</div>"
        f"<div class='pe'>{e(j['period'])}</div></div>"
        "<div class='bar'></div>"
        f"<div class='what'><div class='ro'>{e(j['role'])}</div><ul>{lis}</ul></div>"
        "</div>"
    )


def build_visual_html() -> str:
    c, ed = D.CONTACT, D.EDUCATION

    banner = f"""
    <div class="banner">
      <div class="mono">Y | S</div>
      <div class="name">{e(D.NAME_SHORT)}</div>
      <div class="rolewrap"><span class="rule"></span>
        <span class="txt">{e(D.ROLE)}</span><span class="rule"></span></div>
      <div class="contactrow">
        <div class="cell">{PIN}{e(c['location'])}</div>
        <div class="cell">{PHONE}{e(c['phone'])}</div>
        <div class="cell">{MAIL}{e(c['email'])}</div>
      </div>
    </div>"""

    skills_li = "".join(f"<li>{e(s)}</li>" for s in D.SKILLS_SIDEBAR)
    langs = "".join(f"<div class='lang'><b>{e(a)}:</b> {e(b)}</div>" for a, b in D.LANGUAGES)
    side1 = f"""
      {_side_head('SOBRE MÍ')}
      <p>{e(D.PROFILE_SHORT)}</p>
      {_side_head('EDUCACIÓN', True)}
      <div class="edu-degree">{e(ed['degree'])}</div>
      <div class="edu-line">{e(ed['school'])}<br>{e(ed['place'])}<br>
        {e(ed['extra'])}<br>{e(ed['date'])}</div>
      {_side_head('IDIOMAS', True)}
      {langs}"""

    refs = "".join(
        f"<div class='ref'><b>{e(n)}</b><br>{e(r)}<br>{e(p)}</div>"
        for n, r, p in D.REFERENCES
    )
    side2 = f"""
      {_side_head('HABILIDADES')}
      <ul>{skills_li}</ul>
      {_side_head('ENLACES', True)}
      <div class="linkgroup"><b>Portafolio</b>
        <a href="{D.PORTFOLIO_URL}">{e(D.PORTFOLIO_TXT)}</a></div>
      <div class="linkgroup"><b>GitHub</b>
        <a href="{c['github_url']}">{e(c['github_txt'])}</a></div>
      <div class="linkgroup"><b>LinkedIn</b>
        <a href="{c['linkedin_url']}">{e(c['linkedin_txt'])}</a></div>
      {_side_head('REFERENCIAS', True)}
      {refs}"""

    # Reparto explícito: la página 1 pierde 218pt por la banda superior.
    p1_jobs = "".join(_job(j) for j in D.EXPERIENCE[:2])
    p2_jobs = "".join(_job(j) for j in D.EXPERIENCE[2:])

    return f"""<!doctype html><html lang="es"><head><meta charset="utf-8">
<title>{e(D.NAME)} - Hoja de vida</title><style>{VIS_CSS}</style></head><body>
<div class="page">
  {banner}
  <div class="cols">
    <div class="side">{side1}</div>
    <div class="main">{_side_head('EXPERIENCIA LABORAL')}{p1_jobs}</div>
  </div>
</div>
<div class="page">
  <div class="cols full">
    <div class="side">{side2}</div>
    <div class="main">{_side_head('EXPERIENCIA LABORAL')}{p2_jobs}</div>
  </div>
</div>
</body></html>"""


def main() -> None:
    jobs = [
        ("ats.html", build_ats_html(), OUT / "HvAts.pdf"),
        ("visual.html", build_visual_html(), OUT / "hvHarvard.pdf"),
    ]
    for fname, markup, pdf in jobs:
        hp = HERE / fname
        hp.write_text(markup, encoding="utf-8")
        to_pdf(hp, pdf)
        print(f"{pdf.relative_to(ROOT)}  ({pdf.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
