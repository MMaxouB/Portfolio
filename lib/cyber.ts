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
    notes: "Regular practice in web exploitation, privilege escalation and network enumeration.",
  },
  {
    name: "HackTheBox",
    year: "2025–present",
    category: "Platform",
    notes: "Active machines focused on Linux privilege escalation and web app vulnerabilities.",
  },
];

/** Core security knowledge areas — evidence-grounded descriptions only */
export const SECURITY_AREAS: SecurityArea[] = [
  {
    title: "Web Application Security",
    description: "Hands-on experience finding and exploiting OWASP Top 10 vulnerabilities, such as SQL injection, XSS, IDOR and authentication bypasses.",
    topics: ["OWASP Top 10", "Burp Suite", "SQL Injection", "XSS", "Authentication flaws"],
  },
  {
    title: "Network & Infrastructure",
    description: "Port scanning, service enumeration, network mapping and firewall evasion, used in both lab and professional work.",
    topics: ["Nmap", "Nessus", "Active Directory", "Lateral movement", "VLAN pivoting"],
  },
  {
    title: "Linux & System Hardening",
    description: "Daily Linux use combined with focused security learning: SUID/GUID abuse, crontab exploitation, kernel version checks and file permission audits.",
    topics: ["Privilege escalation", "Linux internals", "Process analysis", "Shell scripting"],
  },
  {
    title: "OSINT & Reconnaissance",
    description: "Passive information gathering, footprinting and target profiling with open-source intelligence (OSINT) techniques.",
    topics: ["Shodan", "WHOIS", "DNS enumeration", "Social engineering awareness"],
  },
];
