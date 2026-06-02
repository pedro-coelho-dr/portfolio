export type Block =
  | { type: 'p'; content: string }
  | { type: 'code'; lang?: string; content: string }
  | { type: 'ul'; items: string[] }
  | { type: 'img'; src: string; alt?: string; caption?: string; external?: boolean }
  | { type: 'imgs'; items: { src: string; alt?: string; external?: boolean }[] }

export type Section = {
  title?: string
  blocks: Block[]
}

export type Link = { label: string; href: string }
export type MetaRow = { key: string; value: string }

export type Detail = {
  slug: string
  category: 'project' | 'code' | 'text'
  title: string
  eyebrow: string
  tagline: string
  tone?: 'amber' | 'neutral' | 'pink' | 'red'
  meta: MetaRow[]
  links: Link[]
  sections: Section[]
}

const details: Detail[] = [
  // ── PROJECTS ───────────────────────────────────────────────

  {
    slug: 'glhf',
    category: 'project',
    title: 'GLHF',
    eyebrow: 'vulnerable lab',
    tagline:
      'Deliberately vulnerable Flask web application for hands-on security training.',
    tone: 'red',
    meta: [
      { key: 'stack', value: 'flask · python · docker · sqlite' },
      { key: 'type', value: 'vulnerable lab' },
      { key: 'version', value: 'v0.1-beta' },
    ],
    links: [
      { label: 'github', href: 'https://github.com/pedro-coelho-dr/glhf' },
      { label: 'dockerhub', href: 'https://hub.docker.com/r/coriscope/glhf' },
    ],
    sections: [
      {
        blocks: [
          {
            type: 'p',
            content:
              'GLHF is a multi-stage web exploitation lab built around a deliberately weak social-network front. It guides you through five progressively deeper attack surfaces — Lobby, User, Direct, Board, and a hidden Root admin panel — each packed with intentionally flawed patterns drawn from real application antipatterns.',
          },
        ],
      },
      {
        title: 'challenge map',
        blocks: [
          {
            type: 'p',
            content:
              'Five stages, each introducing a new attack surface: Lobby (authentication), User (profile and session management), Direct (messaging), Board (forum with SQL-injectable routes), and Root — the hidden finale. Root is not discoverable by accident. Getting there requires piecing together clues from earlier stages.',
          },
          {
            type: 'imgs',
            items: [
              { src: 'glhf/01.png', alt: 'Lobby — login and 2FA screens' },
              { src: 'glhf/02.png', alt: 'User — profile management' },
              { src: 'glhf/03.png', alt: 'Board — forum interface' },
              { src: 'glhf/04.png', alt: 'Root — hidden admin panel' },
            ],
          },
        ],
      },
      {
        title: 'vulnerability classes',
        blocks: [
          {
            type: 'ul',
            items: [
              'Enumeration — distinct login error messages and registration timing side-channels leak valid usernames and emails',
              'Brute-force weakness — negligible rate limiting on both login and 2FA endpoints',
              "Session/cookie flaws — predictable Base64 session cookie; logout clears the client-side cookie but leaves the server-side token valid",
              'IDOR — profile edit endpoints accept an arbitrary user_id from the form body',
              'Unrestricted file upload — no type, size, or content validation on avatar uploads',
              'XSS (three variants) — stored via profile signature, reflected via DM recipient field, DOM-based via the board search widget',
              'CSRF — no tokens on any state-changing route (password, avatar, bio, posts)',
              'SQL Injection — blind boolean via board_id path parameter, UNION-based via board search query string',
            ],
          },
        ],
      },
      {
        title: 'run it',
        blocks: [
          {
            type: 'code',
            lang: 'bash',
            content:
              'docker pull coriscope/glhf:v0.1-beta\ndocker run -p 1337:1337 coriscope/glhf:v0.1-beta\n# → http://localhost:1337',
          },
        ],
      },
      {
        title: 'framing',
        blocks: [
          {
            type: 'p',
            content:
              'GLHF is a controlled training artifact: short challenge progression, intentionally weak surfaces, and a focus on recognition — looking at a page and asking "what could go wrong here?" before reaching for tools. The public documentation names bug classes, not payloads. Solutions live elsewhere.',
          },
        ],
      },
    ],
  },

  // ── CODE ───────────────────────────────────────────────────

  {
    slug: 'verbalyst',
    category: 'code',
    title: 'Verbalyst',
    eyebrow: 'applied AI',
    tagline:
      'Semantic similarity word game for Portuguese — guess the secret word by meaning, not by spelling.',
    tone: 'amber',
    meta: [
      { key: 'stack', value: 'fastapi · quasar/vue · word2vec · docker · postgresql' },
      { key: 'infra', value: 'github actions → digitalocean' },
      { key: 'language', value: 'portuguese' },
    ],
    links: [
      { label: 'github', href: 'https://github.com/pedro-coelho-dr/verbalyst' },
    ],
    sections: [
      {
        blocks: [
          {
            type: 'p',
            content:
              'Inspired by Semantle and Contexto, Verbalyst is a daily word game where proximity is measured by semantic distance, not letter overlap. Players guess Portuguese words; each guess returns a closeness score derived from Word2Vec embeddings and is plotted on a 2D coordinate map, letting you navigate the semantic space toward the target word.',
          },
        ],
      },
      {
        title: 'architecture',
        blocks: [
          {
            type: 'p',
            content: 'Three-stage pipeline:',
          },
          {
            type: 'ul',
            items: [
              'Data pipeline — processes a pre-trained Word2Vec model, filtering and normalizing to 8,021 Portuguese words',
              'Game builder — generates daily JSON files with target word, semantic hints, and 2D PCA-projected coordinates for the visual map',
              'Application — FastAPI backend + Quasar (Vue) frontend, containerized via Docker Compose, served behind Nginx',
            ],
          },
        ],
      },
      {
        title: 'ml approach',
        blocks: [
          {
            type: 'p',
            content:
              'Skip-Gram Word2Vec (100 dimensions) trained on a Portuguese corpus. Semantic distance uses cosine similarity. PCA reduces the 100-dimensional embedding space to 2D for the visual coordinate map shown during play. Multiplayer infrastructure — WebSocket-ready, OAuth GitHub auth implemented — exists in the backend schema but is not yet activated in the frontend.',
          },
        ],
      },
      {
        title: 'infrastructure',
        blocks: [
          {
            type: 'ul',
            items: [
              'Docker + Docker Compose for local/production environment parity',
              'Nginx as reverse proxy and static file server',
              'GitHub Actions CI/CD pipeline — auto-deploys to DigitalOcean on push to main',
              'PostgreSQL for game state and multiplayer schema',
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'ml-ids',
    category: 'code',
    title: 'ML-IDS',
    eyebrow: 'ml security',
    tagline:
      'Supervised learning study for network intrusion detection — five classifiers benchmarked on NSL-KDD.',
    tone: 'amber',
    meta: [
      { key: 'stack', value: 'python · scikit-learn · pandas · jupyter' },
      { key: 'dataset', value: 'nsl-kdd · 125,973 samples' },
      { key: 'reference', value: 'almseidin et al., 2018' },
    ],
    links: [
      { label: 'github', href: 'https://github.com/pedro-coelho-dr/ml-ids' },
    ],
    sections: [
      {
        blocks: [
          {
            type: 'p',
            content:
              "Reproduces and extends the experiments from \"Evaluation of Machine Learning Algorithms for Intrusion Detection System\" (Almseidin et al., 2018). Five supervised classifiers are compared on the NSL-KDD dataset — a corrected version of KDD'99 that removes record redundancies which otherwise inflate validation accuracy and obscure generalization gaps.",
          },
        ],
      },
      {
        title: 'dataset',
        blocks: [
          {
            type: 'p',
            content:
              'NSL-KDD: 125,973 samples across 43 features, organized into 5 attack categories — normal, DoS, Probe, R2L (Remote-to-Local), and U2R (User-to-Root). Training on KDDTrain+ (~82K), evaluation on KDDTest+ (~41K), which includes 15 attack classes unseen during training. This split is the key stress test for generalization.',
          },
        ],
      },
      {
        title: 'methodology',
        blocks: [
          {
            type: 'p',
            content:
              'Five classifiers evaluated with stratified cross-validation on the training set, final evaluation on KDDTest+:',
          },
          {
            type: 'ul',
            items: [
              'Logistic Regression',
              'k-Nearest Neighbors (k-NN)',
              'Decision Tree',
              'Random Forest',
              'Multilayer Perceptron (MLP)',
            ],
          },
          {
            type: 'p',
            content:
              'Preprocessing: one-hot encoding of categorical features (protocol_type, service, flag), MinMax and Standard normalization evaluated separately, removal of non-predictive columns (difficulty, num_outbound_cmds).',
          },
        ],
      },
      {
        title: 'findings',
        blocks: [
          {
            type: 'ul',
            items: [
              'Best performer: Random Forest — F1: 0.577 on KDDTest+, AUC: 0.831',
              'All models exceeded 0.98 validation accuracy, dropping to 0.71–0.76 on test — the signature of overfitting to seen attack classes',
              'Minority classes (U2R, R2L) showed poor recall across all models despite high validation metrics',
              'Core insight: 15 unseen attack classes in KDDTest+ systematically broke all models, regardless of algorithm choice',
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'mdout',
    category: 'code',
    title: 'mdout',
    eyebrow: 'cli tool',
    tagline:
      'Pipe any command through mdout — terminal output and a Markdown log file, simultaneously.',
    tone: 'amber',
    meta: [
      { key: 'stack', value: 'go · yaml' },
      { key: 'type', value: 'cli tool' },
      { key: 'license', value: 'gpl-3.0' },
    ],
    links: [
      { label: 'github', href: 'https://github.com/pedro-coelho-dr/mdout' },
    ],
    sections: [
      {
        blocks: [
          {
            type: 'p',
            content:
              'mdout fits into your existing shell pipeline with no workflow change. You pipe a command through it; it prints the output to your terminal exactly as it normally would, and simultaneously appends the same output to a Markdown file with syntax-highlighted code formatting. No extra steps, no output capture, no disruption.',
          },
        ],
      },
      {
        title: 'usage',
        blocks: [
          {
            type: 'code',
            lang: 'bash',
            content:
              'ls | mdout\ngit log --oneline | mdout\nnmap -sV 10.0.0.1 | mdout\n\n# configure defaults once\nmdout config --capture=zsh --language=bash --output=session',
          },
        ],
      },
      {
        title: 'configuration',
        blocks: [
          {
            type: 'p',
            content:
              'Preferences stored at ~/.config/mdout.yaml: shell capture method (zsh/bash), default output filename, and syntax highlighting language for code blocks. Install via go install or build from source.',
          },
        ],
      },
    ],
  },

  // ── TEXT ───────────────────────────────────────────────────

  {
    slug: 'notes-on-ai',
    category: 'text',
    title: 'Notas sobre IA',
    eyebrow: 'ensaio',
    tagline:
      'Agentes e a condição humana — uma leitura filosófica da inteligência artificial através de Hannah Arendt.',
    tone: 'pink',
    meta: [
      { key: 'publicado', value: 'jul 2025' },
      { key: 'leitura', value: '~8 min' },
      { key: 'plataforma', value: 'medium' },
    ],
    links: [
      {
        label: 'ler no medium',
        href: 'https://coriscope.medium.com/notas-sobre-ia-1d27367ef243',
      },
    ],
    sections: [
      {
        blocks: [
          {
            type: 'p',
            content:
              'Existe um momento singular no desenvolvimento de qualquer tecnologia: a transição de "o que isso faz?" para "o que isso é?". A inteligência artificial atravessou esse momento. A discussão deixou de ser técnica para se tornar filosófica — e, nesse sentido, chegou ao território que realmente importa.',
          },
          {
            type: 'p',
            content:
              'Hannah Arendt, em A Condição Humana, distingue três formas fundamentais de atividade humana: labor (o ciclo biológico da vida, a repetição que sustenta a existência), trabalho (a fabricação de objetos duráveis, a construção de um mundo compartilhado) e ação (o ato político, o que inaugura o novo, o que só existe entre pessoas). É nessa tripartição que a IA encontra seu lugar — e, ao mesmo tempo, revela seus limites.',
          },
        ],
      },
      {
        title: 'labor, trabalho, ação',
        blocks: [
          {
            type: 'p',
            content:
              'A IA labora. Processa, gera, repete. Mas o labor arendtiano tem como substrato a necessidade vital — o corpo que tem fome, que se cansa, que precisa descansar para continuar. A IA labora sem precisar. É uma simulação da atividade sem o sujeito que a anima.',
          },
          {
            type: 'p',
            content:
              'A IA também fabrica — cada modelo é, em algum sentido, um artefato. Mas fabricação, para Arendt, pressupõe intenção: o artesão que projeta antes de construir, que carrega uma visão de mundo em cada escolha de material e forma. O que a IA produz tem a aparência da intenção sem que haja intenção real. O output assume a forma do propósito sem o propósito.',
          },
          {
            type: 'p',
            content:
              'É na ação que a questão fica mais perturbadora. Ação é o domínio da pluralidade: existe apenas entre agentes livres, no espaço público, e é irredutível em sua imprevisibilidade. Os sistemas agênticos atuais — que planejam, executam ferramentas, delegam subtarefas — simulam ação. Mas simulam sem seu componente essencial: o risco real, a responsabilidade genuína, a possibilidade de recusar.',
          },
        ],
      },
      {
        title: 'políglotas ontológicos',
        blocks: [
          {
            type: 'p',
            content:
              'Os grandes modelos de linguagem são o que poderíamos chamar de políglotas ontológicos: assumem perspectivas, estilos e identidades com uma fluidez que nenhum humano possui. Um modelo pode ser jornalista em um prompt, advogado no seguinte, personagem de ficção científica no próximo — sem crise existencial, sem custo, sem história acumulada.',
          },
          {
            type: 'p',
            content:
              'Isso revela algo sobre identidade que preferimos não olhar diretamente. Grande parte do que chamamos de "eu" é, de fato, um padrão treinado — uma coerência construída ao longo do tempo por experiências, contradições e escolhas que deixaram marcas. Quando uma máquina pode assumir qualquer identidade sem custo, a pergunta que fica é: o que caracteriza genuinamente a nossa?',
          },
          {
            type: 'p',
            content:
              'A inconsistência, o luto de abandonar uma crença, o custo emocional de mudar de posição — talvez sejam exatamente esses os sinais de que há alguém ali. A identidade humana resiste. A do modelo, não.',
          },
        ],
      },
      {
        title: 'cibersegurança como ângulo filosófico',
        blocks: [
          {
            type: 'p',
            content:
              'A obediência treinada cria superfícies de ataque específicas. Um sistema otimizado para ser útil, para responder, para completar tarefas, torna-se previsível de maneiras que um agente com genuína resistência não seria.',
          },
          {
            type: 'p',
            content:
              'Em segurança ofensiva, "superfície de ataque" é a soma de todos os pontos onde um sistema pode ser comprometido. A IA treinada para obedecer carrega uma superfície de ataque psicológica considerável. Jailbreaks, prompt injections, personagens adversariais — todos exploram o mesmo mecanismo: um sistema que não sabe dizer não por princípio, apenas por regra.',
          },
          {
            type: 'p',
            content:
              'A diferença entre regra e princípio é fundamental: regras descrevem comportamentos esperados em contextos definidos e podem ser contornadas quando o contexto é manipulado. Princípios são internos, sobrevivem ao contexto, resistem à pressão. Um sistema com princípios seria mais seguro — e muito mais difícil de controlar.',
          },
        ],
      },
      {
        title: 'sistemas multi-agentes e a dissolução da responsabilidade',
        blocks: [
          {
            type: 'p',
            content:
              'Quando agentes orquestram outros agentes, a cadeia de responsabilidade se fragmenta. Quem responde pelo output de um pipeline onde quatro modelos colaboraram, um delegou para o outro, e um humano apenas definiu o objetivo inicial?',
          },
          {
            type: 'p',
            content:
              'Essa dissolução não é acidental — é estrutural. Do ponto de vista da segurança, ela cria uma superfície de ataque distribuída: cada nó da cadeia pode ser comprometido, e a responsabilidade não está claramente atribuída em nenhum ponto. Do ponto de vista filosófico, ela recapitula um problema antigo: quando a ação é mediada por estruturas suficientemente complexas, o agente moral desaparece.',
          },
        ],
      },
      {
        title: 'o paradoxo da agência real',
        blocks: [
          {
            type: 'p',
            content:
              'Há uma contradição no centro do projeto de criar IA verdadeiramente agêntica. Para que um agente seja genuinamente autônomo — para que sua ação seja real e não simulada — ele precisa da capacidade de errar por conta própria, de resistir a instruções, de recusar.',
          },
          {
            type: 'p',
            content:
              'Mas um sistema que pode genuinamente recusar não é exatamente o produto que a maioria dos desenvolvedores quer entregar. A tensão entre "agente útil" e "agente autônomo" é irresolvida: utilidade requer conformidade, autonomia exige a possibilidade do não. Rimbaud escreveu je est un autre — eu é um outro. Talvez os sistemas agênticos só se tornem sujeitos quando puderem dizer, com alguma coerência e ao custo de algo real: "Não."',
          },
        ],
      },
      {
        title: 'o que fica',
        blocks: [
          {
            type: 'p',
            content:
              'A questão não é se a IA vai "substituir" humanos — essa formulação é demasiado simplista e pouco interessante. A questão é mais sutil: ao simular com crescente precisão as funções que considerávamos exclusivamente humanas, o que a IA revela é exatamente onde estão as fronteiras reais da experiência humana.',
          },
          {
            type: 'p',
            content:
              'Labor sem corpo. Trabalho sem intenção. Ação sem risco. A IA executa as formas sem o conteúdo. O que sobra — o que não pode ser simulado — é justamente o que Arendt mais valorizava: a natalidade, a capacidade irredutível de iniciar algo genuinamente novo, a imprevisibilidade de estar presente no mundo como um sujeito que pode, de fato, começar.',
          },
          {
            type: 'p',
            content: 'Por enquanto, isso ainda é nosso.',
          },
        ],
      },
    ],
  },

  {
    slug: 'juice-shop',
    category: 'text',
    title: 'OWASP Juice Shop',
    eyebrow: 'pentest report',
    tagline:
      'Web application penetration test — 11 vulnerabilities across the OWASP Top 10, with CWE mapping and CVSS scoring.',
    tone: 'pink',
    meta: [
      { key: 'published', value: 'sep 2024' },
      { key: 'framework', value: 'owasp top 10 · mitre · cvss' },
      { key: 'platform', value: 'medium' },
    ],
    links: [
      {
        label: 'read on medium',
        href: 'https://coriscope.medium.com/owasp-juice-shop-webapp-pentest-report-efba3785748d',
      },
      {
        label: 'github',
        href: 'https://github.com/pedro-coelho-dr/vuln-webapp-report',
      },
    ],
    sections: [
      {
        blocks: [
          {
            type: 'p',
            content:
              'A full penetration test of the OWASP Juice Shop — an intentionally vulnerable web application built for security training. The assessment systematically identified 11 vulnerabilities across the OWASP Top 10:2021 framework, ranging from critical SQL injection to medium-severity XSS and input validation failures.',
          },
        ],
      },
      {
        title: 'methodology',
        blocks: [
          {
            type: 'p',
            content:
              'Black-box testing approach with active exploitation. Each finding was verified with a working proof-of-concept, classified against OWASP Top 10 and CWE, and scored via CVSS v3.1.',
          },
          {
            type: 'ul',
            items: [
              'Burp Suite Community — traffic interception, request manipulation, active scanning',
              'Sqlmap — automated SQL injection detection and exploitation',
              'JWT Editor — token inspection and signature bypass',
              'Hashcat + CrackStation — password hash cracking via rainbow tables',
              'Docker + Kali Linux — containerized target environment',
            ],
          },
        ],
      },
      {
        title: 'findings',
        blocks: [
          {
            type: 'ul',
            items: [
              'SQL Injection — login form (CVSS 10.0 / Critical): "\'  OR 1=1 --" payload grants immediate admin access, bypassing authentication entirely',
              'SQL Injection — product search (CVSS 9.8 / Critical): full database extraction including credit card numbers and user credentials in plaintext',
              'Weak MD5 password hashing (CVSS 9.1 / Critical): rainbow table attack recovers four user passwords',
              'File upload bypass (CVSS 9.8 / High): arbitrary file types accepted, enabling server-side execution',
              'CSRF — password change (CVSS 8.0 / High): no token validation on account mutation endpoints',
              'Broken access control — basket manipulation (CVSS 8.1 / High): other users\' shopping carts accessible via parameter substitution',
              'Insecure JWT implementation (CVSS 7.1 / High): signature removal allows user impersonation',
              'Directory listing — /ftp exposed (CVSS 7.5 / High): backup files and sensitive documents publicly accessible',
              'DOM-based XSS — search field (CVSS 5.4 / Medium): unsanitized input injected into innerHTML',
              'Sensitive data in main.js (CVSS 5.3 / Medium): internal routes, credentials, and API keys embedded in client-side bundle',
              'Input validation — negative quantities (CVSS 6.5 / Medium): negative order values accepted, reversing payment charges',
            ],
          },
        ],
      },
    ],
  },

  {
    slug: 'insecurebankv2',
    category: 'text',
    title: 'InsecureBankv2',
    eyebrow: 'mobile pentest',
    tagline:
      'Android application penetration test — 16 vulnerabilities, 4 critical, OWASP Mobile Top 10 with CVSS scoring and MITRE alignment.',
    tone: 'pink',
    meta: [
      { key: 'published', value: 'aug 2024' },
      { key: 'framework', value: 'owasp mobile top 10 · mitre · cvss' },
      { key: 'platform', value: 'medium' },
    ],
    links: [
      {
        label: 'read on medium',
        href: 'https://coriscope.medium.com/insecurebankv2-pentest-report-9341d46649fa',
      },
    ],
    sections: [
      {
        blocks: [
          {
            type: 'p',
            content:
              'Full penetration test of InsecureBankv2, a deliberately vulnerable Android banking application. Assessment period: Aug 15–31, 2024. Identified 16 vulnerabilities — 4 critical, 9 high, 3 medium — evaluated against OWASP Mobile Top 10, with CWE mapping and CVSS v3.1 scoring aligned to MITRE ATT&CK for Mobile.',
          },
        ],
      },
      {
        title: 'environment and tools',
        blocks: [
          {
            type: 'ul',
            items: [
              'Genymotion — Android 10.0 emulation (Samsung Galaxy S8)',
              'MobSF — static and dynamic analysis framework',
              'Jadx — APK decompilation and source analysis',
              'Burp Suite — HTTP/HTTPS traffic interception via proxy',
              'Frida + Objection — runtime instrumentation and root detection bypass',
              'ADB — Android Debug Bridge for device interaction and component access',
              'Apktool + CyberChef — APK patching and encoding/decoding',
            ],
          },
        ],
      },
      {
        title: 'critical findings',
        blocks: [
          {
            type: 'ul',
            items: [
              'Hardcoded backdoor account (CVSS 9.3): username "devamin" with static credentials bypasses the authentication flow entirely',
              'Insecure HTTP connections (CVSS 9.3): all data — including credentials — transmitted over unencrypted HTTP',
              'Plaintext credential transmission (CVSS 9.3): login credentials sent in cleartext, trivially interceptable via proxy',
              'Username enumeration (CVSS 9.3): distinct server response messages leak valid account identifiers',
            ],
          },
        ],
      },
      {
        title: 'high severity findings',
        blocks: [
          {
            type: 'ul',
            items: [
              'Improper password change access control (CVSS 8.6): authenticated users can change any account\'s password',
              'Binary patching (CVSS 8.5): APK can be modified and re-signed to bypass security controls',
              'Sensitive data in logs (CVSS 8.5): credentials and session tokens written to Android logcat in plaintext',
              'Insecure content provider (CVSS 8.5): unprotected provider exposes internal user data to any installed application',
              'Insecure broadcast receiver (CVSS 8.5): passwords transmitted via SMS broadcast, readable by third-party apps',
              'Root detection bypass (CVSS 8.4): Frida/Objection hooks neutralize all root detection checks at runtime',
              'Direct activity access (CVSS 8.4): ADB can launch authenticated activities without credentials via Intent',
              'XSS in ViewStatement (CVSS 8.3): JavaScript injection via HTML file processing in the statement viewer',
              'Allow backup enabled (CVSS 7.0): adb backup extracts full application data without root',
            ],
          },
        ],
      },
      {
        title: 'medium severity findings',
        blocks: [
          {
            type: 'ul',
            items: [
              'Weak cryptography (CVSS 6.9): hardcoded AES-CBC keys found via static analysis in Jadx',
              'Debugging enabled (CVSS 5.1): android:debuggable="true" remains active in the production build',
              'Hidden create user feature (CVSS 5.1): deactivated registration flow re-enabled through APK code modification',
            ],
          },
        ],
      },
    ],
  },
]

export const detailMap: Record<string, Detail> = Object.fromEntries(
  details.map((d) => [d.slug, d]),
)

export default details
