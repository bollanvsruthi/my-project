import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Database, 
  Binary, 
  Cpu, 
  Code2, 
  Globe2
} from 'lucide-react';
import { TEAM_MEMBERS } from './Footer';

interface VivaDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToTab?: (tab: 'soc' | 'graph' | 'dbms' | 'dmgt' | 'adsa' | 'python' | 'presentation') => void;
}

export const VivaDemoModal: React.FC<VivaDemoModalProps> = ({ isOpen, onClose, onJumpToTab }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [teluguMode, setTeluguMode] = useState<boolean>(true);

  if (!isOpen) return null;

  const steps = [
    {
      stepNumber: 1,
      title: 'Problem Statement & Motivation',
      subject: 'Overview & Campus Security',
      englishExplanation: 'Campus networks host thousands of heterogeneous devices (students, faculty, guests, smart IoT). Because authentication logs are high-volume and decentralized, standard relational search cannot flag stealthy attacks like token hijacking across continents or slow distributed brute force.',
      teluguExplanation: 'మన కాలేజ్ క్యాంపస్ నెట్‌వర్క్‌లో వేలాది మంది స్టూడెంట్స్, ఫ్యాకల్టీ లాగిన్ అవుతుంటారు. ఎవరైనా హ్యాకర్ లేదా స్టూడెంట్ టోకెన్ దొంగిలించి ఫ్రాంక్‌ఫర్ట్ లేదా వేరే దేశం నుంచి 1 నిమిషంలో లాగిన్ అయితే, సాధారణ డేటాబేస్ పసిగట్టలేదు. దీనినే "Impossible Travel" అంటారు. మన సిస్టమ్ ఈ సమస్యను రియల్-టైమ్‌లో పసిగట్టి అడ్డుకుంటుంది.',
      vivaQuestions: [
        { q: 'Why not just use standard SQL SELECT queries?', a: 'Standard queries look at static records. Detecting velocity anomalies requires temporal windowing (LAG/LEAD) and cross-session correlation across subnets.' },
        { q: 'What are the main attacks we detect?', a: 'Impossible Travel (Velocity breach), Off-hours SSH Brute Force, Lateral Movement to Registrar Core, and Token Replay.' }
      ],
      tabTarget: 'soc' as const
    },
    {
      stepNumber: 2,
      title: 'DBMS: Relational ER Model & Window Functions',
      subject: 'DBMS (Unit 1 & 2)',
      englishExplanation: 'We modeled normalized BCNF tables: USERS (1) ➔ SESSIONS (N) ➔ ACCESS_LOGS (N) ➔ ANOMALY_ALERTS (N). To identify anomalies, we write SQL with LAG() window functions: computing the geodesic distance between sequential logins divided by EPOCH(delta_time).',
      teluguExplanation: 'డేటాబేస్ లో మనం Users, Sessions, Access_Logs అనే 3 ప్రధాన టేబుల్స్ చేసాం. ఒక్క యూజర్‌కి చాలా సెషన్స్ ఉంటాయి (1:N Cardinality). SQL లో `LAG()` అనే Window Function వాడి, మునుపటి లాగిన్ సమయం మరియు ప్రస్తుత లాగిన్ సమయం మధ్య ఉన్న గ్యాప్ (Delta T) లెక్కించి, వేగం 900 km/h దాటితే Anomaly గా ఫ్లాగ్ చేస్తాం.',
      vivaQuestions: [
        { q: 'What is the primary key and foreign key structure?', a: 'Users.user_id (PK) ➔ Sessions.user_id (FK), Sessions.session_id (PK) ➔ Access_Logs.session_id (FK).' },
        { q: 'Why did you use LAG() instead of self-join?', a: 'Self-join on millions of logs is O(N^2), causing extreme latency. LAG() with partition by session/user executes in O(N log N) using B-Tree indexing.' }
      ],
      tabTarget: 'dbms' as const
    },
    {
      stepNumber: 3,
      title: 'DMGT: Propositional Logic & Equivalence Partitions',
      subject: 'Discrete Mathematics & Graph Theory',
      englishExplanation: 'We apply formal mathematical foundations: 1) First-Order Predicate Calculus for Physical Velocity Rule P ∧ Q. 2) Equivalence Relations on Session Subnets: a valid session must belong to an equivalence class partition. 3) Warshall\'s Transitive Closure A* to verify valid network routing.',
      teluguExplanation: 'డిస్క్రీట్ మ్యాథమెటిక్స్ (DMGT) లో మనం 3 కాన్సెప్ట్స్ వాడాం: 1) Predicate Logic: Velocity(s) > 900 km/h అయితే True అని రూల్ రాయడం. 2) Equivalence Relations: ఒకే సెషన్ టోకెన్ ఒకేసారి రెండు వేర్వేరు సబ్‌నెట్లలో ఉండకూడదు. 3) Warshall\'s Transitive Closure: ఫైర్‌వాల్ బైపాస్ చేసి రిజిస్ట్రార్ డేటాబేస్‌కి వెళ్లకుండా పాత్ ని రూల్స్ ద్వారా చెక్ చేయడం.',
      vivaQuestions: [
        { q: 'How does Equivalence Relation apply here?', a: 'Session token space S is partitioned into disjoint equivalence classes. If s ∈ Subnet_A ∧ s ∈ Subnet_B where A ∩ B = ∅, reflexivity breaks and an anomaly is triggered.' },
        { q: 'What does Warshall\'s algorithm do in your project?', a: 'Computes the transitive reachability matrix A*. Any direct link from unauthenticated Dorm subnet to Registrar Core without passing Bastion violates access reachability.' }
      ],
      tabTarget: 'dmgt' as const
    },
    {
      stepNumber: 4,
      title: 'ADSA: Access-Pattern Graph & BFS Traversal',
      subject: 'Advanced Data Structures & Algorithms',
      englishExplanation: 'We represent campus entities as a multi-tier Directed Graph G = (V, E) where V includes Users, IPs, Subnets, and Resources. An Adjacency List ensures O(|V| + |E|) memory. Breadth-First Search (BFS) detects shortest-path policy violations; Disjoint Set Union (DSU) calculates breach blast radius.',
      teluguExplanation: 'ADSA లో గ్రాఫ్ డేటా స్ట్రక్చర్ వాడాం. యూజర్లు, ఐపీలు, సర్వర్లు అన్నింటినీ Nodes (Vertices) గాను, వాటన్నింటి మధ్య కనెక్షన్స్ ని Edges గాను Adjacency List లో స్టోర్ చేసాం. BFS (Breadth-First Search) అల్గారిథమ్ వాడి, హ్యాకర్ ఎన్ని హాప్స్ లో మెయిన్ డేటాబేస్ ని టచ్ చేసాడో రూట్ కనిపెడతాం.',
      vivaQuestions: [
        { q: 'Why Adjacency List instead of Adjacency Matrix?', a: 'Campus network graphs are sparse (|E| << |V|^2). Adjacency List uses O(|V| + |E|) space instead of O(|V|^2), preventing memory overflow.' },
        { q: 'What is the time complexity of your BFS anomaly path trace?', a: 'O(|V| + |E|), allowing real-time trajectory reconstruction as packets hit the network edge.' }
      ],
      tabTarget: 'adsa' as const
    },
    {
      stepNumber: 5,
      title: 'OOPJ & Python: Statistical Gaussian Z-Score & Isolation Forest',
      subject: 'OOP with Java & Python Data Science',
      englishExplanation: 'OOP Architecture uses the Strategy pattern for interchangeable detectors and Observer for alerting SOC consoles. Python code uses NumPy/Pandas to calculate rolling Gaussian Z-Scores: Z = (x - μ) / σ. If |Z| > 3.0σ (99.7% confidence), an automated incident is dispatched.',
      teluguExplanation: 'OOP లో మనం Interface, Polymorphism, Strategy pattern వాడాం. పైథాన్ లో NumPy, Pandas వాడి Rolling Z-Score `(x - mean) / std_dev` ఫార్ములా ఉపయోగించి, నార్మల్ ట్రాఫిక్ కంటే 3 రెట్లు (3.0 Sigma) ఎక్కువ ఫెయిల్యూర్స్ వస్తే దాన్ని బ్రూట్ ఫోర్స్ ఎటాక్ గా గుర్తుపడతాం.',
      vivaQuestions: [
        { q: 'What is a Z-score cutoff of 3.0?', a: 'In a normal Gaussian distribution, 99.73% of events lie within ±3σ. Values exceeding 3.0σ have a <0.27% probability of occurring by chance, proving an anomaly.' },
        { q: 'Why combine rule-based DMGT with statistical Python?', a: 'Rule-based catches known deterministic violations (e.g. supersonic travel); statistical models catch subtle zero-day anomalies like distributed slow brute force.' }
      ],
      tabTarget: 'python' as const
    },
    {
      stepNumber: 6,
      title: 'Incident Containment & SOC Defense Demonstration',
      subject: 'Live Security Mitigation',
      englishExplanation: 'Detection without remediation is incomplete. Our system incorporates 1-click active containment: Border Router IP Null-Routing, Session Bearer Invalidation, and Adaptive Step-Up MFA Challenge. Forensic reports are automatically packaged for compliance.',
      teluguExplanation: 'కేవలం కనిపెట్టడమే కాదు, వెంటనే యాక్షన్ తీసుకోవడం ముఖ్యం! మన సిస్టమ్ లో "Block IP" నొక్కగానే క్యాంపస్ రూటర్ లో ఆ IP బ్లాక్ అవుతుంది, అలాగే "Revoke Session" నొక్కగానే హ్యాకర్ చేతిలో ఉన్న టోకెన్ రద్దు అయిపోతుంది. దీని వల్ల డేటా లీక్ కాకుండా ఆగిపోతుంది.',
      vivaQuestions: [
        { q: 'How does the system prevent denial of service on legitimate users?', a: 'Rather than permanently locking accounts, we revoke the specific session token and challenge with multi-factor authentication (MFA step-up).' },
        { q: 'Which team developed this system?', a: 'TEAM-15: Bolla Naga Venkata Sruthi (Lead), Kesavadasu Moulika, Murapaka Pavan Veera Sai Santhosh, Guthula Krishna Suryaprasad, Kota Jaswanth.' }
      ],
      tabTarget: 'soc' as const
    }
  ];

  const current = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in font-mono">
      <div className="bg-[#0D1527] border border-[#00F0FF]/70 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-[0_0_60px_rgba(0,240,255,0.3)] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#1E293B] bg-[#050811] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/15 border border-[#00F0FF]/60 flex items-center justify-center glow-cyan">
              <GraduationCap className="w-5 h-5 text-[#00F0FF]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#FFFFFF] tracking-wide">
                  VIVA VOCE & PROJECT DEFENSE MASTER GUIDE
                </h3>
                <span className="px-2 py-0.5 rounded bg-[#9D4EDD]/20 text-[#9D4EDD] text-[10px] font-bold border border-[#9D4EDD]/50">
                  TEAM-15 CAPSTONE
                </span>
              </div>
              <p className="text-xs text-[#94A3B8]">
                Step-by-step technical explanation covering DBMS, DMGT, ADSA, OOPJ & Python
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Telugu Toggle */}
            <button
              onClick={() => setTeluguMode(!teluguMode)}
              className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition ${
                teluguMode 
                  ? 'bg-[#00FF87]/20 border-[#00FF87] text-[#00FF87] font-bold' 
                  : 'bg-[#050811] border-[#1E293B] text-[#94A3B8]'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              {teluguMode ? 'Telugu Explanations: ON' : 'English Only'}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#050811] border border-[#1E293B] text-[#94A3B8] hover:text-[#FFFFFF] transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Indicator Pills */}
        <div className="px-4 py-2.5 bg-[#080d1a] border-b border-[#1E293B] flex items-center justify-between gap-1 overflow-x-auto">
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                currentStep === idx
                  ? 'bg-[#00F0FF] text-black shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                  : 'bg-[#050811] text-[#94A3B8] border border-[#1E293B] hover:text-[#FFFFFF]'
              }`}
            >
              <span>{s.stepNumber}.</span>
              <span className="truncate max-w-[120px]">{s.subject.split('(')[0]}</span>
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#090e1c] text-xs">
          {/* Step Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] text-[#00F0FF] uppercase tracking-wider font-bold">
                Step {current.stepNumber} of 6 • {current.subject}
              </span>
              <h2 className="text-base font-bold text-[#FFFFFF] mt-0.5">
                {current.title}
              </h2>
            </div>
            {onJumpToTab && (
              <button
                onClick={() => {
                  onJumpToTab(current.tabTarget);
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-[#0D1527] hover:bg-[#1E293B] border border-[#00F0FF]/60 text-[#00F0FF] text-xs flex items-center gap-1 transition shrink-0"
              >
                <span>View in App UI</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* English Concept Card */}
          <div className="bg-[#050811] border border-[#1E293B] rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-[#00F0FF] font-bold text-[11px] uppercase">
              <BookOpen className="w-3.5 h-3.5" />
              Formal Technical Summary (For Presentation & PPT)
            </div>
            <p className="text-[#E0F2FE] leading-relaxed text-xs">
              {current.englishExplanation}
            </p>
          </div>

          {/* Telugu Touch Card */}
          {teluguMode && (
            <div className="bg-[#050811] border border-[#00FF87]/50 rounded-xl p-4 space-y-2 glow-emerald">
              <div className="flex items-center gap-2 text-[#00FF87] font-bold text-[11px] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#00FF87]" />
                Friendly Telugu Explanation (సులభంగా అర్థమయ్యే రీతిలో)
              </div>
              <p className="text-[#E0F2FE] leading-relaxed text-xs font-sans">
                {current.teluguExplanation}
              </p>
            </div>
          )}

          {/* Viva Questions & Model Answers */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#FF6B00] font-bold text-xs uppercase">
              <HelpCircle className="w-4 h-4 text-[#FF6B00]" />
              Expected Viva Questions from Faculty / Examiners
            </div>

            <div className="space-y-2.5">
              {current.vivaQuestions.map((vq, idx) => (
                <div
                  key={idx}
                  className="bg-[#050811] border border-[#1E293B] rounded-xl p-3.5 space-y-1.5"
                >
                  <div className="text-[#FFFFFF] font-bold flex items-start gap-2">
                    <span className="text-[#FF6B00]">Q{idx + 1}:</span>
                    <span>{vq.q}</span>
                  </div>
                  <div className="text-[#94A3B8] pl-5 leading-relaxed">
                    <span className="text-[#00FF87] font-semibold">Answer: </span>
                    {vq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="p-3 border-t border-[#1E293B] bg-[#050811] flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-3 py-1.5 rounded-lg bg-[#0D1527] border border-[#1E293B] text-[#94A3B8] hover:text-[#FFFFFF] disabled:opacity-30 flex items-center gap-1 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Concept
          </button>

          <span className="text-xs text-[#94A3B8]">
            {currentStep + 1} / {steps.length}
          </span>

          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="px-3.5 py-1.5 rounded-lg bg-[#00F0FF] text-black font-bold hover:bg-[#00F0FF]/90 disabled:opacity-30 flex items-center gap-1 transition shadow-[0_0_12px_rgba(0,240,255,0.3)]"
          >
            Next Concept
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
