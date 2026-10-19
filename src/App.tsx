import { useRef, useState, type ChangeEvent, type DragEvent, type ReactNode } from "react";

type IconName =
  | "arrow"
  | "calendar"
  | "check"
  | "chevron"
  | "clock"
  | "close"
  | "document"
  | "history"
  | "input"
  | "logo"
  | "plus"
  | "search"
  | "sparkles"
  | "trash"
  | "upload"
  | "users";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    calendar: <><path d="M5 3v3M19 3v3M3 9h18" /><rect x="3" y="5" width="18" height="16" rx="2" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    document: <><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v5h5M10 12h5M10 16h5" /></>,
    history: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5M12 7v5l3 2" /></>,
    input: <><path d="M5 4h14v16H5zM9 8h6M9 12h6M9 16h4" /></>,
    logo: <><path d="M4 14.5V9l5-3 5 3v5.5l-5 3z" /><path d="m14 9 5-3 1 1v5.5l-5 3-1-1M9 17.5v-5.5l5-3" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    sparkles: <><path d="m12 3 1.3 3.7L17 8l-3.7 1.3L12 13l-1.3-3.7L7 8l3.7-1.3zM5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8z" /></>,
    trash: <><path d="M4 7h16M9 3h6l1 4H8zM7 7l1 14h8l1-14M10 11v6M14 11v6" /></>,
    upload: <><path d="M12 16V4M7 9l5-5 5 5" /><path d="M5 14v6h14v-6" /></>,
    users: <><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Button({
  children,
  variant = "primary",
  icon,
  onClick,
  type = "button",
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "icon" | "ghost";
  icon?: IconName;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button className={`button button--${variant}`} onClick={onClick} type={type}>
      {icon && <Icon name={icon} size={17} />}
      {children}
    </button>
  );
}

function Header({ view, setView }: { view: "input" | "history"; setView: (view: "input" | "history") => void }) {
  return (
    <header className="header">
      <button className="brand" onClick={() => setView("input")} aria-label="Clarity - início">
        <span className="brand__mark"><Icon name="logo" size={23} /></span>
        <span>clarity</span>
      </button>
      <nav className="navigation" aria-label="Navegação principal">
        <button className={view === "input" ? "nav-item active" : "nav-item"} onClick={() => setView("input")}>
          <Icon name="input" size={17} /> Input
        </button>
        <button className={view === "history" ? "nav-item active" : "nav-item"} onClick={() => setView("history")}>
          <Icon name="history" size={17} /> Histórico
        </button>
      </nav>
      <div className="header__profile">
        <div className="avatar">MR</div>
        <div><strong>Marina Reis</strong><span>Produto</span></div>
        <Icon name="chevron" size={15} />
      </div>
    </header>
  );
}

function Field({ label, placeholder, icon }: { label: string; placeholder: string; icon?: IconName }) {
  return (
    <label className="field">
      <span>{label}</span>
      <div className="field__control">
        {icon && <Icon name={icon} size={17} />}
        <input placeholder={placeholder} />
      </div>
    </label>
  );
}

function RepeatableField({ label, placeholder, icon }: { label: string; placeholder: string; icon: IconName }) {
  const [values, setValues] = useState([""]);
  return (
    <div className="field">
      <span>{label}</span>
      {values.map((value, index) => (
        <div className="repeatable" key={index}>
          <div className="field__control">
            <Icon name={icon} size={17} />
            <input
              value={value}
              placeholder={placeholder}
              onChange={(event) => setValues(values.map((item, itemIndex) => itemIndex === index ? event.target.value : item))}
            />
          </div>
          <Button
            variant="icon"
            onClick={() => index === 0 ? setValues([...values, ""]) : setValues(values.filter((_, itemIndex) => itemIndex !== index))}
          >
            <Icon name={index === 0 ? "plus" : "close"} size={18} />
          </Button>
        </div>
      ))}
    </div>
  );
}

type UploadFile = { name: string; detail: string };

function FileUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<UploadFile[]>([
    { name: "reuniao-planejamento.mp3", detail: "MP3 · 24,8 MB" },
    { name: "briefing-produto.pdf", detail: "PDF · 1,2 MB" },
  ]);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    setFiles((current) => [
      ...current,
      ...Array.from(list).map((file) => ({
        name: file.name,
        detail: `${file.name.split(".").pop()?.toUpperCase() || "ARQUIVO"} · ${(file.size / 1024 / 1024).toFixed(1)} MB`,
      })),
    ]);
  };

  return (
    <div className="field upload-section">
      <span>Arquivos da reunião</span>
      <div
        className={dragging ? "dropzone is-dragging" : "dropzone"}
        onDragEnter={(event) => { event.preventDefault(); setDragging(true); }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setDragging(false)}
        onDrop={(event: DragEvent<HTMLDivElement>) => {
          event.preventDefault();
          setDragging(false);
          addFiles(event.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          className="visually-hidden"
          type="file"
          multiple
          accept=".mp3,.mp4,.wav,.pdf,.doc,.docx,.txt"
          onChange={(event: ChangeEvent<HTMLInputElement>) => addFiles(event.target.files)}
        />
        <span className="dropzone__icon"><Icon name="upload" size={22} /></span>
        <div><strong>Arraste arquivos ou clique para selecionar</strong><small>Áudio, vídeo ou documento · máximo de 200 MB</small></div>
      </div>
      <div className="file-list">
        {files.map((file, index) => (
          <div className="file-row" key={`${file.name}-${index}`}>
            <span className="file-row__icon"><Icon name="document" size={18} /></span>
            <div><strong>{file.name}</strong><span>{file.detail}</span></div>
            <button type="button" className="quiet-icon" onClick={() => setFiles(files.filter((_, fileIndex) => fileIndex !== index))} aria-label={`Remover ${file.name}`}>
              <Icon name="trash" size={17} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function InputScreen({ onSaved }: { onSaved: () => void }) {
  const [saved, setSaved] = useState(false);
  return (
    <main className="input-page">
      <section className="page-intro">
        <div className="eyebrow"><Icon name="sparkles" size={15} /> Nova análise</div>
        <h1>Cadastre uma reunião</h1>
        <p>Centralize os arquivos e participantes para gerar uma análise completa da conversa.</p>
      </section>
      <form className="meeting-form" onSubmit={(event) => { event.preventDefault(); setSaved(true); setTimeout(onSaved, 700); }}>
        <div className="form-section">
          <div className="section-heading"><span>01</span><div><h2>Informações gerais</h2><p>Identifique o contexto desta conversa.</p></div></div>
          <div className="fields-grid">
            <Field label="Título da reunião" placeholder="Ex.: Planejamento comercial — Q3" icon="calendar" />
            <RepeatableField label="Colaboradores" placeholder="Nome ou e-mail do colaborador" icon="users" />
            <RepeatableField label="Locutores" placeholder="Nome de quem participou da gravação" icon="users" />
            <label className="field field--full">
              <span>Descrição <em>Opcional</em></span>
              <textarea placeholder="Adicione objetivos, decisões esperadas ou outras informações relevantes..." rows={4} />
              <small>0 / 500 caracteres</small>
            </label>
          </div>
        </div>
        <div className="form-section">
          <div className="section-heading"><span>02</span><div><h2>Arquivos</h2><p>Inclua a gravação e materiais de apoio.</p></div></div>
          <FileUpload />
        </div>
        <div className="form-footer">
          <p><Icon name="clock" size={16} /> A análise leva em média de 2 a 5 minutos.</p>
          <Button type="submit" icon={saved ? "check" : "arrow"}>{saved ? "Reunião salva" : "Salvar e analisar"}</Button>
        </div>
      </form>
    </main>
  );
}

const meetings = [
  { id: 1, company: "Itaú", title: "Evolução do app empresas", date: "18 jun, 2025", time: "42 min", files: ["gravacao-itau.mp3", "roadmap-q3.pdf"] },
  { id: 2, company: "TOTVS", title: "Alinhamento de produto", date: "16 jun, 2025", time: "31 min", files: ["reuniao-totvs.mp3"] },
  { id: 3, company: "Natura", title: "Descoberta de oportunidades", date: "12 jun, 2025", time: "56 min", files: ["discovery-natura.wav", "anotacoes.pdf"] },
];

function MeetingList({ selected, setSelected }: { selected: number; setSelected: (id: number) => void }) {
  const [query, setQuery] = useState("");
  return (
    <aside className="meeting-sidebar">
      <div className="sidebar-heading"><div><span>Reuniões</span><strong>{meetings.length} análises</strong></div><Button variant="icon" onClick={() => undefined}><Icon name="plus" /></Button></div>
      <div className="compact-search"><Icon name="search" size={16} /><input placeholder="Buscar reunião" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
      <div className="meeting-items">
        {meetings.filter((meeting) => `${meeting.company} ${meeting.title}`.toLowerCase().includes(query.toLowerCase())).map((meeting) => (
          <button className={selected === meeting.id ? "meeting-item active" : "meeting-item"} key={meeting.id} onClick={() => setSelected(meeting.id)}>
            <span className="meeting-item__top"><b>{meeting.company}</b><small>{meeting.date}</small></span>
            <strong>{meeting.title}</strong>
            <span className="meeting-item__meta"><span><Icon name="clock" size={13} />{meeting.time}</span><span><Icon name="document" size={13} />{meeting.files.length} arq.</span></span>
            {selected === meeting.id && (
              <span className="meeting-files">
                {meeting.files.map((file) => <span key={file}><Icon name="document" size={12} />{file}</span>)}
              </span>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
}

function HighlightedWord({ type, children }: { type: "positive" | "negative" | "product"; children: ReactNode }) {
  return <mark className={`highlight highlight--${type}`}>{children}</mark>;
}

function TranscriptViewer({ meeting }: { meeting: (typeof meetings)[number] }) {
  const [search, setSearch] = useState("");
  return (
    <section className="transcript-panel">
      <div className="panel-header">
        <div><span>Transcrição</span><h2>{meeting.title}</h2></div>
        <span className="status"><i /> Análise concluída</span>
      </div>
      <div className="transcript-content">
        <article>
          <div className="speaker"><span>MC</span><div><strong>Marina Costa</strong><small>00:00</small></div></div>
          <p>Bom dia, pessoal. Hoje queremos revisar a evolução do <HighlightedWord type="product">App Empresas</HighlightedWord> e entender como as últimas entregas impactaram a experiência dos clientes.</p>
          <div className="speaker speaker--alt"><span>RL</span><div><strong>Rafael Lima</strong><small>00:18</small></div></div>
          <p>Os primeiros resultados foram <HighlightedWord type="positive">excelentes</HighlightedWord>. A nova jornada de pagamentos teve uma adesão muito boa e recebemos feedbacks <HighlightedWord type="positive">positivos</HighlightedWord> das equipes comerciais.</p>
          <div className="speaker"><span>MC</span><div><strong>Marina Costa</strong><small>00:41</small></div></div>
          <p>Ótimo. Ainda temos alguma preocupação com a lentidão no login? Esse era um ponto <HighlightedWord type="negative">crítico</HighlightedWord> na última reunião.</p>
          <div className="speaker speaker--alt"><span>RL</span><div><strong>Rafael Lima</strong><small>01:02</small></div></div>
          <p>Melhorou bastante, mas identificamos uma <HighlightedWord type="negative">instabilidade</HighlightedWord> pontual. O time já está trabalhando na correção antes do lançamento do <HighlightedWord type="product">Pix Automático</HighlightedWord>.</p>
          <div className="speaker"><span>MC</span><div><strong>Marina Costa</strong><small>01:31</small></div></div>
          <p>Perfeito. A integração parece <HighlightedWord type="positive">promissora</HighlightedWord>. Vamos documentar os próximos passos e acompanhar a evolução no próximo ciclo.</p>
        </article>
      </div>
      <div className="transcript-search">
        <Icon name="search" size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Pesquisar na transcrição..." />
        {search && <span>3 resultados</span>}
        <kbd>⌘ K</kbd>
      </div>
    </section>
  );
}

function SentimentChart() {
  const [hovered, setHovered] = useState<"positive" | "negative" | null>("positive");
  return (
    <div className="chart-card">
      <div className="card-title"><div><span>Sentimento geral</span><strong>Predominantemente positivo</strong></div><button className="quiet-icon" aria-label="Mais opções">•••</button></div>
      <div className="chart-wrap">
        <div className="donut" onMouseLeave={() => setHovered(null)}>
          <button className="donut-hit donut-hit--positive" onMouseEnter={() => setHovered("positive")} aria-label="Positivas, 68 por cento" />
          <button className="donut-hit donut-hit--negative" onMouseEnter={() => setHovered("negative")} aria-label="Negativas, 32 por cento" />
          <div className="donut-center"><strong>74</strong><span>menções</span></div>
          {hovered && <div className={`chart-tooltip chart-tooltip--${hovered}`}><i /><div><span>{hovered === "positive" ? "Positivas" : "Negativas"}</span><strong>{hovered === "positive" ? "50 · 68%" : "24 · 32%"}</strong></div></div>}
        </div>
      </div>
      <div className="sentiment-stats">
        <div><i className="semantic-positive" /><span>Positivas</span><strong>68%</strong></div>
        <div><i className="semantic-negative" /><span>Negativas</span><strong>32%</strong></div>
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="legend-card">
      <span className="card-label">Legenda da transcrição</span>
      <div className="legend-items">
        <span><i className="semantic-positive" />Positiva</span>
        <span><i className="semantic-negative" />Negativa</span>
        <span><i className="semantic-product" />Produto</span>
      </div>
    </div>
  );
}

function WordFrequencyList() {
  return (
    <div className="frequency-card">
      <div className="card-title"><div><span>Palavras menos utilizadas</span><strong>Termos relevantes de baixa frequência</strong></div></div>
      <div className="frequency-list">
        {[["integração", 3], ["adesão", 2], ["instabilidade", 2], ["jornada", 1]].map(([word, count], index) => (
          <div key={String(word)}><span><b>{index + 1}</b>{word}</span><strong>{count}×</strong></div>
        ))}
      </div>
    </div>
  );
}

function HistoryScreen() {
  const [selected, setSelected] = useState(1);
  const meeting = meetings.find((item) => item.id === selected) || meetings[0];
  return (
    <main className="history-page">
      <MeetingList selected={selected} setSelected={setSelected} />
      <TranscriptViewer meeting={meeting} />
      <aside className="analytics-panel">
        <div className="analytics-heading"><span>Análise</span><small>Atualizado agora</small></div>
        <SentimentChart />
        <Legend />
        <WordFrequencyList />
      </aside>
    </main>
  );
}

export default function App() {
  const [view, setView] = useState<"input" | "history">("input");
  return (
    <div className="app-shell">
      <Header view={view} setView={setView} />
      {view === "input" ? <InputScreen onSaved={() => setView("history")} /> : <HistoryScreen />}
    </div>
  );
}
