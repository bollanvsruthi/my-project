export type UserRole = 'student' | 'faculty' | 'sysadmin' | 'guest';

export interface User {
  id: string;
  username: string;
  fullName: string;
  role: UserRole;
  department: string;
  riskScore: number;
  primarySubnet: string;
  isFlagged: boolean;
}

export interface Session {
  id: string;
  userId: string;
  username: string;
  token: string;
  ipAddress: string;
  subnet: string;
  building: string;
  userAgent: string;
  startedAt: string;
  status: 'active' | 'revoked' | 'expired' | 'hijacked';
}

export type LogAction = 
  | 'LOGIN_SUCCESS' 
  | 'LOGIN_FAIL' 
  | 'PRIVILEGE_ELEVATE' 
  | 'DATA_EXFIL' 
  | 'RESOURCE_QUERY' 
  | 'PASSWORD_RESET_REQ';

export interface AccessLog {
  id: string;
  timestamp: string;
  sessionId: string;
  userId: string;
  username: string;
  ipAddress: string;
  subnet: string;
  building: string;
  targetResource: string;
  action: LogAction;
  status: 'SUCCESS' | 'FAILURE' | 'BLOCKED';
  latencyMs: number;
  threatScore: number; // 0 to 100
  isAnomaly: boolean;
  anomalyType?: 'CREDENTIAL_STUFFING' | 'IMPOSSIBLE_TRAVEL' | 'OFF_HOURS_BRUTE_FORCE' | 'LATERAL_MOVEMENT' | 'SESSION_HIJACK' | 'UNUSUAL_VOLUME';
  details?: string;
}

export interface ThreatAlert {
  id: string;
  timestamp: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  type: 'CREDENTIAL_STUFFING' | 'IMPOSSIBLE_TRAVEL' | 'OFF_HOURS_BRUTE_FORCE' | 'LATERAL_MOVEMENT' | 'SESSION_HIJACK';
  title: string;
  description: string;
  affectedUser: string;
  affectedIp: string;
  targetResource: string;
  mitreTactic: string;
  mitreTechnique: string;
  status: 'UNRESOLVED' | 'INVESTIGATING' | 'CONTAINED' | 'DISMISSED';
  dmgtRuleId: string;
  zScore: number;
  evidence: string[];
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'USER' | 'IP' | 'SUBNET' | 'RESOURCE';
  status: 'normal' | 'suspicious' | 'compromised';
  risk: number;
  role?: string;
  ip?: string;
  cidr?: string;
  building?: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  timestamp: string;
  weight: number;
  isAnomaly?: boolean;
  anomalyType?: string;
}

export interface DMGTRule {
  ruleId: string;
  name: string;
  formalLogic: string;
  relationalDefinition: string;
  description: string;
  violationCondition: string;
  discreteMathTopic: 'Predicate Calculus' | 'Equivalence Relations' | 'Transitive Closures' | 'Bipartite Graphs';
  triggerCount: number;
}

export interface SQLAnomalyQuery {
  id: string;
  title: string;
  category: string;
  description: string;
  querySql: string;
  explanation: string;
  mitreMapping: string;
  sampleResults: Array<Record<string, any>>;
}

export interface PresentationSlide {
  id: number;
  title: string;
  subtitle: string;
  keyPillars: {
    title: string;
    points: string[];
    technicalDetail: string;
    formulaOrCode?: string;
  }[];
  speakerNotes: string[];
  takeaways: string;
}
