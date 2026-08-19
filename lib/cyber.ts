/** Static cyber-specific content that has no home in the projects data model */

export interface CtfEntry {
  name: string;
  year: string;
  category: string;
  notes: string;
}

export interface SecurityArea {
  title: string;
  description: string;
  topics: string[];
}

/** CTF activity — real participation only, no fabricated flags/scores */
export const CTF_ENTRIES: CtfEntry[] = [
  {
    name: "TryHackMe",
    year: "2024–present",
    category: "Learning Platform",
    notes: "Consistent practice across web exploitation, privilege escalation and network enumeration rooms.",
  },
  {
    name: "HackTheBox",
    year: "2025–present",
    category: "Platform",
    notes: "Active machines focusing on Linux privilege escalation and web application vulnerabilities.",
  },
];

/** Core security knowledge areas — evidence-grounded descriptions only */
export const SECURITY_AREAS: SecurityArea[] = [
  {
    title: "Web Application Security",
    description: "Hands-on experience identifying and exploiting OWASP Top 10 vulnerabilities. SQL injection, XSS, IDOR, authentication bypasses and insecure direct object references.",
    topics: ["OWASP Top 10", "Burp Suite", "SQL Injection", "XSS", "Authentication flaws"],
  },
  {
    title: "Network & Infrastructure",
    description: "Port scanning, service enumeration, network topology mapping and firewall evasion techniques applied in lab and professional engagement contexts.",
    topics: ["Nmap", "Nessus", "Active Directory", "Lateral movement", "VLAN pivoting"],
  },
  {
    title: "Linux & System Hardening",
    description: "Daily Linux use combined with security-specific learning: SUID/GUID abuses, crontab exploitation, kernel version checks and file permission audits.",
    topics: ["Privilege escalation", "Linux internals", "Process analysis", "Shell scripting"],
  },
  {
    title: "OSINT & Reconnaissance",
    description: "Passive information gathering, footprinting and target profiling using open-source intelligence techniques.",
    topics: ["Shodan", "WHOIS", "DNS enumeration", "Social engineering awareness"],
  },
];
