import { User, Session, AccessLog, ThreatAlert, GraphNode, GraphEdge, DMGTRule, SQLAnomalyQuery, PresentationSlide } from '../types';

export const INITIAL_USERS: User[] = [
  { id: 'usr-101', username: 'alex.chen', fullName: 'Alex Chen', role: 'student', department: 'Computer Science', riskScore: 88, primarySubnet: '10.20.0.0/16', isFlagged: true },
  { id: 'usr-102', username: 'prof.morrison', fullName: 'Dr. Evelyn Morrison', role: 'faculty', department: 'Quantum Physics', riskScore: 14, primarySubnet: '10.50.0.0/16', isFlagged: false },
  { id: 'usr-103', username: 'admin.kaufman', fullName: 'Marcus Kaufman', role: 'sysadmin', department: 'Central IT Infrastructure', riskScore: 72, primarySubnet: '192.168.1.0/24', isFlagged: true },
  { id: 'usr-104', username: 'maya.patel', fullName: 'Maya Patel', role: 'student', department: 'Biomedical Eng', riskScore: 8, primarySubnet: '10.20.0.0/16', isFlagged: false },
  { id: 'usr-105', username: 'jordan.lee', fullName: 'Jordan Lee', role: 'student', department: 'Economics', riskScore: 22, primarySubnet: '10.10.0.0/16', isFlagged: false },
  { id: 'usr-106', username: 'dean.vasquez', fullName: 'Dean Carlos Vasquez', role: 'faculty', department: 'Academic Affairs', riskScore: 65, primarySubnet: '10.50.0.0/16', isFlagged: true },
];

export const CAMPUS_SUBNETS = [
  { cidr: '10.20.0.0/16', name: 'West Quad Dormitories (WiFi)', securityLevel: 'LOW', gateway: '10.20.0.1' },
  { cidr: '10.50.0.0/16', name: 'Science & Engineering Complex', securityLevel: 'MEDIUM', gateway: '10.50.0.1' },
  { cidr: '10.10.0.0/16', name: 'Library & Commons Guest Hub', securityLevel: 'LOW', gateway: '10.10.0.1' },
  { cidr: '10.80.0.0/16', name: 'Turing HPC Cluster Subnet', securityLevel: 'HIGH', gateway: '10.80.0.1' },
  { cidr: '192.168.1.0/24', name: 'Central IT & Registrar Core (Restricted)', securityLevel: 'RESTRICTED', gateway: '192.168.1.1' },
  { cidr: '185.220.101.0/24', name: 'External Tor Exit Node / Darknet Proxy', securityLevel: 'HOSTILE', gateway: '185.220.101.1' },
];

export const INITIAL_LOGS: AccessLog[] = [
  {
    id: 'log-9901',
    timestamp: '2026-09-20 05:22:10',
    sessionId: 'sess-849102',
    userId: 'usr-101',
    username: 'alex.chen',
    ipAddress: '10.20.14.88',
    subnet: '10.20.0.0/16',
    building: 'Dorm Hall B',
    targetResource: 'LMS-Canvas',
    action: 'LOGIN_SUCCESS',
    status: 'SUCCESS',
    latencyMs: 142,
    threatScore: 12,
    isAnomaly: false,
    details: 'Standard student portal authentication via mobile device'
  },
  {
    id: 'log-9902',
    timestamp: '2026-09-20 05:23:44',
    sessionId: 'sess-849102',
    userId: 'usr-101',
    username: 'alex.chen',
    ipAddress: '185.220.101.5',
    subnet: '185.220.101.0/24',
    building: 'External Tor Exit (Frankfurt)',
    targetResource: 'SIS-GradePortal',
    action: 'RESOURCE_QUERY',
    status: 'SUCCESS',
    latencyMs: 480,
    threatScore: 94,
    isAnomaly: true,
    anomalyType: 'IMPOSSIBLE_TRAVEL',
    details: 'CRITICAL: Token reused 1m34s later from IP in Germany. Velocity: ~3800 km/h.'
  },
  {
    id: 'log-9903',
    timestamp: '2026-09-20 05:24:01',
    sessionId: 'sess-849103',
    userId: 'usr-101',
    username: 'alex.chen',
    ipAddress: '185.220.101.5',
    subnet: '185.220.101.0/24',
    building: 'External Tor Exit (Frankfurt)',
    targetResource: 'SIS-GradePortal/RegistrarAdmin',
    action: 'PRIVILEGE_ELEVATE',
    status: 'BLOCKED',
    latencyMs: 310,
    threatScore: 98,
    isAnomaly: true,
    anomalyType: 'LATERAL_MOVEMENT',
    details: 'Blocked attempt to invoke Registrar Faculty Override without MFA handshake.'
  },
  {
    id: 'log-9904',
    timestamp: '2026-09-20 05:24:15',
    sessionId: 'sess-849200',
    userId: 'usr-103',
    username: 'admin.kaufman',
    ipAddress: '10.10.45.12',
    subnet: '10.10.0.0/16',
    building: 'Library Open WiFi',
    targetResource: 'AdminSSH-Bastion',
    action: 'LOGIN_FAIL',
    status: 'FAILURE',
    latencyMs: 85,
    threatScore: 78,
    isAnomaly: true,
    anomalyType: 'OFF_HOURS_BRUTE_FORCE',
    details: 'Failed root SSH authentication attempt 1/14 from unencrypted Library public subnet at 05:24 AM.'
  },
  {
    id: 'log-9905',
    timestamp: '2026-09-20 05:24:19',
    sessionId: 'sess-849200',
    userId: 'usr-103',
    username: 'admin.kaufman',
    ipAddress: '10.10.45.12',
    subnet: '10.10.0.0/16',
    building: 'Library Open WiFi',
    targetResource: 'AdminSSH-Bastion',
    action: 'LOGIN_FAIL',
    status: 'FAILURE',
    latencyMs: 78,
    threatScore: 84,
    isAnomaly: true,
    anomalyType: 'OFF_HOURS_BRUTE_FORCE',
    details: 'Failed root SSH authentication attempt 2/14. High repetition rate (400ms delta).'
  },
  {
    id: 'log-9906',
    timestamp: '2026-09-20 05:24:23',
    sessionId: 'sess-849200',
    userId: 'usr-103',
    username: 'admin.kaufman',
    ipAddress: '10.10.45.12',
    subnet: '10.10.0.0/16',
    building: 'Library Open WiFi',
    targetResource: 'AdminSSH-Bastion',
    action: 'LOGIN_FAIL',
    status: 'FAILURE',
    latencyMs: 81,
    threatScore: 92,
    isAnomaly: true,
    anomalyType: 'OFF_HOURS_BRUTE_FORCE',
    details: 'Z-score = 4.82 on burst attempt volume. Heuristic firewall flagged brute force cadence.'
  },
  {
    id: 'log-9907',
    timestamp: '2026-09-20 05:25:00',
    sessionId: 'sess-849310',
    userId: 'usr-102',
    username: 'prof.morrison',
    ipAddress: '10.50.8.21',
    subnet: '10.50.0.0/16',
    building: 'Physics Complex Rm 401',
    targetResource: 'ResearchHPC-Cluster',
    action: 'LOGIN_SUCCESS',
    status: 'SUCCESS',
    latencyMs: 195,
    threatScore: 8,
    isAnomaly: false,
    details: 'Authorized SSH key exchange from whitelisted faculty workstation.'
  },
  {
    id: 'log-9908',
    timestamp: '2026-09-20 05:26:10',
    sessionId: 'sess-849405',
    userId: 'usr-104',
    username: 'maya.patel',
    ipAddress: '10.20.33.102',
    subnet: '10.20.0.0/16',
    building: 'Dorm Hall A',
    targetResource: 'LMS-Canvas',
    action: 'LOGIN_SUCCESS',
    status: 'SUCCESS',
    latencyMs: 110,
    threatScore: 5,
    isAnomaly: false,
    details: 'Normal assignment download session'
  }
];

export const INITIAL_ALERTS: ThreatAlert[] = [
  {
    id: 'alt-001',
    timestamp: '2026-09-20 05:23:44',
    severity: 'CRITICAL',
    type: 'IMPOSSIBLE_TRAVEL',
    title: 'Impossible Geographic & Subnet Velocity Breach',
    description: 'Active bearer token for user "alex.chen" was presented from Frankfurt Tor exit 94 seconds after authentication at West Quad Dorm WiFi (US East). Physical displacement impossible ($V \\approx 3800 \\text{ km/h}$).',
    affectedUser: 'alex.chen',
    affectedIp: '185.220.101.5',
    targetResource: 'SIS-GradePortal',
    mitreTactic: 'Initial Access / Credential Access',
    mitreTechnique: 'T1539 - Steal Web Session Cookie',
    status: 'UNRESOLVED',
    dmgtRuleId: 'DMGT-R1_VELOCITY',
    zScore: 5.42,
    evidence: [
      'Origin IP: 10.20.14.88 (West Quad Dorms) at 05:22:10 UTC',
      'Target IP: 185.220.101.5 (Tor Exit Germany) at 05:23:44 UTC',
      'Session Token: sess-849102 [Reused across differing ASN & User-Agent]',
      'Target API Endpoint: /api/v1/registrar/student-transcripts'
    ]
  },
  {
    id: 'alt-002',
    timestamp: '2026-09-20 05:24:23',
    severity: 'HIGH',
    type: 'OFF_HOURS_BRUTE_FORCE',
    title: 'Off-Hours High-Privilege SSH Brute Force Cluster',
    description: '14 consecutive rapid failed logins against Core Bastion using privileged identity "admin.kaufman" originating from unauthenticated Library public WiFi during dormant hours (05:24 AM).',
    affectedUser: 'admin.kaufman',
    affectedIp: '10.10.45.12',
    targetResource: 'AdminSSH-Bastion',
    mitreTactic: 'Credential Access',
    mitreTechnique: 'T1110.001 - Brute Force: Password Guessing',
    status: 'INVESTIGATING',
    dmgtRuleId: 'DMGT-R4_RATE_BURST',
    zScore: 4.82,
    evidence: [
      'Burst Rate: 14 attempts in 22 seconds (threshold: 3/min)',
      'Subnet: 10.10.0.0/16 (Public unauthenticated commons)',
      'Time: 05:24:00 (Historic baseline failure rate at this hour: 0.02%)',
      'Account Flag: Tier 1 Domain Administrator'
    ]
  },
  {
    id: 'alt-003',
    timestamp: '2026-09-20 05:24:01',
    severity: 'HIGH',
    type: 'LATERAL_MOVEMENT',
    title: 'Unauthorized Transitive Subnet Hop to Restricted Zone',
    description: 'Traffic from untrusted gateway attempted direct RPC handshake with 192.168.1.0/24 (Registrar Core) bypassing mandatory 2-tier bastion host.',
    affectedUser: 'alex.chen',
    affectedIp: '185.220.101.5',
    targetResource: 'SIS-GradePortal/RegistrarAdmin',
    mitreTactic: 'Lateral Movement',
    mitreTechnique: 'T1021 - Remote Services',
    status: 'UNRESOLVED',
    dmgtRuleId: 'DMGT-R3_TRANSITIVE',
    zScore: 3.91,
    evidence: [
      'DMGT Transitive Closure path: (TorNode -> WebEdge -> CoreDB) violates ACL rule R*',
      'Missing intermediate bastion signature in session header',
      'Endpoint triggered WAF Rule #4032 - SQL/NoSQL Injection Probe'
    ]
  }
];

export const INITIAL_GRAPH_NODES: GraphNode[] = [
  // Users
  { id: 'usr-alex', label: 'alex.chen', type: 'USER', status: 'compromised', risk: 94, role: 'student', x: 120, y: 140 },
  { id: 'usr-admin', label: 'admin.kaufman', type: 'USER', status: 'suspicious', risk: 78, role: 'sysadmin', x: 120, y: 260 },
  { id: 'usr-morrison', label: 'prof.morrison', type: 'USER', status: 'normal', risk: 14, role: 'faculty', x: 120, y: 380 },
  { id: 'usr-patel', label: 'maya.patel', type: 'USER', status: 'normal', risk: 8, role: 'student', x: 120, y: 500 },

  // IPs / Gateways
  { id: 'ip-dorm', label: '10.20.14.88 (Dorm)', type: 'IP', status: 'normal', risk: 15, cidr: '10.20.0.0/16', x: 320, y: 110 },
  { id: 'ip-tor', label: '185.220.101.5 (Tor Exit)', type: 'IP', status: 'compromised', risk: 98, cidr: 'External', x: 320, y: 210 },
  { id: 'ip-library', label: '10.10.45.12 (Library)', type: 'IP', status: 'suspicious', risk: 75, cidr: '10.10.0.0/16', x: 320, y: 310 },
  { id: 'ip-faculty', label: '10.50.8.21 (Physics)', type: 'IP', status: 'normal', risk: 10, cidr: '10.50.0.0/16', x: 320, y: 410 },

  // Campus Subnets / Routers
  { id: 'sub-dorms', label: 'Subnet: 10.20.0.0/16', type: 'SUBNET', status: 'normal', risk: 20, building: 'West Dorms', x: 540, y: 130 },
  { id: 'sub-library', label: 'Subnet: 10.10.0.0/16', type: 'SUBNET', status: 'suspicious', risk: 65, building: 'Library Commons', x: 540, y: 270 },
  { id: 'sub-eng', label: 'Subnet: 10.50.0.0/16', type: 'SUBNET', status: 'normal', risk: 12, building: 'Science Complex', x: 540, y: 410 },

  // Target Resources
  { id: 'res-sis', label: 'SIS-GradePortal', type: 'RESOURCE', status: 'compromised', risk: 90, x: 740, y: 150 },
  { id: 'res-bastion', label: 'AdminSSH-Bastion', type: 'RESOURCE', status: 'suspicious', risk: 80, x: 740, y: 280 },
  { id: 'res-canvas', label: 'LMS-Canvas', type: 'RESOURCE', status: 'normal', risk: 10, x: 740, y: 400 },
  { id: 'res-hpc', label: 'ResearchHPC', type: 'RESOURCE', status: 'normal', risk: 12, x: 740, y: 510 },
];

export const INITIAL_GRAPH_EDGES: GraphEdge[] = [
  // Normal edges
  { id: 'e1', source: 'usr-alex', target: 'ip-dorm', label: 'Auth WiFi', timestamp: '05:22:10', weight: 1 },
  { id: 'e2', source: 'ip-dorm', target: 'sub-dorms', label: 'Gateway Route', timestamp: '05:22:11', weight: 1 },
  { id: 'e3', source: 'sub-dorms', target: 'res-canvas', label: 'HTTP GET /courses', timestamp: '05:22:15', weight: 1 },
  
  // Anomalous Impossible Travel & Token Replay
  { id: 'e4', source: 'usr-alex', target: 'ip-tor', label: '🚨 Token Hijack (Tor)', timestamp: '05:23:44', weight: 3, isAnomaly: true, anomalyType: 'IMPOSSIBLE_TRAVEL' },
  { id: 'e5', source: 'ip-tor', target: 'res-sis', label: '🚨 Direct Exfil Query', timestamp: '05:23:45', weight: 4, isAnomaly: true, anomalyType: 'LATERAL_MOVEMENT' },

  // Brute force from Library
  { id: 'e6', source: 'usr-admin', target: 'ip-library', label: '⚠️ Unauthenticated IP', timestamp: '05:24:00', weight: 2, isAnomaly: true, anomalyType: 'OFF_HOURS_BRUTE_FORCE' },
  { id: 'e7', source: 'ip-library', target: 'sub-library', label: 'Raw Packet Stream', timestamp: '05:24:02', weight: 2 },
  { id: 'e8', source: 'sub-library', target: 'res-bastion', label: '🚨 14x SSH Burst', timestamp: '05:24:15', weight: 4, isAnomaly: true, anomalyType: 'OFF_HOURS_BRUTE_FORCE' },

  // Authorized Faculty Flow
  { id: 'e9', source: 'usr-morrison', target: 'ip-faculty', label: 'Faculty Workstation', timestamp: '05:25:00', weight: 1 },
  { id: 'e10', source: 'ip-faculty', target: 'sub-eng', label: 'Campus Fiber', timestamp: '05:25:01', weight: 1 },
  { id: 'e11', source: 'sub-eng', target: 'res-hpc', label: 'MPI Slurm Job', timestamp: '05:25:02', weight: 1 },

  // Student Normal
  { id: 'e12', source: 'usr-patel', target: 'ip-dorm', label: 'Auth WiFi', timestamp: '05:26:10', weight: 1 },
];

export const DMGT_RULES: DMGTRule[] = [
  {
    ruleId: 'DMGT-R1_VELOCITY',
    name: 'Spatiotemporal Impossible Travel Rule',
    discreteMathTopic: 'Predicate Calculus',
    formalLogic: '∀ u ∈ U, ∀ (t₁, t₂) ∈ T² : [Access(u, ip₁, t₁) ∧ Access(u, ip₂, t₂) ∧ (t₂ - t₁ < Δt_min) ∧ dist(ip₁, ip₂) > (v_max · (t₂ - t₁))] ⟹ Anomaly(u, t₂)',
    relationalDefinition: 'Let R_geo ⊆ (User × IP × Time) × (User × IP × Time). An edge ((u, ip₁, t₁), (u, ip₂, t₂)) ∈ R_geo violates physical plausibility iff geodesic_distance(ip₁, ip₂) / |t₂ - t₁| > 900 km/h.',
    description: 'Evaluates the velocity relation between two consecutive successful sessions utilizing the same credentials or session token. If the calculated physical speed exceeds Mach 1, flag as stolen session token.',
    violationCondition: 'Velocity > 900 km/h AND Delta T < 300 seconds',
    triggerCount: 3
  },
  {
    ruleId: 'DMGT-R2_EQUIVALENCE',
    name: 'Session Token Equivalence & Partition Invariance',
    discreteMathTopic: 'Equivalence Relations',
    formalLogic: 'Let ~ be the equivalence relation on Sessions: s₁ ~ s₂ ⟺ (token(s₁) = token(s₂)). The partition S/~ must satisfy: ∀ [s] ∈ S/~ : |{ subnet(x) | x ∈ [s] }| = 1 ∧ |{ device_fingerprint(x) | x ∈ [s] }| = 1',
    relationalDefinition: 'If [s] induces equivalence classes with multi-element projections on Subnet or Autonomous System Number (ASN), the equivalence partition is broken, indicating token clone / MITM hijacking.',
    description: 'A valid session token defines an equivalence relation on request events. If a single token generates events in non-congruent IP spaces simultaneously, reflexivity/transitivity is violated.',
    violationCondition: 'cardinality({ Subnet(event) | event ∈ Session_Token }) > 1 within sliding window τ',
    triggerCount: 2
  },
  {
    ruleId: 'DMGT-R3_TRANSITIVE',
    name: 'Transitive Closure Lateral Traversal Constraint',
    discreteMathTopic: 'Transitive Closures',
    formalLogic: 'Let G = (V, E) be the reachability graph. E* = ⋃_{k=1}^n E^k (Warshall\'s Transitive Closure). Constraint: (Subnet_Dorm, Subnet_CoreRegistrar) ∉ E* unless ∃ b ∈ Bastions : (Subnet_Dorm, b) ∈ E ∧ (b, Subnet_CoreRegistrar) ∈ E',
    relationalDefinition: 'Adjacency matrix A. The transitive closure A* = (A + I)^n. If A*[Dorms, RegistrarCore] = 1 without the intermediate bastion node marked TRUE, an illicit pivot or lateral traversal has occurred.',
    description: 'Computes whether a student or public subnet has achieved transitive reachability to isolated registrar/administrative databases without passing through audited firewall bastions.',
    violationCondition: 'A*[source_subnet, target_restricted] = 1 ∧ Bastion_Visited = FALSE',
    triggerCount: 4
  },
  {
    ruleId: 'DMGT-R4_RATE_BURST',
    name: 'Bipartite Degree Anomaly & Hall\'s Marriage Ratio',
    discreteMathTopic: 'Bipartite Graphs',
    formalLogic: 'Let G = (U ∪ IP, E) be a bipartite graph of users and IP addresses. For subset S ⊆ U: if |N(S)| ≪ |S| where N(S) is the IP neighborhood, or for ip ∈ IP: deg(ip) > μ_deg + 3σ_deg, flag Credential Stuffing.',
    relationalDefinition: 'In normal campus operations, each student IP connects to 1-3 personal accounts. In a credential stuffing attack, deg(IP) scales with the size of the breached dictionary, causing severe bipartite degree skew.',
    description: 'Applies graph degree heuristics to detect when an external or compromised library IP attempts to authenticate against dozens of student IDs in minutes.',
    violationCondition: 'Degree(IP_vertex) > 10 distinct users within 60 seconds',
    triggerCount: 8
  }
];

export const SQL_ANOMALY_QUERIES: SQLAnomalyQuery[] = [
  {
    id: 'SQL-Q1',
    title: '1. Impossible Travel & Concurrent Subnet Velocity',
    category: 'Spatial Anomaly',
    mitreMapping: 'T1539 (Steal Web Session Cookie)',
    description: 'Finds users who authenticated from two distinct subnets or locations where the geographic distance or subnet hop interval implies physical impossibility (< 5 minutes).',
    querySql: `-- Query 1: Detect Impossible Travel between consecutive logins
WITH ConsecutiveAccess AS (
  SELECT 
    a.user_id,
    u.username,
    a.session_token,
    a.ip_address AS current_ip,
    a.subnet AS current_subnet,
    a.building AS current_location,
    a.access_timestamp AS current_time,
    LAG(a.ip_address) OVER (PARTITION BY a.user_id ORDER BY a.access_timestamp) AS prev_ip,
    LAG(a.subnet) OVER (PARTITION BY a.user_id ORDER BY a.access_timestamp) AS prev_subnet,
    LAG(a.building) OVER (PARTITION BY a.user_id ORDER BY a.access_timestamp) AS prev_location,
    LAG(a.access_timestamp) OVER (PARTITION BY a.user_id ORDER BY a.access_timestamp) AS prev_time,
    ROUND((EXTRACT(EPOCH FROM a.access_timestamp) - EXTRACT(EPOCH FROM LAG(a.access_timestamp) OVER (PARTITION BY a.user_id ORDER BY a.access_timestamp)))) AS delta_seconds
  FROM access_logs a
  JOIN users u ON a.user_id = u.user_id
  WHERE a.status = 'SUCCESS'
)
SELECT 
  username,
  session_token,
  prev_location || ' (' || prev_ip || ')' AS origin,
  current_location || ' (' || current_ip || ')' AS destination,
  delta_seconds,
  CASE 
    WHEN prev_subnet != current_subnet AND delta_seconds < 180 THEN 'CRITICAL: Subnet displacement in < 3m'
    WHEN current_ip LIKE '185.220.%' THEN 'CRITICAL: Known Tor Proxy Handoff'
    ELSE 'FLAGGED'
  END AS threat_verdict
FROM ConsecutiveAccess
WHERE prev_ip IS NOT NULL 
  AND prev_ip != current_ip
  AND delta_seconds < 300
ORDER BY delta_seconds ASC;`,
    explanation: 'Utilizes SQL window function LAG() partitioned by user_id to compare consecutive access events. If delta_seconds < 300 while subnets differ radically, impossible travel is confirmed.',
    sampleResults: [
      { username: 'alex.chen', session_token: 'sess-849102', origin: 'West Quad Dorms (10.20.14.88)', destination: 'Tor Exit Frankfurt (185.220.101.5)', delta_seconds: 94, threat_verdict: 'CRITICAL: Known Tor Proxy Handoff' },
      { username: 'admin.kaufman', session_token: 'sess-849200', origin: 'IT Center (192.168.1.50)', destination: 'Library Commons (10.10.45.12)', delta_seconds: 140, threat_verdict: 'CRITICAL: Subnet displacement in < 3m' }
    ]
  },
  {
    id: 'SQL-Q2',
    title: '2. High-Frequency Brute Force & Credential Stuffing',
    category: 'Authentication Attack',
    mitreMapping: 'T1110 (Brute Force: Password Guessing)',
    description: 'Detects IPs generating > 5 authentication failures in a sliding 1-minute window, calculating failure ratios and affected targets.',
    querySql: `-- Query 2: High-Frequency Login Failures per IP
SELECT 
  a.ip_address,
  a.subnet,
  COUNT(a.log_id) AS total_attempts,
  SUM(CASE WHEN a.status = 'FAILURE' THEN 1 ELSE 0 END) AS failed_attempts,
  ROUND((SUM(CASE WHEN a.status = 'FAILURE' THEN 1.0 ELSE 0.0 END) / COUNT(a.log_id)) * 100, 2) AS fail_rate_pct,
  COUNT(DISTINCT a.user_id) AS targeted_usernames,
  MIN(a.access_timestamp) AS burst_start,
  MAX(a.access_timestamp) AS burst_end
FROM access_logs a
WHERE a.action IN ('LOGIN_FAIL', 'LOGIN_SUCCESS')
  AND a.access_timestamp >= NOW() - INTERVAL '15 MINUTE'
GROUP BY a.ip_address, a.subnet
HAVING SUM(CASE WHEN a.status = 'FAILURE' THEN 1 ELSE 0 END) >= 5
   AND COUNT(DISTINCT a.user_id) >= 1
ORDER BY failed_attempts DESC;`,
    explanation: 'Aggregates failed login attempts within 15 minutes. Identifies both horizontal stuffing (many usernames from one IP) and vertical brute force (one admin username hammered repeatedly).',
    sampleResults: [
      { ip_address: '10.10.45.12', subnet: '10.10.0.0/16', total_attempts: 14, failed_attempts: 14, fail_rate_pct: 100.0, targeted_usernames: 1, burst_start: '05:24:00', burst_end: '05:24:23' },
      { ip_address: '185.220.101.5', subnet: '185.220.101.0/24', total_attempts: 28, failed_attempts: 26, fail_rate_pct: 92.86, targeted_usernames: 8, burst_start: '05:19:12', burst_end: '05:23:44' }
    ]
  },
  {
    id: 'SQL-Q3',
    title: '3. Off-Hours Privileged Resource Traversal',
    category: 'Behavioral Anomaly',
    mitreMapping: 'T1078 (Valid Accounts)',
    description: 'Identifies access to high-impact resources (SIS Grade Alteration, SSH Root Bastion) during non-operational hours (01:00 to 05:30) with elevated threat scores.',
    querySql: `-- Query 3: Off-Hours High-Risk Resource Queries
SELECT 
  a.log_id,
  a.access_timestamp,
  u.username,
  u.role,
  a.target_resource,
  a.ip_address,
  a.threat_score,
  EXTRACT(HOUR FROM a.access_timestamp) AS access_hour
FROM access_logs a
JOIN users u ON a.user_id = u.user_id
WHERE (EXTRACT(HOUR FROM a.access_timestamp) BETWEEN 1 AND 5)
  AND (a.target_resource LIKE '%GradePortal%' 
       OR a.target_resource LIKE '%AdminSSH%' 
       OR a.target_resource LIKE '%Registrar%')
  AND a.status = 'SUCCESS'
ORDER BY a.threat_score DESC;`,
    explanation: 'Filters logs during the 1 AM - 5 AM maintenance/sleep window where normal campus administration is quiescent, highlighting compromised legitimate credentials.',
    sampleResults: [
      { log_id: 'log-9902', access_timestamp: '05:23:44', username: 'alex.chen', role: 'student', target_resource: 'SIS-GradePortal', ip_address: '185.220.101.5', threat_score: 94, access_hour: 5 }
    ]
  },
  {
    id: 'SQL-Q4',
    title: '4. Multi-Tenant Session Token Multiplexing',
    category: 'Session Hijacking',
    mitreMapping: 'T1539 (Steal Web Session Cookie)',
    description: 'Identifies active sessions where the same session token is concurrently presented by multiple distinct User-Agent strings and disparate subnets.',
    querySql: `-- Query 4: Token multiplexing across distinct subnets & devices
SELECT 
  s.session_token,
  u.username,
  COUNT(DISTINCT a.subnet) AS distinct_subnets,
  COUNT(DISTINCT a.ip_address) AS distinct_ips,
  COUNT(DISTINCT a.user_agent) AS distinct_user_agents,
  STRING_AGG(DISTINCT a.subnet, ', ') AS observed_subnets,
  MIN(a.access_timestamp) AS first_seen,
  MAX(a.access_timestamp) AS last_seen
FROM sessions s
JOIN access_logs a ON s.session_token = a.session_token
JOIN users u ON s.user_id = u.user_id
WHERE s.status = 'active'
GROUP BY s.session_token, u.username
HAVING COUNT(DISTINCT a.subnet) > 1
   AND MAX(a.access_timestamp) - MIN(a.access_timestamp) < INTERVAL '30 MINUTE';`,
    explanation: 'A legitimate bearer token should originate from one physical device. Multiple concurrent subnets or user-agents bound to one active token indicates an exported or intercepted cookie.',
    sampleResults: [
      { session_token: 'sess-849102', username: 'alex.chen', distinct_subnets: 2, distinct_ips: 2, distinct_user_agents: 2, observed_subnets: '10.20.0.0/16, 185.220.101.0/24', first_seen: '05:22:10', last_seen: '05:23:44' }
    ]
  }
];

export const SLIDE_DECK: PresentationSlide[] = [
  {
    id: 1,
    title: 'Slide 1: Introduction & Problem Statement (TEAM-15)',
    subtitle: 'Cybersecurity Access Log Monitoring for Campus Networks',
    keyPillars: [
      {
        title: 'Project Identification & Team 15 Contributors',
        points: [
          'Team Name: TEAM-15 | College Capstone Cybersecurity Project',
          'Lead: 25B21A4564 - BOLLA NAGA VENKATA SRUTHI',
          'Member: 25B21A4553 - KESAVADASU MOULIKA',
          'Member: 25B21A4567 - MURAPAKA PAVAN VEERA SAI SANTHOSH',
          'Member: 25B21A4570 - GUTHULA KRISHNA SURYAPRASAD',
          'Member: 25B21A4562 - KOTA JASWANTH'
        ],
        technicalDetail: 'Project Scope: Transforming unstructured campus authentication logs into a queryable, graph-correlated threat intelligence dashboard.'
      },
      {
        title: 'The Core Campus Network Crisis',
        points: [
          'Heterogeneous Access: 25,000+ students, faculty, and IoT devices authenticating across dorm WiFi, library commons, and VPNs.',
          'Log Silo Bottleneck: Flat-text files (syslog, RADIUS, Kerberos) lack spatiotemporal correlation and relational indexing.',
          'Attack Vectors: Credential stuffing on student portals, impossible geographic travel (token reuse via Tor), and lateral traversal to registrar databases.'
        ],
        technicalDetail: 'Mean Time to Detect (MTTD) in academic networks averages 194 days without automated topological correlation.'
      }
    ],
    speakerNotes: [
      '"Good morning esteemed professors and evaluators. We are TEAM-15, presenting our capstone engineering project: Cybersecurity Access Log Monitoring."',
      '"Our team comprises Bolla Naga Venkata Sruthi, Kesavadasu Moulika, Murapaka Pavan Veera Sai Santhosh, Guthula Krishna Suryaprasad, and Kota Jaswanth."',
      '"Consider our university campus: over 25,000 students and faculty move between dormitories, laboratories, and libraries, logging into campus WiFi, learning portals, and grading systems."',
      '"The problem we solved: Today, these access logs exist in unqueryable, raw text files. When an attacker steals a student\'s session token or launches a distributed credential stuffing attack from a dorm room, security teams cannot detect the anomalous access pattern until days or weeks after the breach has occurred."',
      '"Our solution unifies Relational Database Modeling (DBMS), Discrete Mathematics and Graph Theory (DMGT), Advanced Data Structures (ADSA), and Object-Oriented statistical machine learning to transform dead logs into an interactive, real-time threat detection system."'
    ],
    takeaways: 'Campus networks suffer from high user velocity, noisy endpoints, and unqueryable log silos, allowing credential theft and lateral movement to proceed undetected.'
  },
  {
    id: 2,
    title: 'Slide 2: System Architecture & Database (DBMS + OOPJ)',
    subtitle: 'Relational ER Modeling & Clean Object-Oriented Architecture',
    keyPillars: [
      {
        title: 'DBMS Entity-Relationship (ER) Architecture',
        points: [
          'Entity User: [user_id (PK), username, role, department, risk_score, primary_subnet]',
          'Entity Session: [session_id (PK), user_id (FK), session_token, ip_address, user_agent, started_at, status]',
          'Entity Access_Log: [log_id (PK), session_id (FK), user_id (FK), target_resource, action, status, threat_score, latency_ms]',
          'Cardinalities: User to Session is 1:N; Session to Access_Log is 1:N; Resource to Access_Log is 1:N.'
        ],
        technicalDetail: 'BCNF normalized schema enables SQL window functions (LAG, LEAD) to calculate delta timestamps and geographic velocities across consecutive hops in O(1) query time.',
        formulaOrCode: 'ER Model: USER (1) ──< (N) SESSION (1) ──< (N) ACCESS_LOG >── (1) RESOURCE'
      },
      {
        title: 'OOPJ Architecture & Design Patterns',
        points: [
          'Strategy Pattern for Detectors: Abstract interface AnomalyDetector implemented by ZScoreDetector, GraphPathDetector, and VelocityDetector.',
          'Observer Pattern for Telemetry: AlertDispatcher notifies real-time WebSocket clients, incident response queues, and containment firewalls.',
          'Encapsulation & Immutability: AccessLog records are strictly append-only; state transformations are preserved with cryptographic audit hashes.'
        ],
        technicalDetail: 'Enforces clean separation between raw ingestion pipelines, stateful session trackers, and extensible threat rule evaluators.'
      }
    ],
    speakerNotes: [
      '"Moving to Slide 2, let us inspect how we engineered the foundation of the system using Relational Database Management Systems (DBMS) and Object-Oriented Programming (OOP).',
      '"On the database side, we designed a normalized Entity-Relationship model composed of Users, Sessions, Access Logs, and Resources. Notice the cardinality: One user initiates multiple sessions; one session emits hundreds of access logs. By indexing session tokens and utilizing SQL Window Functions such as LAG() and LEAD(), we can immediately query spatiotemporal velocity across hops."',
      '"On the software architecture side, we followed strict Object-Oriented principles. We used the Strategy Pattern for our detection engine—allowing us to hot-swap between statistical detectors, rule-based DMGT evaluators, and graph traversals. The Observer Pattern handles event dispatching to our live SOC dashboard."'
    ],
    takeaways: 'A BCNF-compliant ER schema combined with polymorphic OOP design patterns turns chaotic access logs into indexed, queryable data streams.'
  },
  {
    id: 3,
    title: 'Slide 3: Threat Detection Logic (DMGT + Python)',
    subtitle: 'Mathematical Formalism meets Statistical Machine Learning',
    keyPillars: [
      {
        title: 'DMGT (Discrete Mathematics & Graph Theory) Rules',
        points: [
          'Spatiotemporal Velocity Predicate: ∀ u ∈ U, ∀ t₁, t₂ : [Access(u, ip₁, t₁) ∧ Access(u, ip₂, t₂) ∧ Δt < 300s ∧ dist(ip₁, ip₂) > (v_max · Δt)] ⟹ Anomaly(u, t₂).',
          'Equivalence Relations: The session token partition S/~ must maintain single-subnet and single-fingerprint invariance. Multi-subnet divergence breaks reflexivity.',
          'Transitive Closure R*: Warshall\'s algorithm computes reachability matrix A*. If (Subnet_Dorm, Subnet_Registrar) ∈ A* without passing through Bastion B, flag breach.'
        ],
        technicalDetail: 'Formal mathematical models eliminate arbitrary heuristic guesses and provide provable verification bounds.',
        formulaOrCode: 'Z = (x - μ) / σ  |  Anomaly iff |Z| > 3.0 or x ∉ [Q1 - 1.5·IQR, Q3 + 1.5·IQR]'
      },
      {
        title: 'Python Statistical Anomaly Detector',
        points: [
          'Z-Score & Gaussian Probability Density: Computes rolling mean μ and standard deviation σ of request latency and attempt counts. Events with |Z| > 3.0 trigger high-severity alerts.',
          'Interquartile Range (IQR) Filtering: Robust against extreme outliers; tags burst frequencies outside [Q1 - 1.5·IQR, Q3 + 1.5·IQR].',
          'Isolation Forest Integration: Multi-dimensional isolation tree partitioning on (attempt_count, delta_t, payload_size, time_of_day).'
        ],
        technicalDetail: 'Our Python detector computes exponential decaying averages to dynamically adjust baseline profiles as campus class schedules shift.'
      }
    ],
    speakerNotes: [
      '"Now let us examine Slide 3: our detection engine, where Discrete Mathematics (DMGT) meets Python statistical machine learning."',
      '"We formalized our detection rules using Predicate Calculus and Graph Theory. For instance, our Impossible Travel rule mathematically states that if two successful access events for the same user occur within a delta time where the distance divided by time exceeds Mach 1, an anomaly is proven."',
      '"Similarly, we use Warshall\'s Transitive Closure algorithm on subnet reachability to ensure untrusted dorm subnets cannot reach registrar databases without an intermediate bastion."',
      '"In tandem, our Python statistical detector calculates rolling Z-scores and Interquartile Ranges (IQR) over sliding time windows. When an attacker launches a burst brute-force attack, the Z-score spikes beyond 3 standard deviations, triggering an automated incident ticket."'
    ],
    takeaways: 'Discrete mathematical logic provides deterministic guarantees against protocol violations, while Python statistical analysis catches subtle anomaly drifts.'
  },
  {
    id: 4,
    title: 'Slide 4: Data Visualization & Conclusion (ADSA + SOC)',
    subtitle: 'Advanced Graph Data Structures & Real-Time Security Operations',
    keyPillars: [
      {
        title: 'ADSA (Advanced Data Structures & Algorithms)',
        points: [
          'Topological Access-Pattern Graph: Graph G = (V, E) represented via dynamic adjacency lists with temporal edge weights.',
          'BFS & Dijkstra Shortest Path: Evaluates whether an access route from a client to a database constitutes an unauthorized shortest path bypass.',
          'Disjoint Set Union (DSU): Maintains connected components of compromised assets to compute blast radius and attack contagion in near O(α(N)) time.',
          'Sliding Window Deque: O(1) amortized rate limiter maintaining access frequency within rolling timestamps.'
        ],
        technicalDetail: 'Adjacency list graph representation allows real-time interactive rendering and instant cycle/pivot detection.',
        formulaOrCode: 'DSU Find-Union: O(α(N))  |  Sliding Window Deque: O(1) Amortized push/pop'
      },
      {
        title: 'SOC Dashboard UI/UX & Measurable Impact',
        points: [
          'Cybersecurity Dark-Mode UI: High-contrast cyan/red neon telemetry, interactive node-link graph with physics layout, and live log terminal.',
          'Instant Containment Actions: Analysts can execute One-Click Session Revocation, IP Quarantining, and 2FA Step-up challenges.',
          'Conclusion & Project Impact: Reduces breach detection time from days to sub-second alerts, protecting 25,000+ campus identities.'
        ],
        technicalDetail: 'Delivers a comprehensive, production-grade security monitoring platform unifying theoretical computer science with modern web design.'
      }
    ],
    speakerNotes: [
      '"Finally, Slide 4 showcases our Data Structures (ADSA) and the interactive SOC Dashboard."',
      '"To visualize these complex attacks, we implemented a dynamic Graph data structure using Adjacency Lists. We use Breadth-First Search (BFS) to trace multi-hop lateral pivots from dorms to restricted databases, and Disjoint Set Union (DSU) to calculate the blast radius of compromised credentials in near O(1) time."',
      '"All of this surfaces in our modern Cybersecurity Dark-Mode web application. Analysts see live streaming logs, automated alert cards mapped to MITRE ATT&CK tactics, an interactive access-pattern graph, and one-click containment buttons to isolate hostile IP addresses."',
      '"To conclude: by synthesizing DBMS ER modeling, DMGT formal logic, ADSA graph algorithms, and Python statistical detection, we solved the campus log crisis and delivered an enterprise-grade cybersecurity command center. Thank you, and we welcome your questions!"'
    ],
    takeaways: 'ADSA graph structures provide intuitive visual forensics of multi-hop attacks, enabling immediate analyst containment and neutralizing campus threats.'
  }
];
